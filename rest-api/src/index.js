import 'babel-polyfill';
import init from './init';

init(() => {
  import('./app');
});

