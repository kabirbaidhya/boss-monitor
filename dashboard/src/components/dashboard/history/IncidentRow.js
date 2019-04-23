import React from 'react';
import PropTypes from 'prop-types';

import { getFormattedDate } from '../../../utils/date';

/**
 * List each unique date of incident as a header.
 */
const IncidentRow = ({ data }) => {
  const date = new Date(data);
  const formattedDate = getFormattedDate(date, 'date');

  return <div className="status-date">{formattedDate}</div>;
};

IncidentRow.propTypes = {
  data: PropTypes.string
};

export default IncidentRow;
