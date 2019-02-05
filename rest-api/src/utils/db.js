import knex from 'knex';
import bookshelf from 'bookshelf';
import bookshelfCamelcase from 'bookshelf-camelcase';

import logger from './logger';
import * as config from '../config/config';

/**
 * Create a new database client.
 * Return the same client if it is already created.
 *
 * @returns {Object}
 */
let db;

export function getClient() {
  if (db) {
    return db;
  }

  const dbConfig = config.get().db;

  logger().info(`Setting up database configuration (${dbConfig.client})`);
  logger().debug('Database Details', {
    client: dbConfig.client,
    filename: dbConfig.connection.filename,
    database: dbConfig.connection.database
  });

  db = bookshelf(knex(dbConfig));
  db.plugin(bookshelfCamelcase);

  return db;
}
