import deepEql from 'deep-eql';

import logger from './logger';

/**
 * To check given two object are equal or not.
 *
 * @param   {any} valueOne
 * @param   {any} valueTwo
 * @returns {boolean}
 */
export function isSame(valueOne, valueTwo) {
  try {
    return deepEql(valueOne, valueTwo);
  } catch (err) {
    logger.error('Error: ', err.message);

    throw new TypeError('Invalid argument.');
  }
}
