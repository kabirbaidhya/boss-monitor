import rp from 'request-promise';

export const STATUS_UP = 'up';
export const STATUS_DOWN = 'down';

export function checkHostStatus(url) {
  return rp({ method: 'OPTIONS', uri: url, rejectUnauthorized: false })
        .then(() => STATUS_UP)
        .catch(() => STATUS_DOWN);
}

export function getCheckInterval(status, min, max) {
  return status === STATUS_UP ? max : min;
}
