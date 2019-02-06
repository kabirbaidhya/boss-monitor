import Boom from 'boom';

import logger from '../utils/logger';
import Status from '../models/Status';

/**
 * Fetch a single Status record by it's id (pk).
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function fetch(id) {
  logger().debug('Fetching a status record by id', { id });

  let result = await new Status({ id }).fetch();

  if (!result) {
    throw new Boom.notFound('Status not found');
  }

  logger().debug('Retrieved Status data', result.toJSON());

  return result;
}

/**
 * Fetch all statuses.
 *
 * @return {Promise}
 */
export async function fetchAll() {
  logger().info('Fetching all the statuses.');

  let result = await Status.fetchAll();

  logger().debug('Retrieved list of statuses', result.toJSON());

  return result;
}
