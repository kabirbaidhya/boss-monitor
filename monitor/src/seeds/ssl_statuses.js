import { UNKNOWN, VALID, EXPIRED } from '../models/SSLStatus';

/**
 * Insert initial data for statuses table.
 *
 * @param {Knex} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('ssl_statuses').insert([
    { id: UNKNOWN, name: 'Unknown', description: 'SSL status of the service is unknown.' },
    { id: VALID, name: 'Valid', description: 'SSL status of the service is valid.' },
    { id: EXPIRED, name: 'Expired', description: 'SSL status of the service is expired.' }
  ]);
}
