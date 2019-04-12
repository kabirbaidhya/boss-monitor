import React from 'react';
import PropTypes from 'prop-types';

import { isUp, getServiceParams } from '../../services/status';

/**
 * Renders by getting all the services data.
 * @param {Object} data
 */
const ServiceRow = ({ data }) => {
  const { service, status } = data;

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

  const { message, serviceClassName } = getServiceParams(isUp(statusData));
  return (
    <div className={`component-container ${serviceClassName}`}>
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
