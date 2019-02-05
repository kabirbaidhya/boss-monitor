import { getClient } from '../utils/db';

const db = getClient();
const TABLE_NAME = 'status_logs';

/**
 * StatusLog Model.
 */
class StatusLog extends db.Model {

  /**
   * Get the table name for the model.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * If true, get the timestamps for the model.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * Fetch a statusLog by its name.
   *
   * @param   {String} name
   * @returns {Promise}
   */
  static async fetchByName(name) {
    const statusLog = await new StatusLog({ name }).orderBy('created_at', 'DESC').fetch();

    if (!statusLog) {
      return null;
    }

    return statusLog;
  }

  /**
    * Create a new statusLog.
    *
    * @param   {Object} statusLog
    * @returns {Promise}
    */
  static async create({ name, status }) {
    const statusLog = await new StatusLog({ name, status }).save();

    return statusLog;
  }
}

export default StatusLog;

