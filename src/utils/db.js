import knex from 'knex';
import bookshelf from 'bookshelf';
import * as config from '../config/config';

const dbConfig = config.resolve().db;

/**
 * Create a new database client.
 * Return the same client if it is already created.
 * 
 * @returns {Object} 
 */
export function getClient() {
  let db;

  if (!db) {
    db = bookshelf(knex(dbConfig));
    db.plugin(['bookshelf-camelcase']);

    return db;
  }

  return db;
}
