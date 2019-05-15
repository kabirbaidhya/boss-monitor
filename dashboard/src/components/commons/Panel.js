import React from 'react';
import PropTypes from 'prop-types';

const Panel = props => {
  const { title, panelClassName } = props;

  return (
    <div className={`page-status ${panelClassName}`}>
      <span className="status font-large">
        <span className={panelClassName}>{title}</span>
      </span>
      <span className="last-updated-stamp font-small" />
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  panelClassName: PropTypes.string
};

export default Panel;
