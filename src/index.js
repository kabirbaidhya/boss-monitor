import 'babel-polyfill';
import init from './monitoring/init';
import * as config from './config/config';

// Initialize the application with the local configuration.
init(config.resolve());
