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
  const { text } = messages[JSON.parse(status).name];
  const { color } = config.get().notifications.slack;

  return {
    channel: config.get().notifications.slack.channel_id,
    attachments: [
      {
        color: color[JSON.parse(status).name.toLowerCase()],
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
  const { baseUrl } = config.get().notifications.slack;

  logger().info('Sending notification to slack.');
  logger().debug('Slack Payload:', payload);

  rp.post({
    url: `${baseUrl}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.get().notifications.slack.token}`
    },
    body: payload,
    json: true
  });
}
