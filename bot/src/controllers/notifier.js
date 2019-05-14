import * as notifierService from '../services/notifier';
import logger from '../utils/logger';

export function sendNotification(req, res) {
  notifierService.sendNotification(req.body)
    .then(response => {
      res.json(response);
      logger().info('Notification sent to slack successfully', response);
    }).catch(err => {
      res.json(err);
      logger().info('Notification sending failed', err);
    })
}