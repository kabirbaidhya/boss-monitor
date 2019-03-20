import { UNKNOWN } from '../models/SSLStatus';

/**
 * Create status_logs table.
 *
 * @param  {Object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('ssl_status_logs', table => {
    table.increments().primary();
    table.integer('service_id').notNullable()
      .references('id').inTable('services');
    table.integer('ssl_status_id').notNullable()
      .defaultTo(UNKNOWN).references('id').inTable('ssl_statuses');
    table.string('valid_from').nullable();
    table.string('valid_to').nullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
}

/**
 * Drop status_logs table.
 *
 * @param  {Object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('ssl_status_logs');
}
