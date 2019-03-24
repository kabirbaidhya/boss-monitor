import qs from 'qs';
import crypto from 'crypto';
import * as HttpStatus from 'http-status-codes';

import * as config from '../config/config';

/**
 * Verify incoming slack request by comparing the slack signing secret.
 *
 * @param {object} req
 */
export function verify(req) {
  return new Promise((resolve, reject) => {
    const signingSecret = config.get().notifications.slack.signingSecret;

    if (!signingSecret) {
      reject(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const slackSignature = req.headers['x-slack-signature'];
    const requestBody = qs.stringify(req.body, { format: 'RFC1738' });
    const timeStamp = req.headers['x-slack-request-timestamp'];

    const time = Math.floor(new Date().getTime() / 1000);

    if (Math.abs(time - timeStamp > 300)) {
      reject(HttpStatus.BAD_REQUEST);
    }

    const sigBaseString = `v0:${timeStamp}:${requestBody}`;
    const hmac = crypto
      .createHmac('sha256', signingSecret)
      .update(sigBaseString, 'utf8')
      .digest('hex');
    const calculatedSignature = `v0=${hmac}`;

    if (signatureMatches(calculatedSignature, slackSignature)) {
      resolve();
    }
    reject(HttpStatus.UNAUTHORIZED);
  });
}

function signatureMatches(calculatedSignature, slackSignature) {
  return crypto.timingSafeEqual(
    Buffer.from(calculatedSignature, 'utf-8'),
    Buffer.from(slackSignature, 'utf8')
  );
}
