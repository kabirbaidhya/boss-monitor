import rp from 'request-promise';
import logger from '../utils/logger';
import config from '../config/config';
import messages from '../common/messages';

const HOOK_BASE_URI = 'https://api.hipchat.com/v2/room/';

/**
 * Check if hipchat notifications are enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  return config.notifications.hipchat && config.notifications.hipchat.enabled;
}

/**
 * Send hipchat notification.
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

    logger.info('Sent notification to hipchat.');
    logger.debug('Result:', result);
  } catch (err) {
    logger.error('Error sending notification to hipchat.', err);
  }
}

/**
 * Create and return the payload for the hipchat.
 *
 * @param {Object} params
 * @returns {Object}
 */
function preparePayload(params) {
  const { status, name } = params;

  let { text, color } = messages[status];

  return {
    message: text(name, params.downtime),
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
 * Hit the hipchat API endpoint to send notifications on hipchat.
 *
 * @param {Object} payload
 * @returns {Promise}
 */
function sendNotification(payload) {
  const url = HOOK_BASE_URI + config.notifications.hipchat.roomId + '/notification?auth_token=' + config.notifications.hipchat.authToken;

  logger.info('Sending notification to hipchat.');
  logger.debug('Hipchat Payload:', payload);

  return rp.post({
    url,
    json: true,
    body: payload
  });
}
