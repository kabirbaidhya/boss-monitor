import Yaml from 'yamljs';
import Promise from 'bluebird';
import defaultConfig from './default.config';

global.Promise = Promise;

const CONFIG_FILE_NAME = 'chill.yml';
const loadedConfig = Yaml.load(CONFIG_FILE_NAME); // TODO: Need a way to specify config file from CLI option.
const config = Object.assign({}, defaultConfig, loadedConfig);

export default config;
