import { verify } from '../utils/slackVerification';


/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {Promise}
 */
export function verifySlackRequest(req, res, next) {
  return verify(req)
    .then(() => next())
    .catch(err => {
      res.sendStatus(err);
    });
}
