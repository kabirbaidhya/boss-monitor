import { getClient } from '../utils/db';

const db = getClient();

export const UNKNOWN = 1;
export const UP = 2;
export const DOWN = 3;
export const UNDER_MAINTENANCE = 4;

/**
 * Status class.
 */
class Status extends db.Model {
  /**
   * Tablename getter.
   */
  get tableName() {
    return 'statuses';
  }

  /**
   * Has timestamp getter.
   */
  get hasTimestamps() {
    return true;
  }
}

export default Status;
