import React from 'react';
import PropTypes from 'prop-types';

import { getFormattedDate } from '../../../utils/getFormattedDate';

/**
 * Gets each events unique data from HistoryList and
 * list each unique date as a header.
 */
const EventRow = ({ data }) => {
  const date = new Date(data);
  const formattedDate = getFormattedDate(date, 'date');

  return <div className="status-date">{formattedDate}</div>;
};

EventRow.propTypes = {
  data: PropTypes.string
};

export default EventRow;
