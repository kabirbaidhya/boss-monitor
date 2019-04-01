import React from 'react';
import PropTypes from 'prop-types';

import * as statuses from '../../../constants/statuses';
import formattedDate from '../../../utils/getFormattedDate';

const eventStatusParam = {
  up: statuses.HISTORY_STATUS_UP_CLASS,
  pending: statuses.HISTORY_STATUS_PENDING_CLASS,
  down: statuses.HISTORY_STATUS_DOWN_CLASS
};

const Event = ({ data }) => {
  const { id, createdAt, service, status } = data;

  const serviceData = JSON.parse(service);
  const statusData = JSON.parse(status);

  const eventStatus = eventStatusParam[statusData.name.toLowerCase()];

  return (
    <ul className="status-update-list">
      <li className={`status-update ${eventStatus}`}>
        {serviceData.name} - <span className="state">{statusData.name} state</span> on
        <span className="time"> {formattedDate(createdAt, "time")}</span>
      </li>
    </ul>
  );
};

Event.propTypes = {
  data: PropTypes.object
};

export default Event;
