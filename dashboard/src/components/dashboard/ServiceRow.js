import React from 'react';
import PropTypes from 'prop-types';

import { isUp, getServiceParams } from '../../services/status';

const ServiceRow = ({ data }) => {
  const { service, status } = data;

  const serviceData = JSON.parse(service);
  const statusData = JSON.parse(status);

  const { message, className } = getServiceParams(isUp(statusData));
  return (
    <div className={`component-container ${className}`}>
      <div className="component-inner-container">
        <div className="component-title">{serviceData.name}</div>
        <div className="component-status">{message}</div>
      </div>
    </div>
  );
};

ServiceRow.propTypes = {
  data: PropTypes.object
};

export default ServiceRow;
