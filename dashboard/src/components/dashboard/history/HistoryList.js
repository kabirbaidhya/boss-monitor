import React from 'react';
import PropTypes from 'prop-types';

import HistoryInnerRow from './HistoryInnerRow';
import HistoryRow from './HistoryRow';
import { uniqueDate } from '../../../services/historyDate';

const HistoryList = ({ histories }) => {
  const historyDate = uniqueDate(histories);

  return (
    <>
      {Object.keys(historyDate).map(date => (
        <div className="incidents-block" key={date}>
          <HistoryInnerRow data={date} />
          {historyDate[date].map((history, index) => (
            <HistoryRow data={history} key={index} />
          ))}
        </div>
      ))}
    </>
  );
};

HistoryList.propTypes = {
  histories: PropTypes.array
};

export default HistoryList;
