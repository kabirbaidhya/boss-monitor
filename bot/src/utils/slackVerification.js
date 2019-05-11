import qs from 'qs';
import * as HttpStatus from 'http-status-codes';

import * as crypto from './crypto';
import * as checkTime from './checkTime';
import * as config from '../config/config';
import * as safeCompare from './safeCompare';

/**
 * Verify incoming slack request by comparing the slack signing secret.
 *
 * @param {object} req
 */
export function verify(req) {
  return new Promise((resolve, reject) => {
    const { signingSecret } = config.get().notifications.slack;

    if (!signingSecret) {
      reject(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const slackSignature = req.headers['x-slack-signature'];
    const requestBody = qs.stringify(req.body, { format: 'RFC1738' });
    const timeStamp = req.headers['x-slack-request-timestamp'];

    if (checkTime.calculateTimeDifference(timeStamp) > 300) {
      reject(HttpStatus.BAD_REQUEST);
    }

    const sigBaseString = `v0:${timeStamp}:${requestBody}`;
    const hmac = crypto.createHmac(signingSecret, sigBaseString);
    const calculatedSignature = `v0=${hmac}`;

    if (safeCompare.compare(calculatedSignature, slackSignature)) {
      resolve();
    }
    reject(HttpStatus.UNAUTHORIZED);
  });
}
