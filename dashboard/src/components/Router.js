import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import config from '../config';
import * as routes from '../constants/routes';

import Header from './commons/Header';
import Footer from './commons/Footer';
import StatusPage from './dashboard/StatusPage';
import HistoryPage from './dashboard/history_log/HistoryPage';
import HistoryDesign from './dashboard/history_log/HistoryDesign';

const { logo, baseUrl } = config.app;

const Router = () => (
  <BrowserRouter basename={baseUrl}>
    <div>
      <Header logo={logo} style={{ height: logo.height }} />
      <Switch>
        <Route exact path={routes.HOME} component={StatusPage} />
      </Switch>
      <Switch>
        <Route exact path={routes.HOME} component={HistoryPage} />
      </Switch>
      <Switch>
        <Route exact path={routes.HISTORY} component={HistoryDesign} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default Router;
