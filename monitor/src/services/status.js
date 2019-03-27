import Boom from 'boom';
import HttpStatus from 'http-status-codes';

import logger from '../utils/logger';
import * as http from '../utils/http';
import Status from '../models/Status';

export const STATUS_UP = 'Up';
export const STATUS_DOWN = 'Down';
export const STATUS_UNDER_MAINTENANCE = 'Under Maintenance';
export const FALLBACK_HTTP_METHOD = http.HEAD;

/**
 * Check the host's status by sending an HTTP request.
 *
 * @param   {Object} service
 * @param   {String} [method='OPTIONS']
 * @returns {Promise}
 */
export async function checkHostStatus(service, method = http.OPTIONS) {
  const { url, name } = service;

  logger().debug(`Checking the status for ${name} <${url}>`);

  try {
    const { statusCode, body } = await http.sendRequest(method, url);

    logger().debug(`Received response for ${name}: `, { statusCode, body });

    return STATUS_UP;
  } catch (err) {
    const statusCode = err.response.statusCode;

    // If the original HTTP method was not allowed (405 Method Not Allowed)
    // try sending another request with a fallback method.
    if (shouldRetry(statusCode, method)) {
      logger().debug(
        `Got ${statusCode} error for ${method} request on service ${name}. Now trying with the fallback method ${FALLBACK_HTTP_METHOD}`
      );

      return checkHostStatus(service, FALLBACK_HTTP_METHOD);
    } else if (checkUnderMaintenance(statusCode, err.response.headers['retry-after'])) {
      logger().debug(
        `Received ${statusCode} on service ${name}. Service ${name} is under maintenance.`
      );

      return STATUS_UNDER_MAINTENANCE;
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
 * Check if the system is under maintenance.
 * Return true if value of statusCode is 503 or check retryAfter is greater than 0 else returns false.
 *
 * @param {Number} statusCode
 * @param {Number} retryAfter
 * @returns {Boolean}
 */
function checkUnderMaintenance(statusCode, retryAfter) {
  return statusCode === 503 || retryAfter > 0;
}

/**
 * Check if it should retry sending HTTP request.
 *
 * @param   {Number} statusCode
 * @param   {String} method
 * @returns {Boolean}
 */
function shouldRetry(statusCode, method) {
  return (
    (statusCode === HttpStatus.METHOD_NOT_ALLOWED ||
      statusCode === HttpStatus.NOT_IMPLEMENTED) &&
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
