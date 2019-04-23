import { groupBy } from 'ramda';

import config from '../config';
import http from '../utils/http';

/**
 * Get the latest history.
 *
 * @returns {Promise}
 */
export async function fetchIncidents() {
  const { endpoints } = config.api;
  const { data } = await http.get(endpoints.history);
  const group = groupBy(row => new Date(row.createdAt).toDateString());

  const groups = group(data);
  const result = Object.keys(groups).map(date => ({
    date,
    list: groups[date]
  }));

  return result;
}
