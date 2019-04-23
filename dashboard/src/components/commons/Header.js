import React from 'react';
import PropTypes from 'prop-types';

import chillLogo from '../../../public/images/logo.png';

/**
 * Renders header section with project logo
 *
 * @param {Object} props
 */
const Header = (props) => {
  const { logo } = props;

  return (
    <header className="header">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between header__row">
          <div className="header__row__left-part d-flex align-items-center">
            <div className="header__row__logo">
              <img src={chillLogo} alt="Chill" />
            </div>
          </div>
          <div className="header__row__right-part d-flex align-items-center">
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
