import rp from 'request-promise';
import logger from './logger';

export const HEAD = 'HEAD';
export const OPTIONS = 'OPTIONS';
export const AUTH_TYPE = 'Basic';

/**
 * Send HTTP request on a url using the provided method.
 *
 * @param {String} method
 * @param {String} url
 * @param {String} token
 * @returns {Promise}
 */
export function sendRequest(method, url, token) {
  logger().debug(`Sending HTTP ${method} request to ${url}.`);

  return rp({
    method,
    uri: url,
    headers: {
      Authorization: token ? `${AUTH_TYPE} ${token}` : null
    },
    rejectUnauthorized: false,
    resolveWithFullResponse: true
  });
}
