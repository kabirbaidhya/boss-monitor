import * as slack from './slack';
import logger from './../utils/logger';

/**
 * Available Notifier services.
 */
const notifiers = {
  slack
};

/**
 * Send the uptime notifcations to the user
 * depending upon what notification services are enabled.
 *
 * @param {Object} params
 */
export function notify(params) {
  for (let [key, service] of Object.entries(notifiers)) {
    if (service.isEnabled()) {
      logger.debug(`Triggering ${key} notification.`);
      service.notify(params);
    }
  }
}
