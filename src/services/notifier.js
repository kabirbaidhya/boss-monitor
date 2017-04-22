import * as slack from './slack';
import * as twilio from './twilio';
import * as hipchat from './hipchat';
import logger from '../utils/logger';

/**
 * Available Notifier services.
 */
const notifiers = {
  slack,
  twilio,
  hipchat
};

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

    logger.debug(`Triggering ${key} notification.`);
    service.notify(params);
  }
}
