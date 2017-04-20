import logger from '../utils/logger';
import config from '../config/config';
import twilioClient from '../utils/twilioClient';
import { STATUS_UP, STATUS_DOWN } from './../services/status';

const twilioParams = {
  [STATUS_UP]: {
    text: (name, downtime) => {
      return `${name} is up` + (downtime > 0 ? ` after ${downtime} of downtime.` : '.');
    }
  },

  [STATUS_DOWN]: {
    text: (name) => `${name} went down.`
  }
};

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
  if (!isEnabled()) {
    return Promise.resolve();
  }

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

function preparePayLoad(params) {
  const { status, name, downTime } = params;
  const { receiver, sender } = config.notifications.twilio;

  let message = twilioParams[status].text(name, downTime);

  return {
    to: receiver,
    from: sender,
    body: message
  }
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


