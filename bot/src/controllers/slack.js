import logger from '../utils/logger';
import * as slackService from '../services/slack';

/**
 * Confirm receipt by sending HTTP 200 response to the original request.
 * Initiate slack response to slash-command.
 *
 * @param {object} req
 * @param {object} res
 */
export async function getStatus(req, res) {
  res.json({ response_type: 'in_channel' });
  try {
    const response = await slackService.notify(req.body);
    logger().info('Status sent to slack', response);
  } catch (err) {
    logger().error('Error while sending status to slack', err);
  }
}
