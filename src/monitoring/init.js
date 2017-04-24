import merge from 'webpack-merge';
import config from './config/config';
import Monitor from './monitoring/Monitor';
import * as eventListener from './monitoring/eventListener';

/**
 * Initialize the monitor and start monitoring configured services.
 */
export default function init() {
  eventListener.listen();

  config.services.forEach(service => {
    let serviceConfig = merge(config.monitoring, service);
    let monitor = new Monitor(serviceConfig);

    monitor.start();
  });
}
