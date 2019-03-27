import React from 'react';
import PropTypes from 'prop-types';

import { STATUS_UP } from '../../constants/statuses';

const Panel = ({ title, children, className = STATUS_UP }) => (
  <>
    <div className="page-header">
      <h2>Current Status -
        <span className={`${className}`}>{title}</span>
      </h2>
    </div>
    {children}
  </>
);

Panel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string
};

export default Panel;
