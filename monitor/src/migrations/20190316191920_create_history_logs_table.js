import { UNKNOWN } from '../models/Status';

/**
 * Create history_logs table.
 *
 * @param  {Object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('history_logs', table => {
    table.increments().primary();
    table.integer('service_id').notNullable()
      .references('id').inTable('services');
    table.integer('status_id').notNullable()
      .references('id').inTable('statuses');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
}

/**
 * Drop history_logs table.
 *;
 * @param  {Object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('history_logs');
}
