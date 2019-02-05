import React from 'react';
import PropTypes from 'prop-types';

import ServiceRow from './ServiceRow';

const ServiceList = ({ services }) => (
  <ul className="list-group">
    {
      services.map(service => <ServiceRow service={service} key={service.id} />)
    }
  </ul>
);

ServiceList.propTypes = {
  services: PropTypes.array
};

export default ServiceList;
