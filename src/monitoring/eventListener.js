import moment from 'moment';
import logger from '../utils/logger';
import * as events from '../services/events';
import { STATUS_UP } from '../services/status';
import * as notifier from '../services/notifier';
import { persist } from '../services/persistence';

/**
 * Start listening for monitor events.
 */
export function listen() {
  events.addListener(events.EVENT_STATUS_CHANGED, handleStatusChange);
  events.addListener(events.EVENT_MONITORING_STARTED, handleMonitoringStarted);
}

/**
 * Handle status change event.
 *
 * @param {any} params
 */
function handleStatusChange(params) {
  const { serviceName, status, time, lastStatusChanged } = params;
  const notification = {
    status,
    name: serviceName,
    time: time.clone(),
    lastStatusChanged: lastStatusChanged ? moment(lastStatusChanged).clone() : null
  };

  if (status === STATUS_UP && lastStatusChanged) {
    const downtime = time.diff(lastStatusChanged);

    notification.downtime = moment.duration(downtime, 'milliseconds').humanize();

    logger().info(`${serviceName} is up after ${notification.downtime} of downtime.`);
  } else {
    logger().info(`${serviceName} is ${status}`);
  }

  // Send notifications
  notifier.notify(notification);

  // Persist to database
  persist({ status, serviceName });
}

/**
 * Handle service monitoring started event.
 *
 * @param {Object} params
 */
function handleMonitoringStarted(params) {
  logger().info(`Started monitoring ${params.serviceName}`);
}
