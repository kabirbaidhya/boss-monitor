import logger from '../utils/logger';
import { getClient } from '../utils/db';

const db = getClient();

// Service types
export const TYPE_HTTP = 'http';
export const TYPE_TCP = 'tcp';

/**
 * Service Model.
 */
class Service extends db.Model {
  /**
   * Table name for Service model.
   */
  get tableName() {
    return 'services';
  }

  /**
   * Get timestamps for Service model.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * Create a new Service.
   *
   * @param   {Object} data
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
