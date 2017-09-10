import * as slack from './slack';
import * as email from './email';
import * as socket from './socket';
import * as twilio from './twilio';
import * as hipchat from './hipchat';
import logger from '../utils/logger';

/**
 * Available Notifier services.
 */
const notifiers = {
  slack,
  email,
  twilio,
  socket,
  hipchat
};

/**
 * Send the uptime notifications to the user
 * depending upon what notification services are enabled.
 *
 * @param {Object} params
 */
export function notify(params) {
  logger().info('Sending notification via all enabled notifiers.');

  for (let [key, service] of Object.entries(notifiers)) {
    if (!service.isEnabled()) {
      continue;
    }

    logger().info(`Triggering ${key} notification.`);
    service.notify(params);
  }
}
