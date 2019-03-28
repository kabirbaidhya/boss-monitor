import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const EventRow = ({ data }) => {
  return (
    <div className="status-date"> {moment(new Date(data)).format("MMMM DD, YYYY, dddd")}</div>
  );
};

EventRow.propTypes = {
  data: PropTypes.string
};

export default EventRow;
