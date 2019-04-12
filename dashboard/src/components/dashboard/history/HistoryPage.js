import React from 'react';

import HistoryPanel from './HistoryPanel';

/**
 * Renders historyPanel within page separated
 * for the list of history.
 */
const HistoryPage = () => (
  <div className="sidebar">
    <h2>History Logs</h2>
    <HistoryPanel />
  </div>
);

export default HistoryPage;
