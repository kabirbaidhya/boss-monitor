import twilio from 'twilio';
import logger from '../utils/logger';
import messages from '../common/messages';
import * as config from '../config/config';

/**
 * Initialize and return the twilio client.
 * 
 * @returns {Object}
 */
export function getClient() {
  let { authToken, accountSid } = config.get().notifications;
  let client = twilio(accountSid, authToken);

  return client;
}

/**
 * Check if twilio notifications are enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  let twilioConfig = config.get().notifications.twilio;

  return twilioConfig && twilioConfig.enabled;
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
  const { receiver, sender } = config.get().notifications.twilio;
  const message = messages[status].text(name, downtime);

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
  let client = getClient();

  return client.sendMessage(payload);
}
