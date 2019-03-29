import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ appStyle, projectStyle, appLogo, projectLogo }) => (
  <header className="Header">
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between Header__row">
        <div className="Header__row__left-part d-flex align-items-center">
          <div className="Header__row__logo">
            <a href="">
              <img style={appStyle} src={appLogo.url} alt="Application Logo" />
            </a>
          </div>
        </div>
        <div className="Header__row__right-part d-flex align-items-center">
          <a href="">
          <img style={projectStyle} src={projectLogo.url} alt="Project Logo" />
          </a>
        </div>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  style: PropTypes.object,
  appLogo: PropTypes.object,
  projectLogo: PropTypes.object,
};

export default Header;
