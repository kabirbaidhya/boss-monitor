import moment from 'moment';
import logger from '../utils/logger';
import { isSame } from '../utils/common';
import * as events from '../services/events';
import * as sslService from '../services/ssl';
import * as statusService from '../services/status';
import * as serviceService from '../services/service';
import * as persistence from '../services/persistence';
import * as statusLogService from '../services/statusLog';

/**
 * The Monitor.
 */
class Monitor {
  /**
   * @param {Object} serviceConfig
   */
  constructor(serviceConfig) {
    this.retried = 0;
    this.status = null;
    this.config = serviceConfig;
    this.lastStatusChanged = null;
  }

  /**
   * Start the monitor.
   */
  start() {
    // TODO: We need to spawn each monitor into a separate thread,
    // such that each thread will monitor a service.
    events.trigger(
      events.EVENT_MONITORING_STARTED, { serviceName: this.config.name }
    );
    this.fetchLastStatus().then(() => this.startMonitoring());
  }

  /**
   * Fetch last status of the monitor.
   */
  async fetchLastStatus() {
    const { name, url } = this.config;

    const serviceObj = await serviceService.fetchByUrl(url);
    const serviceId = serviceObj.attributes.id;

    const lastStatus = await persistence.getLastStatus(serviceId);

    if (!lastStatus) {
      logger().info(`Last status for service '${name}' is unknown.`);

      return;
    }

    // Get the last persisted status information for this service.
    this.status = lastStatus.get('status');
    this.lastStatusChanged = lastStatus.get('createdAt');
    logger().info(
      `Service '${name}' was ${this.status} last time on ${moment(
        this.lastStatusChanged
      ).format()}.`
    );
  }

  /**
   * Start monitoring services.
   */
  async startMonitoring() {
    const { url, name, maxRetry, minInterval, maxInterval, auth } = this.config;
    const status = await statusService.checkHostStatus({
      url, name, auth
    });
    const sslStatus = await sslService.checkSSLStatus({ url, name });

    logger().debug(`Status of service '${name}' now is '${status}'`);

    const interval = statusService.getCheckInterval(status, minInterval, maxInterval);
    const serviceObj = await serviceService.fetchByUrl(url);
    const serviceId = serviceObj.attributes.id;
    const statusPayload = {
      sslStatus,
      status: { name: status }
    };

    if (
      !this.shouldRetry(name, status, maxRetry) &&
      this.isStatusDifferent(statusPayload)
    ) {
      this.handleStatusChange(statusPayload, serviceId);

      const statusObj = await statusService.fetchByName(status);
      const statusId = statusObj.attributes.id;

      await statusLogService.save({
        ...sslStatus,
        serviceId,
        statusId
      });

      this.retried = 0;
    } else {
      this.retried++;
    }

    logger().debug(`Check interval for ${name} is ${interval}`);
    setTimeout(this.startMonitoring.bind(this), interval);
  }

  /**
   * Check current and previous status.
   *
   * @param {string} status
   */
  isStatusDifferent(status) {
    return !isSame(this.status, status);
  }

  /**
   * Check if monitor should retry pinging.
   *
   * @param {string} name
   * @param {string} status
   * @param {number} maxRetry
   */
  shouldRetry(name, status, maxRetry) {
    if (status === statusService.STATUS_DOWN && this.retried <= maxRetry) {
      logger().info(`Retrying '${name}' service: ${this.retried} time/s.`);

      return true;
    }

    return false;
  }

  /**
   * Handle change in status and trigger a status change event.
   *
   * @param {string} status
   * @param {number} serviceId
   */
  handleStatusChange(status, serviceId) {
    const currentTime = moment();
    const params = {
      status: JSON.stringify(status),
      service: JSON.stringify({
        id: serviceId,
        url: this.config.url,
        name: this.config.name
      }),
      id: serviceId,
      time: currentTime.clone(),
      oldStatus: this.status,
      serviceName: this.config.name,
      lastStatusChanged: this.lastStatusChanged
        ? moment(this.lastStatusChanged).clone()
        : null
    };

    // Trigger the status change event.
    events.trigger(events.EVENT_STATUS_CHANGED, params);
    logger().debug(
      `Event triggered ${events.EVENT_STATUS_CHANGED} with params`,
      params
    );

    this.status = status;
    this.lastStatusChanged = currentTime; // Set the status changed date to current time.
  }
}

export default Monitor;
