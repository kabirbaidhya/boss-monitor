import path from 'path';
import pkg from '../package';
import { isFunction } from './utils/common';

/**
 * Initialize the monitor and start monitoring configured services.
 *
 * @param   {Function} callback
 * @returns {Promise}
 */
export default async function init(callback) {
  process.stdout.write(`Initializing ${pkg.name} ${pkg.version}\n`);

  try {
    const config = await resolveConfig();

    // If callback is a function then trigger it.
    if (isFunction(callback)) {
      callback(config);
    }

    return config;
  } catch (err) {
    process.stderr.write('An error occurred: \n' + err);
  }
}

/**
 * Resolve config from environment variable CHILL_CONFIG or the default filename.
 *
 * @returns {Promise}
 */
export async function resolveConfig() {
  const { resolve, DEFAULT_FILENAME } = await import('./config/config');

  // Config file for chill could be added using environment variables too.
  const configFile = process.env.CHILL_CONFIG || path.resolve(DEFAULT_FILENAME);

  return resolve(configFile);
}
