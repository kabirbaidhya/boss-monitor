import HttpStatus from 'http-status-codes';

import logger from '../utils/logger';
import buildError from '../utils/buildError';

/**
 * Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 *
 * @param  {object}   res
 */
export function notFoundError(res) {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
    }
  });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {object}   err
 * @param  {object}   res
 */
export function genericErrorHandler(err, res) {
  // eslint-disable-line no-unused-vars
  if (err.stack) {
    logger().error(err.stack);
  }
  logger().error(err);
  let error = buildError(err);

  res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
}
