import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import config from '../config';
import * as routes from '../constants/routes';

import Header from './commons/Header';
import Footer from './commons/Footer';
import Home from './dashboard/Home';

const { appLogo, projectLogo, baseUrl } = config.app;

const Router = () => (
  <BrowserRouter basename={baseUrl}>
    <div>
      <Header
        appLogo={appLogo}
        projectLogo={projectLogo}
        appStyle={{ height: appLogo.height }}
        projectStyle={{ height: projectLogo.height }}
      />
      <Switch>
        <Route exact path={routes.HOME} component={Home} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default Router;
