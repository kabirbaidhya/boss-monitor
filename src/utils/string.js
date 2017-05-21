
/**
 * Justify (center) the text in the provided `width` by adding
 * padding on the left and right of the text using the `fillchar`.
 * This implementation is similar to python's str.center()
 * http://python-reference.readthedocs.io/en/latest/docs/str/center.html
 *
 * @param {String} text
 * @param {Number} width
 * @param {String} [fillchar=' ']
 * @returns {String}
 */
export function center(text, width, fillchar = ' ') {
  // If the text length is more than the max width given
  // return it as it is, as no justification can be done.
  if (text.length >= width) {
    return text;
  }

  // Calculate padding left and right.
  let orignalText = text.trim();
  let remainingSpace = width - orignalText.length;
  let paddingLeft = Math.floor(remainingSpace / 2);
  let paddingRight = remainingSpace - paddingLeft;

  // Add padding left & right using the fillchar character.
  let result = fillchar.repeat(paddingLeft) + orignalText + fillchar.repeat(paddingRight);

  return result;
}
