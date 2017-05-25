import logger from '../utils/logger';
import StatusChange from '../models/StatusChange';

/**
 * Persist status change of a service to the database.
 * 
 * @param {Object} 
 * @returns {Promise}
 */
export async function persist({ status, serviceName }) {
  try {
    let data = await StatusChange.create({ status, name: serviceName });

    logger().info(`Persisted service "${serviceName}" with status as "${status}"`);
    logger().debug('Data', data.attributes);

    return data;
  } catch (err) {
    logger().error('Error while persisting status change to database', err);
  }
}
