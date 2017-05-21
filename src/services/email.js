import nodemailer from 'nodemailer';
import logger from '../utils/logger';
import messages from '../common/messages';
import * as config from '../config/config';
import * as emailRenderer from '../utils/emailRenderer';

/**
 * Get the nodemailer email client using the configured transport.
 *
 * @returns {Object} The nodemailer Transporter object.
 */
export function getClient(transport) {
  let client = nodemailer.createTransport(transport);

  return client;
}

/**
 * Check if email notifications are enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  let { email } = config.get().notifications;

  return email && email.enabled;
}

/**
 * Send email notification.
 *
 * @param {Object} params
 * @returns {Promise}
 */
export async function notify(params) {
  let payload = null;

  try {
    logger().debug('Notification Params:', params);
    payload = preparePayLoad(params);
  } catch (err) {
    logger().error('Error while preparing payload for email.', err);

    return Promise.resolve();
  }

  try {
    let result = await sendNotification(payload);

    logger().info('Sent notification to email.');
    logger().debug('Result:', result);

    return result;
  } catch (err) {
    logger().error('Error sending notification to email.', err);
  }
}

/**
 * Create and return payload required for email.
 *
 * @param {Object} params
 * @returns {Object}
 */
function preparePayLoad(params) {
  let { status, name, downtime } = params;
  let { sender, receivers } = config.get().notifications.email;
  let subject = `Status for ${name}`;
  let message = Object.assign({}, messages[status], {
    text: messages[status].text(name, downtime)
  });
  let html = emailRenderer.render('status', message);

  return {
    from: sender,
    to: receivers,
    html,
    subject
  };
}

/**
 * Use nodemailer to send email notifications.
 *
 * @param {Object} payload
 * @returns {Promise}
 */
function sendNotification(payload) {
  let { transport } = config.get().notifications.email;
  let client = getClient(transport);

  return client.sendMail(payload);
}
