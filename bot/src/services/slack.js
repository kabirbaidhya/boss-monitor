import rp from 'request-promise';

import * as config from '../config/config';
import { sendResponse } from '../utils/postResponse';
import { preparePayload } from '../utils/preparePayload';

/**
 * Send response back to slack slash-command.
 *
 * @param {object} requestBody
 */
export async function notify(requestBody) {
  let promises = [];
  const channelInfo = config.get().notifications.slack.channels.filter(channel => channel.channel_id === requestBody.channel_id);

  if (!channelInfo.length) {
    const payload = preparePayload({
      status: `{"name": "not_registered"}`,
      service: `{"name": "Current channel is not registered"}`
    });

    promises.push(sendResponse(requestBody.response_url, payload));
  }
  else {
    channelInfo.forEach(async channel => {

      if (channel) {
        const fetchedStatus = await fetchStatus(channel);
        promises = fetchedStatus.map(status => {
          const payload = preparePayload(status);

          return sendResponse(requestBody.response_url, payload);
        });
      }
    });
  }

  return Promise.all(promises); I
}

/**
 * Fetch all latest statuses.
 *
 * @param {object} channel
 * @returns {array}
 */
async function fetchStatus(channel) {
  const fetchedStatus = await rp.get({
    url: `${channel.api_endpoint} `
  });
  const filteredStatus = filterStatus(JSON.parse(fetchedStatus), channel);

  return filteredStatus;
}

/**
 * Filter required status based on the slack channel id.
 *
 * @param {object} channel
 * @param {array} fetchedStatus
 * @returns {array}
 */
function filterStatus(fetchedStatus, channel) {
  const filteredStatus = fetchedStatus.filter(
    status => channel.service_name.toLowerCase() === JSON.parse(status.service).name.toLowerCase()
  );

  return filteredStatus;
}
