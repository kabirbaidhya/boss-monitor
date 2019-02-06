import React from 'react';

const Footer = () => {
  return (
    <div className="wrapper page-footer">
      <div className="pull-right">
        <span className="footer-text">
          Powered By
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/leapfrogtechnology/chill"
          >
            {' Chill'}
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
