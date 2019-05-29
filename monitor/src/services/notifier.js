import * as email from './email';
import * as twilio from './twilio';
import logger from '../utils/logger';
import * as websocket from './websocket';

/**
 * Available Notifier services.
 */
const notifiers = {
  email,
  twilio,
  websocket
};

/**
 * Initialize notifier service.
 */
export function init() {
  websocket.init();
}

/**
 * Send the uptime notifcations to the user
 * depending upon what notification services are enabled.
 *
 * @param {Object} params
 */
export function notify(params) {
  logger().info('Sending notification via all enabled notifiers.');

  for (const [key, service] of Object.entries(notifiers)) {
    if (!service.isEnabled()) {
      continue;
    }

    logger().info(`Triggering ${key} notification.`);
    service.notify(params);
  }
}
