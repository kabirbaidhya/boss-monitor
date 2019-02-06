import { UNKNOWN } from '../models/Status';

/**
 * Create status_logs table.
 *
 * @param  {Object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('status_logs', table => {
    table.increments().primary();
    table.integer('service_id').notNullable()
      .references('id').inTable('services');
    table.integer('status_id').notNullable()
      .defaultTo(UNKNOWN).references('id').inTable('statuses');
    // This will store the full http response object as JSON
    // which would help in debugging.
    table.json('response').nullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
}

/**
 * Drop status_logs table.
 *
 * @param  {Object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('status_logs');
}
