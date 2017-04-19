import rp from 'request-promise';
import logger from './../utils/logger';
import config from './../config/config';
import { STATUS_UP, STATUS_DOWN } from './../services/status';

const HOOK_BASE_URI = 'https://hooks.slack.com/services';
const slackParams = {
  [STATUS_UP]: {
    color: 'good',
    title: 'Service is Up',
    text: (name, downtime) => {
      return `${name} is up` + (downtime > 0 ? ` after ${downtime} of downtime.` : '.');
    }
  },

  [STATUS_DOWN]: {
    color: 'danger',
    title: 'Service is Down',
    text: (name) => `${name} went down.`
  }
};

/**
 * Check if slack notifications are enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  return config.notifications.slack && config.notifications.slack.enabled;
}

/**
 * Send slack notification.
 *
 * @param {Object} params
 * @returns {Promise}
 */
export async function notify(params) {
  if (!isEnabled()) {
    return Promise.resolve();
  }

  logger.debug('Notification Params:', params);
  let payload = preparePayload(params);

  try {
    let result = await sendNotification(payload);

    logger.info('Sent notification to slack.');
    logger.debug('Result:', result);
  } catch (err) {
    logger.error('Error sending notification to slack.', err);
  }
}

/**
 * Create and return the payload for the slack.
 *
 * @param {Object} params
 * @returns {Object}
 */
function preparePayload(params) {
  const { status, name } = params;

  let { text, color } = slackParams[status];

  return {
    text: text(name, params.downtime),
    attachments: [
      {
        color: color,
        fields: [
          {
            short: true,
            value: name,
            title: 'Service'
          }
        ]
      }
    ]
  };
}

/**
 * Hit the slack API endpoint to send notifications on slack.
 *
 * @param {Object} payload
 * @returns {Promise}
 */
function sendNotification(payload) {
  const url = HOOK_BASE_URI + config.notifications.slack.endpoint;

  logger.info('Sending notification to slack.');
  logger.debug('Slack Payload:', payload);

  return rp.post({
    url,
    json: true,
    body: payload
  });
}
