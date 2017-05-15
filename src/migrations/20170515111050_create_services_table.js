
export function up(knex) {
  return knex.schema.createTable('services', table => {
    table.increments().primary();
    table.string('name').unique().notNullable();
    table.string('status').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
}

export function down(knex) {
  return knex.schema.dropTable('services');
}
