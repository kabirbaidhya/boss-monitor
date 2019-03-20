import { getClient } from '../utils/db';

const db = getClient();

export const UNKNOWN = 1;
export const VALID = 2;
export const EXPIRED = 3;

/**
 * SSLStatus class.
 */
class SSLStatus extends db.Model {
  /**
   * Tablename getter.
   */
  get tableName() {
    return 'ssl_statuses';
  }

  /**
   * Has timestamp getter.
   */
  get hasTimestamps() {
    return true;
  }
}

export default SSLStatus;
