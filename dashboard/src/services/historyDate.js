/**
 * Returns object with key of unique date and value with array of objects.
 *
 * @param {Array} histories
 * @returns {Object}
 */
export function uniqueDate(histories) {
  const allDate = histories
    .map((date) => date)
    .reduce((acc, curr) => {
      const date = new Date(curr.createdAt).toDateString();

      if (acc[date]) {
        return {
          ...acc,
          [date]: acc[date].concat(curr)
        }
      }

      return {
        ...acc,
        [date]: [curr]
      }
    }, {});

    return allDate;
}
