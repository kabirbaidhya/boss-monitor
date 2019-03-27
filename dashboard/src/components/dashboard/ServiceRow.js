import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ToolTip from 'react-tooltip';

import { isUp, getServiceParams } from '../../services/status';

const ServiceRow = ({ data }) => {
  const { id, createdAt, service, status } = data;

  const serviceData = JSON.parse(service);
  const statusData = JSON.parse(status);

  const { message, className } = getServiceParams(isUp(statusData));

  const tooltipId = `tooltip-${id}`;

  return (
    <li className="list-group-item">
      <span>{serviceData.name}</span>
      <span className={`list-item-right ${className}`}>{message}</span>
      <i
        data-tip
        aria-hidden="true"
        data-for={tooltipId}
        className={`list-item-tooltip material-icons ${className}`}>
        info
      </i>
      <ToolTip className="tooltip" place="left" id={tooltipId} type="dark">
        <span>Since {moment(createdAt).fromNow()}</span>
      </ToolTip>
    </li>
  );
};

ServiceRow.propTypes = {
  data: PropTypes.object
};

export default ServiceRow;
