/**
 * Encodes a given text to base64.
 *
 * @param {String} text
 * @returns {String}
 */
export function encode(text) {
  const buf = Buffer.from(text, 'ascii');

  return buf.toString('base64');
}
