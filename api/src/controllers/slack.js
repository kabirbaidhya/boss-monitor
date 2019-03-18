import * as slackServices from '../services/slack';

/**
 * Confirm receipt by sending HTTP 200 response to the original request.
 * Initiate slack response to slash-command.
 *
 * @param {object} req
 * @param {object} res
 */
export function getStatus(req, res) {
  res.json({ response_type: 'in_channel' });
  slackServices.notify(req.body);
}
