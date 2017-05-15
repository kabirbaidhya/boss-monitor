import logger from '../utils/logger';
import * as serviceDao from '../daos/serviceDao';

/**
 * Persist status change of a service to the database.
 * 
 * @param {Object} 
 * @returns {Promise}
 */
export async function persist({ status, serviceName }) {
  let data;
  let service = await serviceDao.fetchByName(serviceName);

  if (!service) {
    data = await serviceDao.create({ status, name: serviceName });

    logger.info(`Persisted service "${serviceName}" with status as "${status}".`);
    logger.debug('Data', data);

    return data;
  }

  data = await serviceDao.update(service.id, { status, name: serviceName });

  logger.info(`Updated service "${serviceName}" with status as "${status}".`);
  logger.debug('Data', data);

  return data;
}
