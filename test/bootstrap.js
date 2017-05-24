import chai from 'chai';
import chaiSubset from 'chai-subset';
import { version } from '../package';
import * as config from '../src/config/config';

process.stdout.write(`\nChill ${version} - Test Suite`);

// Use Plugins
chai.use(chaiSubset);

// Resolve test configuration.
config.resolve('chill.test.yml');
