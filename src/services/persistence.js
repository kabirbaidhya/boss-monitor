import moment from 'moment';

import logger from '../utils/logger';
import StatusLog from '../models/StatusLog';

/**
 * Persist status log of a service to the database.
 * 
 * @param {Object} 
 * @returns {Promise}
 */
export async function persist({ status, serviceName }) {
  try {
    let data = await StatusLog.create({ status, name: serviceName });

    logger().info(`Persisted service "${serviceName}" with status as "${status}"`);
    logger().debug('Data', data.attributes);

    return data;
  } catch (err) {
    logger().error('Error while persisting status change to database', err);
  }
}

/**
 * Fetch last status log by service name.
 * 
 * @param {String} serviceName 
 * @returns {Promise}
 */
export async function getLastStatus(serviceName) {
  try {
    let data = await StatusLog.fetchByName(serviceName);

    if (!data) {
      return null;
    }

    logger().info(`Fetched last status of "${serviceName}"`);
    logger().debug('Data', data.toJSON());

    // Create and set moment object from timestamp
    data.set('createdAt', moment(data.get('createdAt')));

    return data;
  } catch (err) {
    logger().error('Error while fetching status change', err);
  }
}
