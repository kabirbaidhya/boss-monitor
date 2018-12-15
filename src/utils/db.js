import knex from 'knex';
import bookshelf from 'bookshelf';
import * as config from '../config/config';

/**
 * Database instance.
 */
let db;

/**
 * Create a new database client.
 * Return the same client if it is already created.
 *
 * @returns {Object}
 */
export function getClient() {
  if (db) {
    return db;
  }

  const dbConfig = config.get().db;

  db = bookshelf(knex(dbConfig));
  db.plugin(['bookshelf-camelcase']);

  return db;
}
