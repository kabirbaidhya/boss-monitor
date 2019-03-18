import qs from 'qs';
import crypto from 'crypto';
import * as HttpStatus from 'http-status-codes';

import * as config from '../config/config';

/**
 * Verify slack request.
 *
 * @param {object} request
 */
export function verify(request) {
  return new Promise((resolve, reject) => {
    const signingSecret = config.get().notifications.slack.signingSecret;

    if (!signingSecret) {
      reject('Signing secret is empty');

      return;
    }

    const slackSignature = request.headers['x-slack-signature'];
    const requestBody = qs.stringify(request.body, { format: 'RFC1738' });
    const timeStamp = request.headers['x-slack-request-timestamp'];

    const time = Math.floor(new Date().getTime() / 1000);

    if (Math.abs(time - timeStamp > 300)) {
      reject(HttpStatus.BAD_REQUEST);

      return;
    }

    const sigBaseString = 'v0:' + timeStamp + ':' + requestBody;
    const calculatedSignature =
      'v0=' +
      crypto
        .createHmac('sha256', signingSecret)
        .update(sigBaseString, 'utf8')
        .digest('hex');

    if (
      crypto.timingSafeEqual(
        Buffer.from(calculatedSignature, 'utf-8'),
        Buffer.from(slackSignature, 'utf8')
      )
    ) {
      resolve();

      return;
    } else {
      reject(HttpStatus.UNAUTHORIZED);

      return;
    }
  });
}
