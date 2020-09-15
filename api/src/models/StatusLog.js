import camelize from 'camelize';

import Status from './Status';
import Service from './Service';
import logger from '../utils/logger';
import { getClient } from '../utils/db';
import * as statusLogQuery from '../queries/status';

const db = getClient();

/**
 * StatusLog Model.
 */
class StatusLog extends db.Model {
  /**
   * Table name for StatusLog model.
   */
  get tableName() {
    return 'status_logs';
  }

  /**
   * Get timestamps for StatusLog model.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * Relationship with Service model.
   */
  service() {
    return this.belongsTo(Service);
  }

  /**
   * Relationship with Status model.
   */
  status() {
    return this.belongsTo(Status);
  }

  /**
   * Get status of a single service.
   *
   * @param {number} serviceId
   */
  static fetchServiceStatus(serviceId) {
    logger().info(`Fetching the latest status of service ${serviceId}`);

    return new StatusLog({ serviceId }).orderBy('created_at', 'DESC').fetch();
  }

  /**
   * Get all status logs.
   */
  static async fetchAllLogs() {
    logger().info('Fetching all status logs');

    const results = await db.knex.raw(statusLogQuery.STATUS_LOGS);

    return camelize(results);
  }

  /**
   * Get latest status of all services.
   */
  static async fetchLatestStatuses() {
    logger().info('Fetching the latest status');

    const results = await db.knex.raw(
      statusLogQuery.LATEST_STATUS
    );

    return camelize(results);
  }
}

export default StatusLog;
