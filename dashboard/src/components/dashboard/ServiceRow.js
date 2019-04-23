import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ToolTip from 'react-tooltip';

import { isUp, getServiceParams } from '../../services/status';

/**
 * Renders by getting all the services data.
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

      <ToolTip className="tooltip" place="top" id={tooltipId} type="dark">
        <span>{message} since {moment(service.createdAt).fromNow()}</span>
      </ToolTip>
      <div className="col col-two">
        <img src={icon} data-tip aria-hidden="true" data-for={tooltipId} />
      </div>

      {/* TODO: This block is for the SSL information */}
      {/* <div className="col col-three">
        <img src={icon} title={message}/>
      </div> */}
    </div>
  );
};

ServiceRow.propTypes = {
  data: PropTypes.object
};

export default ServiceRow;
