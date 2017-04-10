import Promise from 'bluebird';
import Yaml from 'yamljs';

global.Promise = Promise;

const CONFIG_FILE_NAME = 'chill.yml';
const defaultConfig = {
    logging: {
        level: process.env.LOGGING_LEVEL || 'info'
    },
    monitoring: {
        minInterval: 1000,
        maxInterval: 10000,
        method: 'OPTIONS',
        downStatus: '^(5..|4..)$'
    },
    notifications: [],
    services: []
};
let loadedConfig = Yaml.load(CONFIG_FILE_NAME);
let config = Object.assign({}, defaultConfig, loadedConfig);

export default config;
