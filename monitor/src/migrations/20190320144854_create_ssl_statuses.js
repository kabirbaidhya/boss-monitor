import { seed } from '../seeds/ssl_statuses';

/**
 * Create statuses table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('ssl_statuses', table => {
    table.increments().primary();
    table.string('name').notNullable().unique();
    table.string('description').nullable();
  }).then(() => seed(knex));
}

/**
 * Drop statuses table.
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('ssl_statuses');
}
