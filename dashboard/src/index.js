import './public';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import config from './config';
import Router from './components/Router';

const mountNode = document.getElementById('app');

document.title = config.app.title;

const renderApp = () => {
  render(
    <AppContainer>
      <Router />
    </AppContainer>,
    mountNode
  );
};

renderApp();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Router', () => renderApp());
}
