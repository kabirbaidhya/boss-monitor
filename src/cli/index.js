import 'babel-polyfill';
import yargs from 'yargs';
import chill from '../../package';
import init from '../monitoring/init';
import * as config from '../config/config';

const name = 'chill';

yargs
  .usage(`Usage: ${name} [options]`, { 'a': {} })
  .version('version', `${name} ${chill.version}`)
  .alias('V', 'version')
  .help('h')
  .alias('h', 'help');

yargs.options({
  'c': {
    alias: 'config',
    default: 'chill.yml',
    describe: 'Configuration file path.'
  }
});

let argv = yargs.argv;

// Initialize the application with the provided config.
init(config.resolve(argv.config));
