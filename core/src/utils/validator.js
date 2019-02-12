import Joi from 'joi';
import logger from '../utils/logger';

/**
 * Validates a given data against the predefined schema.
 *
 * @param   {Object} data
 * @param   {Object} schema
 * @returns {Promise}
 */
export function validate(data, schema) {
  return new Promise((resolve, reject) => {
    const { error, result } = Joi.validate(data, schema);

    logger().debug('Validating data: ', data);

    if (error) {
      logger().debug('Invalid payload: ', error);
      reject(error);

      return;
    }

    logger().debug('Validation successful');

    resolve(result);
  });
}

