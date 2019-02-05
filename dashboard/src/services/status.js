import { sprintf } from 'sprintf-js';

import config from '../config';
import http from '../utils/http';

import * as icons from '../constants/icons';
import * as statuses from '../constants/statuses';
import * as outage from '../constants/enums/outage';

/**
 * Get the latest status of the services.
 *
 * @returns {Promise}
 */
export async function fetchServiceStatuses() {
  const { endpoints } = config.api;
  const { data } = await http.get(endpoints.status);

  return data;
}

/**
 * Check if a service is up by it's status.
 *
 * @param {Object} service
 * @returns {Boolean}
 */
export function isUp(service) {
  return service.status === statuses.STATUS_UP;
}

/**
 * Get the total counts of the status of services.
 *
 * @param {Array} services
 * @returns {Object}
 */
export function getServiceCounts(services) {
  let total = services.length;
  let totalUp = services.filter(isUp).length;
  let totalDown = total - totalUp;

  return {
    total,
    totalUp,
    totalDown
  };
}

/**
 * Check outage status.
 *
 * @param {Array} services
 * @returns {Number} outage
 */
export function getOutageLevel(services) {
  if (services.every(service => isUp(service))) {
    return outage.NONE;
  }
  if (services.every(service => !isUp(service))) {
    return outage.ALL;
  }

  return outage.PARTIAL;
}

/**
 * Get required parameters to render services.
 *
 * @param {Boolean} isOperational
 * @returns {Object} {icon, message, className}
 */
export function getServiceParams(isOperational) {
  if (!isOperational) {
    return {
      icon: icons.EXCLAMATION,
      className: statuses.STATUS_DOWN_CLASS,
      message: statuses.STATUS_DOWN_MESSAGE
    };
  }

  return {
    icon: icons.INFO,
    className: statuses.STATUS_UP_CLASS,
    message: statuses.STATUS_UP_MESSAGE
  };
}

/**
 * Get required parameters to render the status panel.
 *
 * @param {Array} services
 * @returns {Object} {message, className}
 */
export function getOutageParams(services) {
  let outageLevel = getOutageLevel(services);
  let { total, totalUp } = getServiceCounts(services);

  switch (outageLevel) {
    case outage.NONE:
      return {
        className: statuses.STATUS_UP_CLASS,
        message: statuses.ALL_STATUS_UP_MESSAGE
      };

    case outage.PARTIAL:
      return {
        className: statuses.PARTIAL_STATUS_DOWN_CLASS,
        message: sprintf(statuses.PARTIAL_STATUS_DOWN_MESSAGE, { totalUp, total })
      };

    case outage.ALL:
      return {
        className: statuses.STATUS_DOWN_CLASS,
        message: statuses.ALL_STATUS_DOWN_MESSAGE
      };
  }
}
