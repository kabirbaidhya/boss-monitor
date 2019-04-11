import React from 'react';
import PropTypes from 'prop-types';

import HistoryRow from './HistoryRow';

const HistoryList = ({ events }) => (
  <ul className="list-group">
    {
      events.length && events.map(history => <HistoryRow data={history} key={history.id} />)
    }
  </ul>
);

HistoryList.propTypes = {
  events: PropTypes.array
};

export default HistoryList;
