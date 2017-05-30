import { getClient } from '../utils/db';

const db = getClient();
const TABLE_NAME = 'status_logs';

class StatusLog extends db.Model {

  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  /**
   * Fetch a statusLog by its name.
   *
   * @param  {String} id
   * @return {Promise}
   */
  static async fetchByName(name) {
    let statusLog = await new StatusLog({ name }).orderBy('created_at', 'DESC').fetch();

    if (!statusLog) {
      return null;
    }

    return statusLog;
  }

  /**
    * Create a new statusLog.
    *
    * @param  {Object} statusLog
    * @return {Promise}
    */
  static async create({ name, status }) {
    let statusLog = await new StatusLog({ name, status }).save();

    return statusLog;
  }
}

export default StatusLog;

