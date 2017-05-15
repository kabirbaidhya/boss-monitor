import logger from '../utils/logger';
import Service from '../models/Service';

/**
 * Fetch a service by its name.
 *
 * @param  {string}  id
 * @return {Promise}
 */
export async function fetchByName(name) {
  try {
    return await
      new Service({ name })
        .fetch()
        .then(service => {
          if (!service) {
            return null;
          }

          return service;
        });
  } catch (err) {
    logger.error('Error fetching service from database.', err);
  }
}

/**
 * Create a new service.
 *
 * @param  {object}  service
 * @return {Promise}
 */
export async function create({ name, status }) {
  try {
    return await
      new Service({ name, status })
        .save()
        .then(service => service.refresh());
  } catch (err) {
    logger.error('Error inserting new service to database.', err);
  }
}

/**
 * Update a service.
 *
 * @param  {string}  id
 * @param  {object}         service
 * @return {Promise}
 */
export async function update(id, { name, status }) {
  try {
    return await
      new Service({ id })
        .save({ name, status })
        .then(service => service.refresh());
  } catch (err) {
    logger.error('Error updating service in database', err);
  }
}
