import React from 'react';
import PropTypes from 'prop-types';

import Incident from './Incident';
import IncidentRow from './IncidentRow';

/**
 * Lists incidents
 * and passes incident details to Event.
 *
 * @param {Array} incidents
 */
const HistoryList = ({ incidents }) => {
  return (
    <>
      {incidents.map(group => (
        <div className="incidents-block" key={group.date}>
          <IncidentRow data={group.date} />
          {group.list.map(incident => (
            <Incident data={incident} key={incident.id} />
          ))}
        </div>
      ))}
    </>
  );
};

HistoryList.propTypes = {
  incidents: PropTypes.array
};

export default HistoryList;
