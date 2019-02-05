import path from 'path';
import chill from '../../package';
import * as notifier from '../services/notifier';

/**
 * Initialize the monitor and start monitoring configured services.
 *
 * @param {String} configFile
 */
export default async function init(configFile) {
  process.stdout.write(`Starting chill ${chill.version}\n`);

  try {
    const { resolve } = await import ('../config/config');

    // Config file for chill could be added using environment variables too.
    configFile = configFile || process.env.CHILL_CONFIG || path.resolve('chill.yml');

    const config = resolve(configFile);
    const { 'default': Monitor } = await import('./Monitor');
    const eventListener = await import('./eventListener');

    eventListener.listen();
    config.services.forEach(service => (new Monitor(service)).start());

    notifier.init();

  } catch (err) {
    process.stderr.write('An error occurred: \n' + err);
  }
}
