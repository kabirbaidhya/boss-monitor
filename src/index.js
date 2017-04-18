import 'babel-polyfill';
import config from './config/config';
import Monitor from './monitoring/Monitor';
import * as eventListener from './monitoring/eventListener';

eventListener.listen();

config.services.forEach(service => {
  let serviceConfig = Object.assign({}, config.monitoring, service);
  let monitor = new Monitor(serviceConfig);

  monitor.start();
});
