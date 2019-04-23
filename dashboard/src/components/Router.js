import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import config from '../config';
import * as routes from '../constants/routes';

import Home from './dashboard/Home';
import Header from './commons/Header';
import Footer from './commons/Footer';

const { logo, baseUrl } = config.app;

const Router = () => (
  <BrowserRouter basename={baseUrl}>
    <div>
      <Header logo={logo} />
      <Switch>
        <Route exact path={routes.HOME} component={Home} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default Router;
