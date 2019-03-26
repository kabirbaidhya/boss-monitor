import { UNKNOWN } from '../models/SSLStatus';

/**
 * Alter status_logs add ssl status columns table.
 *
 * @param  {Object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.table('status_logs', table => {
    // Knex:warning - SQLite3 Foreign & Primary keys may only be added on create
    table
      .integer('ssl_status_id')
      .notNullable()
      .defaultTo(UNKNOWN)
      .references('id')
      .inTable('ssl_statuses');
    table.string('valid_from').nullable();
    table.string('valid_to').nullable();
  });
}

/**
 * Revert above changes.
 *
 * @param  {Object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.table('status_logs', table => {
    // Knex:warning - SQLite3 Foreign & Primary keys may only be added on create
    // table.dropForeign(['ssl_status_id']);
    table.dropColumn('ssl_status_id');
    table.dropColumn('valid_from');
    table.dropColumn('valid_to');
  });
}
