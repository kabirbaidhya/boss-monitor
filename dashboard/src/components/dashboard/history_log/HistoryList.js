import React from 'react';
import PropTypes from 'prop-types';

import HistoryRow from './HistoryRow';

const HistoryList = ({ histories }) => (
  <ul className="list-group">
    {
      histories.map(history => <HistoryRow data={history} key={history.id} />)
    }
  </ul>
);

HistoryList.propTypes = {
  histories: PropTypes.array
};

export default HistoryList;
