import { getClient } from '../utils/db';

const db = getClient();
const TABLE_NAME = 'status_changes';

class StatusChange extends db.Model {

  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  /**
   * Fetch a statusChange by its name.
   *
   * @param  {String} id
   * @return {Promise}
   */
  static async fetchByName(name) {
    let statusChange = await new StatusChange({ name }).orderBy('created_at', 'DESC').fetch();

    if (!statusChange) {
      return null;
    }

    return statusChange.attributes;
  }

  /**
    * Create a new statusChange.
    *
    * @param  {Object} statusChange
    * @return {Promise}
    */
  static async create({ name, status }) {
    let statusChange = await new StatusChange({ name, status }).save();

    return statusChange;
  }
}

export default StatusChange;

