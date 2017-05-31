import rp from 'request-promise';
import logger from './logger';

export const HEAD = 'HEAD';
export const OPTIONS = 'OPTIONS';

/**
 * Send HTTP request on a url using the provided method.
 *
 * @param {String} method
 * @param {String} url
 * @returns {Promise}
 */
export function sendRequest(method, url) {
  logger().debug(`Sending HTTP ${method} request to ${url}.`);

  return rp({
    method,
    uri: url,
    rejectUnauthorized: false,
    resolveWithFullResponse: true
  });
}
