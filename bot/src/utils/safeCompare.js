import crypto from 'crypto';

export function compare(calculatedSignature, slackSignature) {
  return crypto.timingSafeEqual(Buffer.from(calculatedSignature, 'utf-8'), Buffer.from(slackSignature, 'utf8'));
}