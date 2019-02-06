import camelize from 'camelize';

import Status from './Status';
import Service from './Service';
import logger from '../utils/logger';
import { getClient } from '../utils/db';
import * as statusLogQuery from '../queries/status';

const db = getClient();
const TABLE_NAME = 'status_logs';

class StatusLog extends db.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  service() {
    return this.belongsTo(Service);
  }

  status() {
    return this.belongsTo(Status);
  }

  static fetchServiceStatus(serviceId) {
    logger().info(`Fetching the latest status of service ${serviceId}`);

    return new StatusLog({ serviceId }).orderBy('created_at', 'DESC').fetch();
  }

  static async fetchAllLogs() {
    logger().info('Fetching all status logs');

    let results = await db.knex.raw(
      statusLogQuery.STATUS_LOGS
    );

    return camelize(results.rows);
  }

  static async fetchLatestStatuses() {
    logger().info('Fetching the latest status');

    let results = await db.knex.raw(
      statusLogQuery.LATEST_STATUS
    );

    return camelize(results.rows);
  }
}

export default StatusLog;
