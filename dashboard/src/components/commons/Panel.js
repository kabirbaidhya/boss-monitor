import React from 'react';
import PropTypes from 'prop-types';

import { STATUS_UP } from '../../constants/statuses';

const Panel = ({ title, children, className = STATUS_UP }) => (
  <div className="panel panel-default">
    <div className={`panel-heading ${className}`}>
      <h3 className="panel-title">{title}</h3>
    </div>
    {children}
  </div>
);

Panel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string
};

export default Panel;
