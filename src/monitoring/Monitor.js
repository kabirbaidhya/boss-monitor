import moment from 'moment';
import logger from './../utils/logger';
import * as events from '../services/events';
import { checkHostStatus, getCheckInterval } from './../services/status';

class Monitor {
  constructor(service) {
    this.service = service;
    this.status = null;
    this.lastStatusChanged = null;
  }

  start() {
    events.trigger(events.EVENT_MONITORING_STARTED, { serviceName: this.service.name });
    this.startMonitoring();
  }

  async startMonitoring() {
    let { url, name, minInterval, maxInterval } = this.service;
    let status = await checkHostStatus(url);
    let interval = getCheckInterval(status, minInterval, maxInterval);

    logger.debug(`Status of ${name} service is ${status}`);

    if (this.hasStatusChanged(status)) {
      this.handleStatusChange(status);
    }

    logger.debug(`Check interval for ${name} = ${interval}`);
    setTimeout(this.startMonitoring.bind(this), interval);
  }

  hasStatusChanged(status) {
    return (this.service.status !== status);
  }

  handleStatusChange(status) {
    let currentTime = moment();
    let params = {
      status,
      serviceName: this.service.name,
      oldStatus: this.service.status,
      time: currentTime.clone(),
      lastStatusChanged: this.lastStatusChanged ? moment(this.lastStatusChanged).clone() : null
    };

    // Trigger the status change event.
    events.trigger(events.EVENT_STATUS_CHANGED, params);
    logger.debug(`Event triggered ${events.EVENT_STATUS_CHANGED} with params`, params);

    this.service.status = status;
    this.lastStatusChanged = currentTime; // Set the status changed date to current time.
  }
}

export default Monitor;
