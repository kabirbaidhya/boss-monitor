import https from 'https';

import { OPTIONS } from './http';

export const DEFAULT_SSL_PORT = 443;

/**
 * Get details about SSL certificate for given host.
 *
 * @param {string} host
 * @param {string} port
 * @param {number} method
 */
export function getSSLInfo(host, port = DEFAULT_SSL_PORT, method = OPTIONS) {
  const options = {
    host,
    port,
    method,
    agent: false,
    rejectUnauthorized: false
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      const {
        valid_from: validFrom,
        valid_to: validTo
      } = res.connection.getPeerCertificate();

      resolve({
        validTo,
        validFrom,
        valid: res.socket.authorized
      });
    });

    req.on('error', e => reject(e));

    req.end();
  });
}
