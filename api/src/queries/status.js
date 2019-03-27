export const LATEST_STATUS = (`
  SELECT
  sl.id,
  MAX(sl.created_at) AS created_at,
  sl.updated_at,
  json_array(
    json_object(
      'type', 'SSL',
      'id', sst.id,
      'status', sst.name,
      'valid_from', sl.valid_from,
      'valid_to', sl.valid_to
    ),
    json_object(
      'type', 'HTTP',
      'id', st.id,
      'status', st.name
    )
  ) AS status,
  json_object(
    'id', s.id,
    'name', s.name,
    'url', s.url,
    'type', s.type
  ) AS service
  FROM status_logs sl
  INNER JOIN services s ON s.id = sl.service_id
  INNER JOIN statuses st ON st.id = sl.status_id
  INNER JOIN ssl_statuses sst ON sst.id = sl.ssl_status_id
  GROUP BY sl.service_id
  ORDER BY sl.service_id, sl.created_at DESC
`);

export const STATUS_LOGS = (`
  SELECT sl.*,
    json_object(
      'id', st.id,
      'name', st.name
    ) AS status,
    json_object(
      'id', s.id,
      'name', s.name,
      'url', s.url,
      'type', s.type
    ) AS service
  FROM status_logs sl
  INNER JOIN services s ON s.id = sl.service_id
  INNER JOIN statuses st ON st.id = sl.status_id
  ORDER BY sl.created_at DESC
`);
