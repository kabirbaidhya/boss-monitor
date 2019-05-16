import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ToolTip from 'react-tooltip';

import { checkStatus, getServiceParams } from '../../services/status';

/**
 * Render each service row.
 *
 * @param {Object} data
 */
const ServiceRow = ({ data }) => {
  const service = JSON.parse(data.service);
  const status = JSON.parse(data.status);

  const tooltipId = `tooltip-service-${service.id}`;
  // console.log('Service Row:', status);
  const { message, icon } = getServiceParams(checkStatus(status));

  return (
    <div className="components-item">
      <div className="col-one component-name">{service.name}</div>

      <ToolTip className="tooltip" place="top" id={tooltipId} type="dark">
        <span>
          {message} since {moment(service.createdAt).fromNow()}
        </span>
      </ToolTip>
      <div className="col col-two">
        <img src={icon} data-tip aria-hidden="true" data-for={tooltipId} />
      </div>
    </div>
  );
};

ServiceRow.propTypes = {
  data: PropTypes.object
};

export default ServiceRow;
