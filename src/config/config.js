import Yaml from 'yamljs';
import Promise from 'bluebird';
import cache from 'memory-cache';
import merge from 'webpack-merge';

import defaultConfig from './default.config';

global.Promise = Promise;

export const CACHE_KEY = 'config';
export const DEFAULT_FILENAME = 'chill.yml';

/**
 * Resolve configuration by reading the configuration file.
 *
 * @param {String} [filename=DEFAULT_FILENAME]
 * @returns {Object}
 */
export function resolve(filename = DEFAULT_FILENAME) {
  process.stdout.write(`Loading config file: ${filename}\n`);

  let loadedConfig = Yaml.load(filename);
  let config = merge(defaultConfig, loadedConfig);

  // Add monitoring config as defaults for each service configuration.
  config.services = config.services.map(service => {
    return merge(config.monitoring, service);
  });

  // Put the resolved config into the cache.
  cache.put(CACHE_KEY, config);

  return config;
}

/**
 * Return the resolved configuration.
 *
 * @returns {Object}
 */
export function get() {
  if (!cache.get(CACHE_KEY)) {
    return resolve();
  }

  return cache.get(CACHE_KEY);
}
