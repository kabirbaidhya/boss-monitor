import { verify } from '../utils/slackVerification';

/**
 * Validate slack request.
 *
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
export function verifySlackRequest(req, res, next) {
  return verify(req)
    .then(() => next())
    .catch(err => {
      res.sendStatus(err);
    });
}
