import Yaml from 'yamljs';
import Promise from 'bluebird';
import merge from 'webpack-merge';
import defaultConfig from './default.config';

global.Promise = Promise;

// TODO: Need a way to specify config file from CLI option.
// TODO: Currently the config merging stuff is not testable, need to make it testable.
const CONFIG_FILE_NAME = (process.env.NODE_ENV === 'test') ? 'chill.test.yml' : 'chill.yml';

const DEFAULT_FILENAME = 'chill.yml';

let resolvedConfig = {};

/**
 * Resolve configuration by reading the configuration file.
 * 
 * @param {string} [filename=DEFAULT_FILENAME] 
 * @returns {Object}
 */
export function resolve(filename = DEFAULT_FILENAME) {
  const loadedConfig = Yaml.load(filename);

  resolvedConfig = merge(defaultConfig, loadedConfig);

  return resolvedConfig;
}

/**
 * Return the resolved configuration.
 * 
 * @returns {Object}
 */
export function get() {
  return resolvedConfig;
}
