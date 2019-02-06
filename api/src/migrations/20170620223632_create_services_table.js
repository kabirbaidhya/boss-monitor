import { TYPE_HTTP, TYPE_TCP } from '../models/Service';

export function up(knex) {
  return knex.schema.createTable('services', table => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('url').unique().notNullable();
    // Type of the service.
    table.enum('type', [TYPE_HTTP, TYPE_TCP]).defaultTo(TYPE_HTTP);
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
}

export function down(knex) {
  return knex.schema.dropTable('services');
}
