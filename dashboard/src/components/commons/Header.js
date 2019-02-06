import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ style, logoUrl }) => (
  <nav className="navbar navbar-default navbar-fixed-top navbar-custom">
    <div className="container-fluid">
      <div className="navbar-logo-container">
        <img style={style} src={logoUrl} alt="Application Logo" />
      </div>
    </div>
  </nav>
);

Header.propTypes = {
  style: PropTypes.object,
  logoUrl: PropTypes.string
};

export default Header;
