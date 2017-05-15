import knex from 'knex';
import bookshelf from 'bookshelf';
import knexConfig from '../knexfile';

/**
 * Create a new database client.
 * Return the same client if it is already created.
 * 
 * @returns {Object} 
 */
export function getClient() {
  let db;

  if (!db) {
    db = bookshelf(knex(knexConfig));
    db.plugin(['bookshelf-camelcase']);

    return db;
  }

  return db;
}
