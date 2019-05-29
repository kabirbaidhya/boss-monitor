import logger from '../utils/logger';
import * as notifierService from '../services/notifier';

/**
 * Send auto-notification to slack.
 *
 * @param {object} req
 * @param {object} res
 */
export async function sendNotification(req, res) {
  try {
    const response = await notifierService.sendNotification(req.body);
    res.json(response);
    logger().info('Notification sent to slack successfully', response);
  } catch (err) {
    res.json(err);
    logger().info('Notification sending failed', err);
  }
}
