import React from 'react';
import PropTypes from 'prop-types';

import formattedDate from '../../../utils/getFormattedDate';

const EventRow = ({ data }) => {
  return (
    <div className="status-date"> {formattedDate(data, "date")}</div>
  );
};

EventRow.propTypes = {
  data: PropTypes.string
};

export default EventRow;
