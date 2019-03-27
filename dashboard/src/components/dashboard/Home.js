import React from 'react';

import StatusPage from './StatusPage';
import HistoryPage from './history/HistoryPage';

const Home = () => (
  <div className="flexbox-container">
    <StatusPage />
    <HistoryPage />
  </div>
);

export default Home;
