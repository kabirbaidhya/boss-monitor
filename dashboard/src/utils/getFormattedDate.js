import moment from 'moment';

export function getFormattedDate(date, type) {
  if (type === 'date') {
    return moment(date).format('MMMM DD, YYYY, dddd');
  }

  if (type === 'time') {
    return moment(date).format('hh:mm A');
  }

  return moment(date).format();
}
