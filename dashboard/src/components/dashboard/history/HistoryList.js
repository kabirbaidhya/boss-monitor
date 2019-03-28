import React from 'react';
import PropTypes from 'prop-types';

import HistoryRow from './HistoryRow';
import HistoryOuterRow from './HistoryOuterRow';

import { uniqueDate } from '../../../services/historyDate';

const HistoryList = ({ histories }) => {
  const historyDate = uniqueDate(histories);

  return (
    <>
      {Object.keys(historyDate).map(date => (
        <div className="incidents-block" key={date}>
          <HistoryOuterRow data={date} />
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
