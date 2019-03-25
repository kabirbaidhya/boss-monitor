import { UNKNOWN, UP, DOWN, MAINTENANCE } from '../models/Status';

/**
 * Insert initial data for statuses table.
 *
 * @param {Knex} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('statuses').insert([
    { id: UNKNOWN, name: 'Unknown', description: 'Status of the service is unknown.' },
    { id: UP, name: 'Up', description: 'Status of the service is up.' },
    { id: DOWN, name: 'Down', description: 'Status of the service is down.' },
    { id: MAINTENANCE, name: 'Under Maintenance', description: 'Status of the service is under maintenance.' }
  ]);
}
