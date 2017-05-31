import rp from 'request-promise';
import logger from '../utils/logger';

export const STATUS_UP = 'up';
export const STATUS_DOWN = 'down';

export const DEFAULT_HTTP_METHOD = 'OPTIONS';
export const FALLBACK_HTTP_METHOD = 'HEAD';

/**
 * Check the host's status by sending an HTTP request.
 *
 * @param {Object} service
 * @param {String} [method='OPTIONS']
 * @returns {Promise}
 */
export async function checkHostStatus(service, method = DEFAULT_HTTP_METHOD) {
  const { url, name } = service;

  logger().debug(`Checking the status for ${name} <${url}>`);

  try {
    let { statusCode, body } = await sendRequest(method, url);

    logger().debug(`Received response for ${name}: `, { statusCode, body });

    return STATUS_UP;
  } catch (err) {
    logger().debug(`Received error response for ${name}: `, err);

    // If the original HTTP method was not allowed (405 Method Not Allowed)
    // try sending another request with a fallback method.
    // TODO: Make fallback http method configurable using chill.yml
    if (err.response && err.response.statusCode === 405 && method !== FALLBACK_HTTP_METHOD) {
      logger().debug(
        `Got 405 error for ${method} request on service ${name}. ` +
        `Now trying with the fallback method ${FALLBACK_HTTP_METHOD}`
      );

      return checkHostStatus(service, FALLBACK_HTTP_METHOD);
    }

    return STATUS_DOWN;
  }
}

/**
 * Send HTTP request on a url using the provided method.
 *
 * @param {String} method
 * @param {String} url
 * @returns {Promise}
 */
function sendRequest(method, url) {
  logger().debug(`Sending HTTP ${method} request to ${url}.`);

  return rp({
    method,
    uri: url,
    rejectUnauthorized: false,
    resolveWithFullResponse: true
  });
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
