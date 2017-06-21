import HttpStatus from 'http-status-codes';

import logger from '../utils/logger';
import * as http from '../utils/http';

export const STATUS_UP = 'up';
export const STATUS_DOWN = 'down';
export const FALLBACK_HTTP_METHOD = http.HEAD;

/**
 * Check the host's status by sending an HTTP request.
 *
 * @param {Object} service
 * @param {String} [method='OPTIONS']
 * @returns {Promise}
 */
export async function checkHostStatus(service, method = http.OPTIONS) {
  const { url, name } = service;

  logger().debug(`Checking the status for ${name} <${url}>`);

  try {
    let { statusCode, body } = await http.sendRequest(method, url);

    logger().debug(`Received response for ${name}: `, { statusCode, body });

    return STATUS_UP;
  } catch (err) {
    // If the original HTTP method was not allowed (405 Method Not Allowed)
    // try sending another request with a fallback method.
    // TODO: Make fallback http method configurable using chill.yml
    if (shouldRetry(err, method)) {
      logger().debug(
        `Got ${err.response.statusCode} error for ${method} request on service ${name}. ` +
        `Now trying with the fallback method ${FALLBACK_HTTP_METHOD}`
      );

      return checkHostStatus(service, FALLBACK_HTTP_METHOD);
    }

    logger().debug(`Received error response for ${name}: `, err);

    return STATUS_DOWN;
  }
}

/**
 * Get the status check polling interval.
 *
 * @param {String} status
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export function getCheckInterval(status, min, max) {
  return status === STATUS_UP ? max : min;
}

/**
 * Check if it should retry sending HTTP request.
 *
 * @param  {Object} err
 * @return {Boolean}
 */
function shouldRetry(err, method) {
  return (
    err.response &&
    (err.response.statusCode === HttpStatus.METHOD_NOT_ALLOWED ||
     err.response.statusCode === HttpStatus.NOT_IMPLEMENTED) &&
    method !== FALLBACK_HTTP_METHOD
  );
}
