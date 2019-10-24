import crypto from 'crypto';

/**
 * Compares if calculatedSignature and slackSignature are equal without leaking timing information.
 *
 * @param {string} calculatedSignature
 * @param {string} slackSignature
 */
export function compare(calculatedSignature, slackSignature) {
  return crypto.timingSafeEqual(Buffer.from(calculatedSignature, 'utf-8'), Buffer.from(slackSignature, 'utf8'));
}
