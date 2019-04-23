import React from 'react';
import PropTypes from 'prop-types';

import ServiceRow from './ServiceRow';

/**
 * Get list of services and passes each incident information
 * to ServiceRow.
 *
 * @param {Array} services
 */
const ServiceList = ({ services }) => (
  <div className="components-section">
    <div className="components-header">
      <div className="col-one">&nbsp;</div>
      <div className="col col-two">HTTP</div>

      {/* TODO: This block is for the SSL information */}
      {/* <div className="col col-three">SSL</div> */}
    </div>
    <div className="components-list">
      {services.map(service => (
        <ServiceRow data={service} key={service.id} />
      ))}
    </div>
  </div>
);

ServiceList.propTypes = {
  services: PropTypes.array
};

export default ServiceList;
