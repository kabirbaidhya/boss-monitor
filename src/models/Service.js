import { getClient } from '../utils/db';

const db = getClient();
const TABLE_NAME = 'services';

let Service = db.Model.extend({
  tableName: TABLE_NAME,
  hasTimestamps: true
});

export default Service;
