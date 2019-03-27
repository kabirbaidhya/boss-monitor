import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const HistoryInnerRow = ({ data }) => {
  return (
    <div className="status-date"> {moment(new Date(data)).format("MMMM DD, YYYY, dddd")}</div>
  );
};

HistoryInnerRow.propTypes = {
  data: PropTypes.string
};

export default HistoryInnerRow;
