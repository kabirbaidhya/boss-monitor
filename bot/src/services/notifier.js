import * as config from '../config/config';
import { sendResponse } from '../utils/postResponse';
import { preparePayload } from '../utils/preparePayload';

/**
 * Send auto-response to slack incase of service up/down.
 *
 * @param {object} params
 */
export function sendNotification(params) {
  const { baseUrl } = config.get().notifications && config.get().notifications.slack;
  const promises = config.get().notifications.slack && config.get().notifications.slack.channels && config.get().notifications.slack.channels.map(channel => {
    if (channel.service_name.toLowerCase() === params.name.toLowerCase()) {
      const payload = preparePayload(params);
      return sendResponse(`${baseUrl}${channel.slack_endpoint}`, payload);
    }
  });

  return Promise.all(promises);
}

