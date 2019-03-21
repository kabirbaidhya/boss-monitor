import rp from 'request-promise';
import logger from './logger';

export const HEAD = 'HEAD';
export const OPTIONS = 'OPTIONS';

/**
 * Send HTTP request on a url using the provided method.
 *
 * @param {String} method
 * @param {String} url
 * @param {Object} params
 * @returns {Promise}
 */
export function sendRequest(method, url, params) {
  logger().debug(`Sending HTTP ${method} request to ${url}.`);

  return rp({
    method,
    uri: url,
    rejectUnauthorized: false,
    resolveWithFullResponse: true,
    ...params
  });
}
