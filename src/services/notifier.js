import * as slack from './slack';

/**
 * List of notifier services.
 */
const notifiers = {
  'slack': slack
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
      service.notify(params);
    }
  }
}
