import * as config from '../config/config';
import { verify } from '../utils/slackVerification';

/**
 * Validate slack request.
 *
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
export function verifySlackRequest(req, res, next) {
  if (!config.get().notifications.slack.enabled) {
    return res.sendStatus(404);
  }

  return verify(req, res, next)
    .then(() => next())
    .catch(err => res.sendStatus(err));
}
