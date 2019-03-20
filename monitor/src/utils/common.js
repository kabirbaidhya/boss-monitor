import logger from './logger';

/**
 * To check given two object are equal or not.
 *
 * @param   {string} valueOne
 * @param   {string} valueTwo
 * @returns {boolean}
 */
export function isSame(valueOne, valueTwo) {
  try {
    return JSON.stringify(valueOne) === JSON.stringify(valueTwo);
  } catch (err) {
    logger.error('Error: ', err.message);

    throw new TypeError('Invalid argument.');
  }
}
