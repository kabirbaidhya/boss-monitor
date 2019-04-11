import React from 'react';

import StatusPanel from './StatusPanel';
import HistoryPanel from './history/Panel';

const StatusPage = () => (
  <div className="page-wrapper wrapper">
    <StatusPanel />
    <HistoryPanel />
  </div>
);

export default StatusPage;
