export const LATEST_STATUS = `
  SELECT
  sl.*,
  MAX(sl.created_at) as created_at,
  json_object(
    'id', st.id,
    'name', st.name
  ) as status,
  json_object(
    'id', s.id,
    'name', s.name,
    'url', s.url,
    'type', s.type
  ) as service
  FROM status_logs sl
  INNER JOIN services s ON s.id = sl.service_id
  INNER JOIN statuses st ON st.id = sl.status_id
  GROUP BY sl.service_id
  ORDER BY sl.service_id, sl.created_at DESC
`;

export const STATUS_LOGS = `
  SELECT sl.*,
    json_object(
      'id', st.id,
      'name', st.name
    ) as status,
    json_object(
      'id', s.id,
      'name', s.name,
      'url', s.url,
      'type', s.type
    ) as service
  FROM status_logs sl
  INNER JOIN services s ON s.id = sl.service_id
  INNER JOIN statuses st ON st.id = sl.status_id
  ORDER BY sl.created_at DESC
`;
