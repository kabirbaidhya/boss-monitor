import Boom from 'boom';
import HttpStatus from 'http-status-codes';

import logger from '../utils/logger';
import * as http from '../utils/http';
import Status from '../models/Status';

export const STATUS_UP = 'Up';
export const STATUS_DOWN = 'Down';
export const FALLBACK_HTTP_METHOD = http.HEAD;

/**
 * Check the host's status by sending an HTTP request.
 *
 * @param   {Object} service
 * @param   {String} [method='OPTIONS']
 * @returns {Promise}
 */
export async function checkHostStatus(service, method = http.OPTIONS) {
  const { url, name, token } = service;

  logger().debug(`Checking the status for ${name} <${url}>`);

  try {
    const { statusCode, body } = await http.sendRequest(method, url, token);

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
 * @param   {String} status
 * @param   {Number} min
 * @param   {Number} max
 * @returns {Number}
 */
export function getCheckInterval(status, min, max) {
  return status === STATUS_UP ? max : min;
}

/**
 * Check if it should retry sending HTTP request.
 *
 * @param   {Error} err
 * @param   {string} method
 * @returns {Boolean}
 */
function shouldRetry(err, method) {
  return (
    err.response &&
    (err.response.statusCode === HttpStatus.METHOD_NOT_ALLOWED ||
      err.response.statusCode === HttpStatus.NOT_IMPLEMENTED) &&
    method !== FALLBACK_HTTP_METHOD
  );
}

/**
 * Fetch a single Status record by it's id (pk).
 *
 * @param  {string|Number}  id
 * @returns {Promise}
 */
export async function fetch(id) {
  logger().debug('Fetching a status record by id', { id });

  const result = await new Status({ id }).fetch();

  if (!result) {
    throw new Boom.notFound('Status not found');
  }

  logger().debug('Retrieved Status data', result.toJSON());

  return result;
}

/**
 * Fetch all statuses.
 *
 * @returns {Promise}
 */
export async function fetchAll() {
  logger().info('Fetching all the statuses.');

  const result = await Status.fetchAll();

  logger().debug('Retrieved list of statuses', result.toJSON());

  return result;
}

/**
 * Fetch status by name.
 *
 * @param {string} name
 * @returns {Promise}
 */
export async function fetchByName(name) {
  logger().debug('Fetching a status record by name', { name });

  const result = await new Status({ name }).fetch();

  if (!result) {
    throw new Boom.notFound('Status not found');
  }

  logger().debug('Retrieved Status data', result.toJSON());

  return result;
}
