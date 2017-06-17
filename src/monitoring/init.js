import path from 'path';
import chill from '../../package';

/**
 * Initialize the monitor and start monitoring configured services.
 */
export default async function init(configFile) {
  process.stdout.write(`Starting chill ${chill.version}\n`);

  try {
    const { resolve } = await import ('../config/config');

    configFile = configFile || path.resolve('chill.yml');

    const config = resolve(configFile);
    const { 'default': Monitor } = await import('./Monitor');
    const eventListener = await import('./eventListener');

    eventListener.listen();
    config.services.forEach(service => (new Monitor(service)).start());
  } catch (err) {
    process.stderr.write('An error occurred: \n' + err);
  }
}
