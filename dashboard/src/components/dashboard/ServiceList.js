import React from 'react';
import PropTypes from 'prop-types';

import ServiceRow from './ServiceRow';

/**
 * Get list of services and passes each event information
 * to ServiceRow
 * @param {Array} services
 */
const ServiceList = ({ services }) => (
  <div className="components-section">
    {
      services.map(service => <ServiceRow data={service} key={service.id} />)
    }
  </div>
);

ServiceList.propTypes = {
  services: PropTypes.array
};

export default ServiceList;
