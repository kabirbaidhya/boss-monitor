import logger from '../utils/logger';
import Service from '../models/Service';

/**
 * Persist status change of a service to the database.
 * 
 * @param {Object} 
 * @returns {Promise}
 */
export async function persist({ status, serviceName }) {
  try {
    let data;
    let service = await Service.fetchByName({ name: serviceName });

    if (!service) {
      data = await Service.create({ status, name: serviceName });

      logger.info(`Persisted service "${serviceName}" with status as "${status}".`);
      logger.debug('Data', data);

      return data;
    }

    data = await Service.update(service.id, { status });

    logger.info(`Updated service "${serviceName}" with status as "${status}".`);
    logger.debug('Data', data);

    return data;
  } catch (err) {
    logger.error('Error while persisting status change to database', err);
  }
}
