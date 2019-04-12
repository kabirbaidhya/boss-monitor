import React from 'react';

import StatusPage from './StatusPage';
import HistoryPage from './history/HistoryPage';

/**
 * Main container for rendering services list
 * and history list
 */
const Home = () => (
  <div className="flexbox-container">
    <StatusPage />
    <HistoryPage />
  </div>
);

export default Home;
