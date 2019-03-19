import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const HistoryRow = ({ data }) => {
  const { id, createdAt, service, status } = data;

  const serviceData = JSON.parse(service);
  const statusData = JSON.parse(status);

  return (
    <li>
      <span>{serviceData.name} was in {statusData.name} state on </span>
      <span>{moment(createdAt).format("DD MMMM, YYYY hh:mm")}</span>
      <hr />
    </li>
  );
};

HistoryRow.propTypes = {
  data: PropTypes.object
};

export default HistoryRow;
