import Boom from 'boom';

import logger from '../utils/logger';
import Service from '../models/Service';
import StatusLog from '../models/StatusLog';

/**
 * Fetch all services.
 *
 * @return {Promise}
 */
export async function fetchAll() {
  logger().info('Fetching all the services.');

  let result = await Service.fetchAll();

  logger().debug('Retrieved list of services', result.toJSON());

  return result;
}

/**
 * Fetch a single service by it's id (pk).
 *
 * @param  {string|Number}  id
 * @return {Promise}
 */
export async function fetch(id) {
  logger().debug('Fetching a service by id', { id });

  let result = await new Service({ id }).fetch();

  if (!result) {
    throw new Boom.notFound('Service not found');
  }

  logger().debug('Retrieved service data', result.toJSON());

  return result;
}

/**
 * Fetch the latest status change log for a service by serviceId.
 *
 * @param {Number} serviceId
 * @returns {Promise}
 */
export async function fetchStatus(serviceId) {
  let result = await StatusLog.fetchServiceStatus(serviceId);

  if (!result) {
    throw new Boom.notFound(`No recent logs not found for service ${serviceId}.`);
  }

  logger().debug('Retrieved last logged status:', result.toJSON());

  return result.toJSON();
}

/**
 * Create and save service data.
 *
 * @param {Object}
 * @returns {Promise}
 */
export async function create(data) {
  try {
    let service = await Service.create(data);

    return service.toJSON();
  } catch (err) {
    logger().error('Error while persisting the service into database', err);
  }
}

