import rp from 'request-promise';

import messages from '../common/messages';
import * as config from '../config/config';
import * as statusLogService from './statusLog';

/**
 * Send response back to slack slash-command.
 *
 * @param {object} requestBody
 */
export async function notify(requestBody) {
  const fetchedStatus = await fetchStatus(requestBody);

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
async function fetchStatus(requestBody) {
  const fetchedStatus = await statusLogService.fetchLatestStatuses();

  const filteredStatus = filterStatus(requestBody, fetchedStatus);

  return filteredStatus;
}

/**
 * Filter required status based on the slack channel id.
 *
 * @param {object} requestBody
 * @param {array} fetchedStatus
 * @returns {array}
 */
function filterStatus(requestBody, fetchedStatus) {
  const requiredService = config
    .get()
    .notifications.slack.channels.filter(
      channel => channel.channel_id === requestBody.channel_id
    );

  const filteredStatus = [];

  requiredService.forEach(service => {
    fetchedStatus.forEach(status => {
      if (
        JSON.parse(status.service).name.toLowerCase() ===
        service.service_name.toLowerCase()
      ) {
        filteredStatus.push(status);
      }
    });
  });

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
