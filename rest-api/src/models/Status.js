import { getClient } from '../utils/db';

const db = getClient();

export const UNKNOWN = 1;
export const UP = 2;
export const DOWN = 3;

class Status extends db.Model {
  get tableName() {
    return 'statuses';
  }

  get hasTimestamps() {
    return true;
  }
}

export default Status;
