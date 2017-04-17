import moment from 'moment';
import logger from './../utils/logger';
import { STATUS_UP } from '../services/status';
import * as events from '../services/events';
import * as notifier from '../services/notifier';

/**
 * Start listening for monitor events.
 */
export function listen() {
  events.addListener(events.EVENT_STATUS_CHANGED, handleStatusChange);
  events.addListener(events.EVENT_MONITOING_STARTED, handleMonitoringStarted);
}

/**
 * Handle status change event.
 * 
 * @param {any} params 
 */
function handleStatusChange(params) {
  let { serviceName, status, time, lastStatusChanged } = params;
  let notification = {
    status,
    name: serviceName,
    time: params.time.clone(),
    lastStatusChanged: lastStatusChanged ? moment(lastStatusChanged).clone() : null
  };

  if (status === STATUS_UP && lastStatusChanged) {
    let downtime = time.diff(lastStatusChanged);

    notification.downtime = moment.duration(downtime, 'milliseconds').humanize();

    logger.info(`${serviceName} is up after ${notification.downtime} of downtime.`);
  } else {
    logger.info(`${serviceName} is ${status}`);
  }

  // Send notifications
  notifier.notify(notification);
}

/**
 * Handle service monitoring started event.
 * 
 * @param {Object} params
 */
function handleMonitoringStarted(params) {
  logger.info(`Started monitoring ${params.serviceName}`);
}
