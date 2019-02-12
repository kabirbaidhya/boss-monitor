import logger from '../utils/logger';
import { getClient } from '../utils/db';

const db = getClient();

// Service types
export const TYPE_HTTP = 'http';
export const TYPE_TCP = 'tcp';

/**
 * Service class.
 */
class Service extends db.Model {
  /**
   * Tablename getter.
   */
  get tableName() {
    return 'services';
  }

  /**
   * Has timestamp getter.
   */
  get hasTimestamps() {
    return true;
  }

  /**
  * Create a new Service.
  *
  * @param  {Object} data
  * @returns {Promise}
  */
  static async create(data) {
    const service = new Service({
      name: data.name,
      url: data.url
    });

    logger().info('Creating a new service');
    logger().debug('Service data', data);

    await service.save();

    logger().info('Service created', { id: service.get('id') });

    return service;
  }
}

export default Service;
