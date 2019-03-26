import { URL } from 'url';
import logger from './logger';

/**
 * Parse given url into URL object.
 *
 * @param   {string} url
 * @returns {Url}
 */
export function parse(url) {
  try {
    const { hostname, port, href, protocol } = new URL(url);

    return { host: hostname, port, href, protocol };
  } catch (err) {
    logger().error('Error:', err.message);

    throw TypeError('Invalid URL');
  }
}
