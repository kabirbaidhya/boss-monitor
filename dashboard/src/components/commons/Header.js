import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ appLogo, projectLogo }) => (
  <header className="header">
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-between header__row">
        <div className="header__row__left-part d-flex align-items-center">
          <div className="header__row__logo">
            <div>
              <img style={{height: appLogo.height}} src={appLogo.url} alt="Application Logo" />
            </div>
          </div>
        </div>
        <div className="header__row__right-part d-flex align-items-center">
          <div>
            <img style={{height: projectLogo.height}} src={projectLogo.url} alt="Project Logo" />
          </div>
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
