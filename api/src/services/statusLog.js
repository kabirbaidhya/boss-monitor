import camelize from 'camelize';

import logger from '../utils/logger';
import StatusLog from '../models/StatusLog';
import { fetch as fetchStatus } from './status';
import { fetch as fetchService } from './service';

/**
 * Get all status logs.
 *
 * @return {Promise}
 */
export function fetchAll() {
  // TODO: Pagination
  return StatusLog.fetchAllLogs();
}

/**
 * Fetch a service grouped by it's name.
 *
 * @param  {String} id
 * @return {Promise}
 */
export async function fetchLatestStatuses() {
  const results = await StatusLog.fetchLatestStatuses();

  return parseStatusLog(results);
}

/**
 * Persist a status change log into the database.
 *
 * @param {Object} data
 * @return {Object}
 */
export async function save(data) {
  await ensureAttributesExist(data);

  logger().info('Saving status change log');
  logger().debug('Data: ', data);

  let model = await StatusLog.forge(data).save();

  return model.toJSON();
}

/**
 * Verifies that the attributes (serviceId & statusId)
 * exists in the database before they're saved in the status log.
 *
 * @param {Object} data
 * @returns {Promise}
 */
function ensureAttributesExist(data) {
  logger().debug('Ensure status log attributes exist: ', data);

  return Promise.all([
    fetchService(data.serviceId),
    fetchStatus(data.statusId)
  ]);
}

/**
 * Parse status log response.
 *
 * @param {any} data
 * @returns {object}
 */
function parseStatusLog(data) {
  const parsedResults = data.map(result => ({
    ...result,
    status: JSON.parse(result.status),
    service: JSON.parse(result.service)
  }));

  return camelize(parsedResults);
}
