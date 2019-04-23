import React from 'react';
import PropTypes from 'prop-types';

import { STATUS_UP } from '../../constants/statuses';

const Panel = (props) => {
  const { title, panelClassName = STATUS_UP } = props;

  return (
    <>
      <div className={`page-status ${panelClassName}`}>
        <span className="status font-large">
          <span className={panelClassName}>{title}</span>
        </span>
        <span className="last-updated-stamp font-small" />
      </div>
    </>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string
};

export default Panel;
