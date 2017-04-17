import Yaml from 'yamljs';
import Promise from 'bluebird';
import defaultConfig from './default.config';

global.Promise = Promise;

// TODO: Need a way to specify config file from CLI option.
const CONFIG_FILE_NAME = (process.env.NODE_ENV === 'test') ? 'chill.test.yml' : 'chill.yml';
const loadedConfig = Yaml.load(CONFIG_FILE_NAME);
const config = Object.assign({}, defaultConfig, loadedConfig);

export default config;
