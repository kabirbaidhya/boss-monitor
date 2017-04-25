import logger from '../utils/logger';
import config from '../config/config';
import messages from '../common/messages';
import emailClient from '../utils/emailClient';
import { render } from '../utils/emailRenderer';

/**
 * Check if email notifications are enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  return config.notifications.email && config.notifications.email.enabled;
}

/**
 * Send email notification.
 *
 * @param {Object} params
 * @returns {Promise}
 */
export async function notify(params) {
  if (!isEnabled()) {
    return Promise.resolve();
  }

  let payload = null;

  try {
    logger.debug('Notification Params:', params);
    payload = preparePayLoad(params);
  } catch (err) {
    logger.error('Error while preparing payload for email.', err);

    return Promise.resolve();
  }

  try {
    let result = await sendNotification(payload);

    logger.info('Sent notification to email.');
    logger.debug('Result:', result);
  } catch (err) {
    logger.error('Error sending notification to email.', err);
  }
}

/**
 * Create and return payload required for email.
 *
 * @param {Object} params
 * @returns {Object}
 */
function preparePayLoad(params) {
  const { status, name, downtime } = params;
  const { receivers, sender } = config.notifications.email.message;

  const subject = `Status for ${name}`;

  let message = Object.assign({}, messages[status]);

  message.text = message.text(name, downtime);
  const emailBody = render('status', message);

  return {
    from: sender,
    to: receivers,
    html: emailBody,
    subject: subject
  };
}

/**
 * Send email notification
 *
 * @param {Object} payload
 * @returns {Promise}
 */
function sendNotification(payload) {
  return emailClient.sendMail(payload);
}
