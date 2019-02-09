import '@babel/polyfill';
import init from './init';

require('dotenv').config();

init(() => {
  import('./app');
});

