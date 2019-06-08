import moment from 'moment';
import rp from 'request-promise';

import logger from '../utils/logger';
import * as config from '../config/config';
import * as events from '../services/events';
import { STATUS_UP } from '../services/status';
import * as notifier from '../services/notifier';
import { synchronize } from '../services/persistence';

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
async function handleStatusChange(params) {
  const { serviceName, status, time, lastStatusChanged, id, service } = params;
  const notification = {
    id,
    status,
    service,
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
  await synchronize();
}

/**
 * Handle service monitoring started event.
 *
 * @param {Object} params
 */
function handleMonitoringStarted(params) {
  logger().info(`Started monitoring ${params.serviceName}`);
}
