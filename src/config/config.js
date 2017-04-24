import Yaml from 'yamljs';
import Promise from 'bluebird';
import merge from 'webpack-merge';
import defaultConfig from './default.config';

global.Promise = Promise;

// TODO: Need a way to specify config file from CLI option.
// TODO: Currently the config merging stuff is not testable, need to make it testable.
const CONFIG_FILE_NAME = (process.env.NODE_ENV === 'test') ? 'chill.test.yml' : 'chill.yml';
const loadedConfig = Yaml.load(CONFIG_FILE_NAME);
const config = merge(defaultConfig, loadedConfig);

export default config;
