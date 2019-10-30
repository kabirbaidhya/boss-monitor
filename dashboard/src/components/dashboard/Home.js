import React from 'react';

import HistoryPage from './history/HistoryPage';
import StatusPanel from './StatusPanel';

/**
 * Main container for rendering services list
 * and history list.
 */
const Home = () => (
  <div className="container">
    <StatusPanel />
    <HistoryPage />
  </div>
);

export default Home;
