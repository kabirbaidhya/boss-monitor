import crypto from 'crypto';

export function createHmac(signingSecret, sigBaseString) {
  return crypto
    .createHmac('sha256', signingSecret)
    .update(sigBaseString, 'utf8')
    .digest('hex');
}