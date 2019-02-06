import Joi from 'joi';

export default {
  serviceId: Joi.number().integer().positive().required(),
  statusId: Joi.number().integer().positive().required(),
  response: Joi.object().optional()
};
