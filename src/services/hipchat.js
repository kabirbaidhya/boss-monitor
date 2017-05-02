import rp from 'request-promise';
import logger from '../utils/logger';
import messages from '../common/messages';
import * as config from '../config/config';

/**
 * Check if hipchat notifications are enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  let { hipchat } = config.get().notifications;

  return hipchat && hipchat.enabled;
}

/**
 * Send hipchat notification.
 *
 * @param {Object} params
 * @returns {Promise}
 */
export async function notify(params) {
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
 * Create and return the payload for hipchat.
 *
 * @param {Object} params
 * @returns {Object}
 */
function preparePayload(params) {
  let { status, name } = params;
  let { text, color } = messages[status];
  let { email } = config.get().notifications.hipchat;

  return {
    message: text(name, params.downtime),
    color: color,
    from: email,
    value: name
  };
}

/**
 * Get Hipchat REST API url.
 *
 * @returns {String}
 */
export function getUrl() {
  const { roomId, authToken, baseUrl } = config.get().notifications.hipchat;

  return baseUrl + `${roomId}/notification?auth_token=${authToken}`;
}

/**
 * Hit the hipchat API endpoint to send notifications.
 *
 * @param {Object} payload
 * @returns {Promise}
 */
function sendNotification(payload) {
  logger.info('Sending notification to hipchat.');
  logger.debug('Hipchat Payload:', payload);

  return rp.post({
    url: getUrl(),
    json: true,
    body: payload
  });
}
