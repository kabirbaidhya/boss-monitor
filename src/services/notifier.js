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


// Start WebSeocket server if it is enabled
for (let [key, service] of Object.entries(notifiers)) {
  if (key === 'websocket' && service.isEnabled()) {
    service.start();
  }
}

/**
 * Send the uptime notifcations to the user
 * depending upon what notification services are enabled.
 *
 * @param {Object} params
 */
export function notify(params) {
  for (let [key, service] of Object.entries(notifiers)) {
    if (!service.isEnabled()) {
      continue;
    }

    logger().debug(`Triggering ${key} notification.`);
    service.notify(params);
  }
}
