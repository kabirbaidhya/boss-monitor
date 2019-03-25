import Joi from 'joi';

/**
 * Validation schema for status log.
 */
export default {
  serviceId: Joi.number()
    .integer()
    .positive()
    .required(),
  statusId: Joi.number()
    .integer()
    .positive()
    .required(),
  response: Joi.object().optional()
};
