import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ToolTip from 'react-tooltip';

import { isUp, getServiceParams } from '../../services/status';

const ServiceRow = ({ service }) => {
  let { id, name, createdAt } = service;
  let { message, className, icon } = getServiceParams(isUp(service));

  let tooltipId = `tooltip-${id}`;

  return (
    <li className="list-group-item">
      <span>{name}</span>
      <span className={`list-item-right ${className}`}>{message}</span>
      <a
        data-tip
        aria-hidden="true"
        data-for={tooltipId}
        className={`list-item-tooltip ${icon} ${className}`}
      />

      <ToolTip className="tooltip" place="left" id={tooltipId} type="dark">
        <span>Since {moment(createdAt).fromNow()}</span>
      </ToolTip>
    </li>
  );
};

ServiceRow.propTypes = {
  service: PropTypes.object
};

export default ServiceRow;
