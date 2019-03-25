import Boom from 'boom';
import HttpStatus from 'http-status-codes';

import logger from '../utils/logger';
import * as http from '../utils/http';
import Status from '../models/Status';

const MAINTENANCE_VALUE = '1';

export const STATUS_UP = 'Up';
export const STATUS_DOWN = 'Down';
export const STATUS_MAINTENANCE = 'Maintenance';
export const FALLBACK_HTTP_METHOD = http.HEAD;

/**
 * Check the host's status by sending an HTTP request.
 *
 * @param   {Object} service
 * @param   {String} [method='OPTIONS']
 * @returns {Promise}
 */
export async function checkHostStatus(service, method = http.OPTIONS) {
  const { url, name, checkMaintain } = service;

  logger().debug(`Checking the status for ${name} <${url}>`);

  try {
    const { statusCode, body, headers } = await http.sendRequest(method, url, {
      simple: false
    });

    // If the original HTTP method was not allowed (405 Method Not Allowed)
    // try sending another request with a fallback method.
    // return checkHostStatus(service, FALLBACK_HTTP_METHOD);

    if (shouldRetry(statusCode, method)) {
      logger().debug(
        `Got ${statusCode} error for ${method} request on service ${name}. Now trying with the fallback method ${FALLBACK_HTTP_METHOD}`
      );
    }

    if (checkUnderMaintenance(statusCode, headers.maintain, checkMaintain)) {
      logger().debug(
        `Received ${statusCode} on service ${name}. Service ${name} is under maintenance.`
      );

      return STATUS_MAINTENANCE;
    } else if (matchUpStatus(statusCode)) {
      logger().debug(`Received response for ${name}: `, { statusCode, body });

      return STATUS_UP;
    }

    logger().debug(`Received response for ${name}: `, { statusCode, body });

    return STATUS_DOWN;
  } catch (err) {
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
 * Check if the system is under Maintenance.
 * Check status code in response for 503.
 * Check if in header if Maintain is 1.
 *
 * @param {Number} statusCode
 * @param {Number} maintain
 * @param {Boolean} checkMaintain
 * @returns {Boolean}
 */
function checkUnderMaintenance(statusCode, maintain, checkMaintain = false) {
  return (
    statusCode === 503 || (checkMaintain && maintain === MAINTENANCE_VALUE)
  );
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
 * Check if the status code on the response is 200.
 *
 * @param   {Number} statusCode
 * @returns {Boolean}
 */
function matchUpStatus(statusCode) {
  return statusCode === 200;
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
