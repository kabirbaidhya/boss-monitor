import yargs from 'yargs';
import chill from '../../package';
import init from '../monitoring/init';

const APP_NAME = 'chill';
const APP_NAME_VERSION_STRING = `${APP_NAME} ${chill.version}`;

yargs
  .usage(`Usage: ${APP_NAME} [options]`, { 'a': {} })
  .version('version', APP_NAME_VERSION_STRING)
  .alias('V', 'version')
  .help('h')
  .alias('h', 'help');

yargs.options({
  'c': {
    alias: 'config',
    describe: 'Configuration file path.'
  }
});

const argv = yargs.argv;

// Initialize the application with the provided configuration.
init(argv.config);
