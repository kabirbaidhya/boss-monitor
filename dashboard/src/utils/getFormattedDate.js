import moment from 'moment';

const getFormattedDate = (date, type) => {
  if (type === "date"){
    return moment(new Date(date)).format("MMMM DD, YYYY, dddd")
  } else if (type === "time"){
    return moment(date).format('hh:mm A')
  }
}

export default getFormattedDate;

