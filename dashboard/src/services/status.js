import { sprintf } from 'sprintf-js';

import config from '../config';
import http from '../utils/http';

import * as statuses from '../constants/statuses';
import * as outage from '../constants/enums/outage';
import * as icons from '../constants/icons';

/**
 * Get the latest status of the services.
 *
 * @returns {Object}
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

export function checkStatus(status) {
  let statusName = status && status.name && status.name.toLowerCase();

  return {
    [statusName]: true
  };
}

/**
 * Get the total counts of the status of services.
 *
 * @param {Array} services
 * @returns {Object}
 */
export function getServiceCounts(services) {
  let total = services.length;
  let totalUp = services.filter((service) => checkStatus(service).up).length;

  return {
    total,
    totalUp
  };
}

/**
 * Check outage status.
 *
 * @param {Array} services
 * @returns {Number} outage
 */
export function getOutageLevel(services) {
  if (services.every(service => checkStatus(service).up)) {
    return outage.NONE;
  }
  if (services.every(service => checkStatus(service).down)) {
    return outage.ALL;
  }

  return outage.PARTIAL;
}

/**
 * Get required parameters to render services.
 *
 * @param {Boolean} isOperational
 * @returns {Object}
 */
export function getServiceParams(status) {
  if (status.down) {
    return {
      icon: icons.DOWN,
      message: statuses.STATUS_DOWN_MESSAGE
    };
  } else if (status.up) {
    return {
      icon: icons.UP,
      message: statuses.STATUS_UP_MESSAGE
    };
  }

  return {
    icon: icons.UNDER_MAINTENANCE,
    message: statuses.STATUS_UNDER_MAINTENANCE_MESSAGE
  };
}

/**
 * Get required parameters to render the status panel.
 *
 * @param {Array} services
 * @returns {Object}
 */
export function getOutageParams(services) {
  let outageLevel = getOutageLevel(services);
  let { total, totalUp } = getServiceCounts(services);

  switch (outageLevel) {
    case outage.NONE:
      return {
        className: statuses.ALL_STATUS_UP_CLASS,
        message: statuses.ALL_STATUS_UP_MESSAGE
      };

    case outage.PARTIAL:
      return {
        className: statuses.PARTIAL_STATUS_DOWN_CLASS,
        message: sprintf(statuses.PARTIAL_STATUS_DOWN_MESSAGE, { totalUp, total })
      };

    case outage.ALL:
      return {
        className: statuses.ALL_STATUS_DOWN_CLASS,
        message: statuses.ALL_STATUS_DOWN_MESSAGE
      };
  }
}
