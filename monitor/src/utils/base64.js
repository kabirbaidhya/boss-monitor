/**
 * Encodes a given text to base64.
 *
 * @param {String} text
 * @returns {String}
 */
export function encode(text) {
  return Buffer.from(text, 'ascii').toString('base64');
}

/**
 * Decodes a given string to ascii string.
 * 
 * @param {String} text
 * @returns {String} 
 */
export function decode(text) {
  return Buffer.from(text, 'base64').toString('ascii');
}
