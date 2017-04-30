import logger from '../utils/logger';
import config from '../config/config';
import messages from '../common/messages';
import twilioClient from '../utils/twilioClient';

/**
 * Check if twilio notifications are enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  return config.notifications.twilio && config.notifications.twilio.enabled;
}

/**
 * Send twilio notification.
 *
 * @param {Object} params
 * @returns {Promise}
 */
export async function notify(params) {
  logger.debug('Notification Params:', params);
  let payLoad = preparePayLoad(params);

  try {
    let response = await sendNotification(payLoad);

    logger.info('Sent notification to', response.to);
    logger.debug('Result:', response);
  } catch (err) {
    logger.error('Error sending notification from twilio.', err);
  }
}

/**
 * Create and return payload required for twilio client.
 *
 * @param {Object} params
 * @returns {Object}
 */
function preparePayLoad(params) {
  const { status, name, downtime } = params;
  const { receiver, sender } = config.notifications.twilio;

  let message = messages[status].text(name, downtime);

  return {
    to: receiver,
    from: sender,
    body: message
  };
}

/**
 * Hit the twilio API to send notifications.
 *
 * @param {Object} payload
 * @returns {Promise}
 */
function sendNotification(payload) {
  return twilioClient.sendMessage(payload);
}
