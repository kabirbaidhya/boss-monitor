import merge from 'webpack-merge';
import Monitor from './Monitor';
import config from '../config/config';
import * as eventListener from './eventListener';

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
