import { validate } from '../utils/validator';
import statusLogSchema from '../schema/statusLog';

/**
 * Validate the status log payload.
 *
 * @param req
 * @param res
 * @param next
 */
export function validateStatusLog(req, res, next) {
  return validate(req.body, statusLogSchema)
    .then(() => next())
    .catch(err => next(err));
}
