import { UNKNOWN, UP, DOWN, MAINTENANCE } from '../models/Status';

/**
 * Insert initial data for statuses table.
 *
 * @param {Knex} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex('statuses').insert([
    { id: UNKNOWN, name: 'Unknown', description: 'Status of the service is Unknown.' },
    { id: UP, name: 'Up', description: 'Status of the service is Up.' },
    { id: DOWN, name: 'Down', description: 'Status of the service is Down.' },
    { id: MAINTENANCE, name: 'Maintenance', description: 'Status of the service is Maintenance.' }
  ]);
}
