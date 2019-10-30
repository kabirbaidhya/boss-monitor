import moment from 'moment';

/**
 * Converts unix timestamp datetime to
 * readable date format as per the type given.
 *
 * @param {Date} date
 * @param {String} type
 * @returns {Date}
 */
export function getFormattedDate(date, type) {
  if (type === 'date') {
    return moment(date).format('MMMM DD, YYYY, dddd');
  }

  if (type === 'time') {
    return moment(date).format('hh:mm A');
  }

  return moment(date).format('');
}
