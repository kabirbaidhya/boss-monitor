import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import * as statuses from '../../../constants/statuses';

const historyStatusParam = {
  up: statuses.HISTORY_STATUS_UP_CLASS,
  pending: statuses.HISTORY_STATUS_PENDING_CLASS,
  down: statuses.HISTORY_STATUS_DOWN_CLASS
};

const HistoryRow = ({ data }) => {
  const { id, createdAt, service, status } = data;

  const serviceData = JSON.parse(service);
  const statusData = JSON.parse(status);

  const className = historyStatusParam[statusData.name.toLowerCase()];

  return (
    <ul className="status-update-list">
      <li className={`status-update ${className}`}>
        {serviceData.name} - <span className="state">{statusData.name} state</span> on
        <span className="time"> {moment(createdAt).format('hh:mm A')}</span>
      </li>
    </ul>
  );
};

HistoryRow.propTypes = {
  data: PropTypes.object
};

export default HistoryRow;
