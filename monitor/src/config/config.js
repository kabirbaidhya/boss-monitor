import Yaml from 'yamljs';
import cache from 'memory-cache';
import merge from 'webpack-merge';

import defaultConfig from './default.config';

export const CACHE_KEY = 'config';

/**
 * Resolve configuration by reading the configuration file.
 *
 * @returns {Object}
 */
export function resolve() {
  process.stdout.write(`Loading config file: ${process.env.CHILL_CONFIG}\n`);

  const loadedConfig = Yaml.load(process.env.CHILL_CONFIG);

  const config = merge(defaultConfig, loadedConfig);

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
    return resolve(process.env.CHILL_CONFIG);
  }

  return cache.get(CACHE_KEY);
}
