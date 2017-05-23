import Monitor from './Monitor';
import * as eventListener from './eventListener';

/**
 * Initialize the monitor and start monitoring configured services.
 */
export default function init(config) {
  eventListener.listen();

  config.services.forEach(service => (new Monitor(service)).start());
}
