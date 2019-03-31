import React from 'react';
import PropTypes from 'prop-types';

import FormattedDate from '../../../utils/formattedDate';

const EventRow = ({ data }) => {
  return (
    <div className="status-date"> {FormattedDate(data, "date")}</div>
  );
};

EventRow.propTypes = {
  data: PropTypes.string
};

export default EventRow;
