import * as slack from './slack';
import * as email from './email';
import * as twilio from './twilio';
import * as hipchat from './hipchat';
import logger from '../utils/logger';
import * as websocket from './websocket';

/**
 * Available Notifier services.
 */
const notifiers = {
  slack,
  email,
  twilio,
  hipchat,
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

  for (let [key, service] of Object.entries(notifiers)) {
    if (!service.isEnabled()) {
      continue;
    }

    logger().info(`Triggering ${key} notification.`);
    service.notify(params);
  }
}
