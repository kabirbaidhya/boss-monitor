import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import config from '../config';
import * as routes from '../constants/routes';

import Header from './commons/Header';
import Footer from './commons/Footer';
import StatusPage from './dashboard/StatusPage';

const { logoUrl, logoHeight, baseHref } = config.app;

const Router = () => (
  <BrowserRouter basename={baseHref}>
    <div>
      <Header logoUrl={logoUrl} style={{ height: logoHeight }} />
      <Switch>
        <Route exact path={routes.HOME} component={StatusPage} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default Router;
