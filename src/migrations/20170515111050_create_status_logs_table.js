/**
 * Create status_logs table.
 *
 * @param  {Object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('status_logs', table => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('status').notNullable();
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
