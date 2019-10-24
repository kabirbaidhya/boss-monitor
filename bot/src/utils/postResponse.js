import rp from 'request-promise';

/**
 * Post response back to slack channel.
 *
 * @param {string} responseUrl
 * @param {object} payload
 */
export function sendResponse(responseUrl, payload) {
    return rp.post({
      url: `${responseUrl}`,
      body: payload,
      json: true
    });
}
