import 'babel-polyfill';
import yargs from 'yargs';
import chill from '../../package';

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
(async () => {
  const config = await import('../config/config');
  const init = await import('../monitoring/init');

  init(config.resolve(argv.config);
})();
