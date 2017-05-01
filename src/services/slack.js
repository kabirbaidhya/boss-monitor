import rp from 'request-promise';
import logger from '../utils/logger';
import messages from '../common/messages';
import * as config from '../config/config';

const HOOK_BASE_URI = 'https://hooks.slack.com/services';

/**
 * Check if slack notifications are enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  let slackConfig = config.get().notifications.slack;

  return slackConfig && slackConfig.enabled;
}

/**
 * Send slack notification.
 *
 * @param {Object} params
 * @returns {Promise}
 */
export async function notify(params) {
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
 * Create and return the payload for slack.
 *
 * @param {Object} params
 * @returns {Object}
 */
function preparePayload(params) {
  const { status, name } = params;
  const { text, color } = messages[status];

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
 * Hit the slack API endpoint to send notifications.
 *
 * @param {Object} payload
 * @returns {Promise}
 */
function sendNotification(payload) {
  const { endpoint } = config.get().notifications.slack;
  const url = HOOK_BASE_URI + endpoint;

  logger.info('Sending notification to slack.');
  logger.debug('Slack Payload:', payload);

  return rp.post({
    url,
    json: true,
    body: payload
  });
}
