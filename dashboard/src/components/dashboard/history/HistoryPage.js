import React from 'react';

import HistoryPanel from './HistoryPanel';

/**
 * Renders historyPanel within page separated
 * for the list of history.
 */
const HistoryPage = () => (
  <div className="incidents-list format-expanded">
    <h2>Past Incidents</h2>
    <HistoryPanel />
  </div>
);

export default HistoryPage;
