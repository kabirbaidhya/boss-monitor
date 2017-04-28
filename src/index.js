import 'babel-polyfill';
import merge from 'webpack-merge';
import config from './config/config';
import Monitor from './monitoring/Monitor';
import * as eventListener from './monitoring/eventListener';

eventListener.listen();

config.services.forEach(service => {
  let serviceConfig = merge(config.monitoring, service);
  let monitor = new Monitor(serviceConfig);

  monitor.start();
});
