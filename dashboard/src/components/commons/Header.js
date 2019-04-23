import React from 'react';
import PropTypes from 'prop-types';

import chillLogo from '../../../public/images/logo.png';

const Header = (props) => {
  const { logo } = props;

  return (
    <header className="Header">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between Header__row">
          <div className="Header__row__left-part d-flex align-items-center">
            <div className="Header__row__logo">
              <img src={chillLogo} alt="Chill" />
            </div>
          </div>
          <div className="Header__row__right-part d-flex align-items-center">
            <img style={{ height: logo.height }} src={logo.url} alt="Project Logo" />
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  logo: PropTypes.object
};

export default Header;
