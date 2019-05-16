import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ToolTip from 'react-tooltip';

import { isUp, getServiceParams } from '../../services/status';

/**
 * Render each service row.
 *
 * @param {Object} data
 */
const ServiceRow = ({ data }) => {
  const service = JSON.parse(data.service);
  const status = JSON.parse(data.status);

  const tooltipId = `tooltip-service-${service.id}`;

  const { message, icon } = getServiceParams(isUp(status));

  return (
    <div className="components-item">
      <div className="col-one component-name">{service.name}</div>

      <div className="col col-two list-item-tooltip">
        <img src={icon} data-tip aria-hidden="true" data-for={tooltipId} />
      </div>
      <ToolTip place="top" id={tooltipId} type="dark">
        <span>{message} since {moment(status.createdAt).fromNow()}</span>
      </ToolTip>
    </div>
  );
};

ServiceRow.propTypes = {
  data: PropTypes.object
};

export default ServiceRow;
