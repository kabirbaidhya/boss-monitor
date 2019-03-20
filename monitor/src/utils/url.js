import { URL } from 'url';
import logger from './logger';

/**
 * Parse given httpUrl into URL object.
 *
 * @param   {string} httpUrl
 * @returns {Url}
 */
export function parse(httpUrl) {
  try {
    const { hostname, port, href, protocol } = new URL(httpUrl);

    return { host: hostname, port, href, protocol };
  } catch (err) {
    logger().error('Error:', err.message);

    throw err;
  }
}
