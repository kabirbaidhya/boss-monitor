import messages from '../common/messages';
import * as config from '../config/config';

/**
 * Prepare payload to be sent.
 *
 * @param {object} statusToBePrepared
 * @returns {object}
 */
export function preparePayload(statusToBePrepared) {
  const { status, service } = statusToBePrepared;
  const { text } = messages[JSON.parse(status).name];
  const { color } = config.get().notifications.slack;

  return {
    response_type: 'in_channel',
    attachments: [
      {
        color: color[JSON.parse(status).name.toLowerCase()],
        text: text(JSON.parse(service).name)
      }
    ]
  };
}