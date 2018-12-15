import rp from 'request-promise';
import logger from '../utils/logger';
import messages from '../common/messages';
import * as config from '../config/config';

/**
 * Check if slack notifications are enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  const slackConfig = config.get().notifications.slack;

  return slackConfig && slackConfig.enabled;
}

/**
 * Send slack notification.
 *
 * @param {Object} params
 * @returns {Promise}
 */
export async function notify(params) {
  logger().debug('Notification Params:', params);
  const payload = preparePayload(params);

  try {
    const result = await sendNotification(payload);

    logger().info('Sent notification to slack.');
    logger().debug('Result:', result);
  } catch (err) {
    logger().error('Error sending notification to slack.', err);
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
  const { text } = messages[status];
  const { color } = config.get().notifications.slack;

  return {
    attachments: [
      {
        color: color[status],
        text: text(name, params.downtime)
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
  const { baseUrl, endpoint } = config.get().notifications.slack;

  logger().info('Sending notification to slack.');
  logger().debug('Slack Payload:', payload);

  return rp.post({
    url: `${baseUrl}${endpoint}`,
    body: payload,
    json: true
  });
}
