const string = {
  /**
   * Justify the string.
   *
   * @param {String} text
   * @param {Number} spaceLength
   * @returns {String}
   */
  center(text, spaceLength) {
    let emptySpace = ' ';

    text = text.trim();
    let textLength = text.length - 10; //  remove color font length

    if (textLength >= spaceLength) {
      return text;
    }
    let spaceContainer = '';
    let spaceRequired = (spaceLength - textLength) / 2;

    for (let i = 0; i < spaceRequired; i++) {
      spaceContainer = spaceContainer + emptySpace;
    }
    let result = spaceContainer + text + spaceContainer;

    if (result.length - 10 > spaceLength) {
      result = result.slice(0, -1);
    }
    
    return result;
  }
};

export default string;
