/**
 * Create services table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('services', table => {
    table.increments().primary();
    table.string('name').unique().notNullable();
    table.string('status').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
}

/**
 * Drop services table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('services');
}
