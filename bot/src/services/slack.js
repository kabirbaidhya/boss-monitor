import axios from 'axios';
import rp from 'request-promise';

import messages from '../common/messages';
import * as config from '../config/config';

/**
 * Send response back to slack slash-command.
 *
 * @param {object} requestBody
 */
export async function notify(requestBody) {
  const channelInfo = config.get().channels.filter(channel => channel.channel_id === requestBody.channel_id);
  const fetchedStatus = await fetchStatus(channelInfo);

  fetchedStatus.forEach(async status => {
    const payload = await preparePayload(status);

    sendResponse(requestBody.response_url, payload);
  });
}

/**
 * Fetch all latest statuses.
 *
 * @param {object} requestBody
 * @returns {array}
 */
async function fetchStatus(channelInfo) {
  const fetchedStatus = await axios.get(channelInfo[0].api_endpoint);

  const filteredStatus = filterStatus(fetchedStatus, channelInfo);

  return filteredStatus;
}

/**
 * Filter required status based on the slack channel id.
 *
 * @param {object} requestBody
 * @param {array} fetchedStatus
 * @returns {array}
 */
function filterStatus(fetchedStatus, channelInfo) {
  const filteredStatus = fetchedStatus.data.filter(
    status => channelInfo[0].service_name.toLowerCase() === JSON.parse(status.service).name.toLowerCase()
  );

  return filteredStatus;
}

/**
 * Prepare payload to be sent.
 *
 * @param {object} statusToBePrepared
 * @returns {object}
 */
async function preparePayload(statusToBePrepared) {
  const { status, service } = statusToBePrepared;
  const { text } = messages[JSON.parse(status).name];

  return {
    response_type: 'in_channel',
    attachments: [
      {
        text: text(JSON.parse(service).name)
      }
    ]
  };
}

/**
 * Post response back to slack channel.
 *
 * @param {string} responseUrl
 * @param {object} payload
 */
function sendResponse(responseUrl, payload) {
  rp.post({
    url: `${responseUrl}`,
    body: payload,
    json: true
  });
}
