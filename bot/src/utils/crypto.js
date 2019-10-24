import crypto from 'crypto';

/**
 * Creates cryptographic HMAC digests.
 *
 * @param {string} signingSecret
 * @param {string} sigBaseString
 */
export function createHmac(signingSecret, sigBaseString) {
  return crypto
    .createHmac('sha256', signingSecret)
    .update(sigBaseString, 'utf8')
    .digest('hex');
}
