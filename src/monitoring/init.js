import merge from 'webpack-merge';
import Monitor from './Monitor';
import * as eventListener from './eventListener';

/**
 * Initialize the monitor and start monitoring configured services.
 */
export default function init(config) {
  eventListener.listen();

  // TODO: Move this config merging to the config.resovle() method.
  config.services.forEach(service => {
    let serviceConfig = merge(config.monitoring, service);
    let monitor = new Monitor(serviceConfig);

    monitor.start();
  });
}
