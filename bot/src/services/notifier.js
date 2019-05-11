import * as config from '../config/config';
import { preparePayload } from '../utils/preparePayload';
import { sendResponse } from '../utils/postResponse';

export function sendNotification(params) {
  const baseUrl = config.get().notifications.slack.baseUrl;
  const channelInfo = config.get().notifications.slack.channels.filter(channel => channel.service_name.toLowerCase() === params.name.toLowerCase());

  const promises = [];

  channelInfo.forEach(element => {
    const payload = preparePayload(params);
    promises.push(sendResponse(`${baseUrl}` + element.slack_endpoint, payload));
  });

  return Promise.all(promises);
}

