import React from 'react';
import PropTypes from 'prop-types';

import * as statuses from '../../../constants/statuses';
import {getFormattedDate} from '../../../utils/getFormattedDate';

/**
 * Renders by getting all the information of events from HistoryList according to the date.
 */
const eventStatusParam = {
  up: statuses.HISTORY_STATUS_UP_CLASS,
  pending: statuses.HISTORY_STATUS_PENDING_CLASS,
  down: statuses.HISTORY_STATUS_DOWN_CLASS
};

const Event = ({ data }) => {
  const { id, createdAt, service, status } = data;

  try {
    const serviceData = JSON.parse(service);
  } catch (err) {
    console.log(err.name);
  }

  try {
    const statusData = JSON.parse(status);
  } catch (error) {
    console.log(error.name);
  }

  const time = new Date(createdAt);
  const formattedTime = getFormattedDate(time, 'time');

  const eventStatus = eventStatusParam[statusData.name.toLowerCase()];

  return (
    <ul className="status-update-list">
      <li className={`status-update ${eventStatus}`}>
        {serviceData.name} - <span className="state">{statusData.name} state</span> on
        <span className="time"> {formattedTime}</span>
      </li>
    </ul>
  );
};

Event.propTypes = {
  data: PropTypes.object
};

export default Event;
