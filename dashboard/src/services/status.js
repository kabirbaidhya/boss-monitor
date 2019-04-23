import { sprintf } from 'sprintf-js';

import config from '../config';
import http from '../utils/http';

// import icons from '../constants/icons';
import * as statuses from '../constants/statuses';
import * as outage from '../constants/enums/outage';

import statusUpIcon from '../../public/images/icon-green-1.png';
import statusDownIcon from '../../public/images/icon-red-1.png';

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
export function isUp(service) {
  return check(service, statuses.STATUS_UP.toLowerCase());
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
 * @returns {Object}
 */
export function getServiceParams(isOperational) {
  if (!isOperational) {
    return {
      icon: statusDownIcon,
      message: statuses.STATUS_DOWN_MESSAGE
    };
  }

  return {
    icon: statusUpIcon,
    message: statuses.STATUS_UP_MESSAGE
  };
}

/**
 * Check if the status matches the provided status.
 *
 * @param {Object} status
 * @param {String} statusType
 * @returns {boolean}
 */
export function check(status, statusType) {
  return status && status.name && status.name.toLowerCase() === statusType;
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
