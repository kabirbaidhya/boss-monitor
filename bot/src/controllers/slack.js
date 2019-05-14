import * as slackService from '../services/slack';
import logger from '../utils/logger';

/**
 * Confirm receipt by sending HTTP 200 response to the original request.
 * Initiate slack response to slash-command.
 *
 * @param {object} req
 * @param {object} res
 */
export function getStatus(req, res) {
  res.json({ response_type: 'in_channel' });
  slackService.notify(req.body).then(response => {
    logger().info('Status sent to slack', response);
  }).catch(err => {
    logger().error('Error while sending status to slack', err);
  });
}
