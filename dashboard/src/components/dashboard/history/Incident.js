import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ToolTip from 'react-tooltip';

import { getFormattedDate } from '../../../utils/date';
import * as statusService from '../../../services/status';

/**
 * Renders by getting all the information of incidents
 * from HistoryList according to the date.
 *
 * @param {Object} data
 */
const Incident = ({ data }) => {
  const service = JSON.parse(data.service);
  const status = JSON.parse(data.status);

  const time = new Date(data.createdAt);
  const timestamp = time.toString();
  const formattedTime = getFormattedDate(time, 'time');
  const tooltipId = `tooltip-incident-${timestamp}`;
  const serviceStatus = statusService.getServiceStatus(status);

  const incidentStatusClass = classNames({
    'status-update': true,
    'status-down': serviceStatus.down,
    'status-success': serviceStatus.up,
    'status-pending': serviceStatus.pending,
    'status-under-maintenance': serviceStatus['under maintenance']
  });

  return (
    <ul className="status-update-list">
      <li className={incidentStatusClass}>
        {service.name} was <span className="state">{status.name.toLowerCase()}</span> on
        <ToolTip place="top" id={tooltipId} type="dark">
          <span>{timestamp}</span>
        </ToolTip>
        <span className="time" data-tip aria-hidden="true" data-for={tooltipId}> {formattedTime}</span>
      </li>
    </ul>
  );
};

Incident.propTypes = {
  data: PropTypes.object
};

export default Incident;
