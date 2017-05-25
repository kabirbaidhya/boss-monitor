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
