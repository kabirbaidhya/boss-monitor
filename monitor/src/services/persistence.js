import moment from 'moment';
import { differenceWith } from 'lodash';

import logger from '../utils/logger';
import Service from '../models/Service';
import * as config from '../config/config';
import StatusLog from '../models/StatusLog';
import * as serviceService from './service';

/**
 * Synchronizes the configured services with the database
 * and returns a list of services synced with the database.
 *
 * @returns {Promise}
 */
export async function synchronize() {
  logger().info('Synchronizing the configured services.');

  const configuredServices = config.get().services;
  const existingServices = await Service.fetchAll();

  logger().debug('Configured services', configuredServices);
  logger().debug('Existing services.', existingServices.toJSON());

  const diff = computeDiff(configuredServices, existingServices.toJSON());
  const result = await persist(diff);

  logger().info('Persisted the changes.');

  return result;
}

/**
 * Persist status log of a service to the database.
 *
 * @param   {Object} diff
 * @returns {Promise}
 */
export async function persist(diff) {
  // Persist all the services that hasn't been synced to the database yet.
  const persistingPromises = diff.notPersisted.map(service => {
    return serviceService.create({
      name: service.name,
      url: service.url
    });
  });

  // These are the services that were persisted before and do exist in the database
  // but are removed from the configuration (chill.yml). We still need to think about
  // what to do with these. For not we'll just leave them as it is.
  const remainingPromises = diff.notRequired.map(service => {
    // TODO: Need to think about what to do with this. Perhaps archive or delete?
    return service;
  });

  // Wait untill all is good.
  await Promise.all([...persistingPromises, ...remainingPromises]);

  // Fetch the list of services again.
  const data = await Service.fetchAll();
  const created = (persistingPromises.length > 0);

  return {
    created,
    data: data.toJSON()
  };
}

/**
 * Fetch last status log by service id.
 *
 * @param   {String} serviceId
 * @returns {Promise}
 */
export async function getLastStatus(serviceId) {
  try {
    const data = await StatusLog.fetchByServiceId(serviceId);

    if (!data) {
      return null;
    }

    logger().info(`Fetched last status of "${serviceId}"`);
    logger().debug('Data', data.toJSON());

    // Create and set moment object from timestamp
    data.set('createdAt', moment(data.get('createdAt')));

    return data;
  } catch (err) {
    logger().error('Error while fetching status change', err);
  }
}

/**
 * Compute the diff between the configured and persisted services.
 *
 * @param {Array} configuredServices
 * @param {Array} persistedServices
 * @returns {Object}
 */
function computeDiff(configuredServices, persistedServices) {
  const notPersisted = differenceWith(configuredServices, persistedServices, comparator);
  const notRequired = differenceWith(persistedServices, configuredServices, comparator);

  return { notPersisted, notRequired };
}

/**
 * A comparator callback function based upon which the diff is computed
 * between the configured services and persisted services.
 *
 * @param {Object} configuredOne
 * @param {Object} persistedOne
 * @returns {String}
 */
function comparator(configuredOne, persistedOne) {
  // For now we're just using simple comparision by the service url.
  // We might need more sophisticated checking later on.
  // TODO: More sophisticated url checking and service comparison.
  return configuredOne.url.toLowerCase() === persistedOne.url.toLowerCase();
}
