import { getClient } from '../utils/db';

const db = getClient();

export const UNKNOWN = 1;
export const UP = 2;
export const DOWN = 3;

/**
 * Status Model.
 */
class Status extends db.Model {
  /**
   * Table name for Status model.
   */
  get tableName() {
    return 'statuses';
  }

  /**
   * Get timestamps for Status model.
   */
  get hasTimestamps() {
    return true;
  }
}

export default Status;
