import { getClient } from '../utils/db';

const db = getClient();
const TABLE_NAME = 'services';

class Service extends db.Model {

  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  /**
   * Fetch a service by its name.
   *
   * @param  {String}  id
   * @return {Promise}
   */
  static async fetchByName(name) {
    let service = await new Service({ name }).fetch();

    return service;
  }

  /**
    * Create a new service.
    *
    * @param  {Object}  service
    * @return {Promise}
    */
  static async  create({ name, status }) {
    let service = await new Service({ name, status }).save().then(service => service.refresh());

    return service;
  }

  /**
   * Update a service.
   *
   * @param  {String}  id
   * @param  {object}  service
   * @return {Promise}
   */
  static async update(id, { status }) {
    let service = await new Service({ id }).save({ status }, { patch: true }).then(service => service.refresh());

    return service;
  }
}

export default Service;
