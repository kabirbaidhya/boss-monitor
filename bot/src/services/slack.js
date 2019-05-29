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
  const channelInfo = config.get().notifications.slack.channels.filter(channel => channel.channel_id === requestBody.channel_id);
  const fetchedStatus = await fetchStatus(channelInfo);
  const promises = fetchedStatus.map(status => {
    const payload = preparePayload(status);

    return sendResponse(requestBody.response_url, payload);
  });

  return Promise.all(promises);
}

/**
 * Fetch all latest statuses.
 *
 * @param {object} channelInfo
 * @returns {array}
 */
async function fetchStatus(channelInfo) {
  const fetchedStatus = await rp.get({
    url: `${channelInfo[0].api_endpoint}`
  });
  const filteredStatus = filterStatus(JSON.parse(fetchedStatus), channelInfo);

  return filteredStatus;
}

/**
 * Filter required status based on the slack channel id.
 *
 * @param {object} channelInfo
 * @param {array} fetchedStatus
 * @returns {array}
 */
function filterStatus(fetchedStatus, channelInfo) {
  const filteredStatus = fetchedStatus.filter(
    status => channelInfo[0].service_name.toLowerCase() === JSON.parse(status.service).name.toLowerCase()
  );

  return filteredStatus;
}
