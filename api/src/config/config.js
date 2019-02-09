import Promise from 'bluebird';

import { get, resolve, CACHE_KEY, DEFAULT_FILENAME } from '../../../core/src/config/config';

global.Promise = Promise;

export { get, resolve, CACHE_KEY, DEFAULT_FILENAME };
