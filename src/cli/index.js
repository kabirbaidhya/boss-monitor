let yargs = require('yargs');
let chill = require('../../package');
let name = 'chill';
let description = 'Chill - A simple service monitoring tool.';

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
