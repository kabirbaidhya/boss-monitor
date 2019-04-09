import * as url from '../utils/url';
import logger from '../utils/logger';
import * as https from '../utils/https';
import { UNKNOWN, VALID, EXPIRED } from '../models/SSLStatus';

/**
 * Map variable to identify SSL status id from given response.
 */
export const sslStatusIdMap = {
  true: VALID,
  null: UNKNOWN,
  false: EXPIRED
};

/**
 * Check the host's SSL status by sending an HTTP request.
 *
 * @param   {Object} service
 * @returns {Promise}
 */
export async function checkSSLStatus(service) {
  const { name } = service;
  const { host, port } = url.parse(service.url);

  try {
    logger().debug(`Checking SSL status for ${name} <${service.url}>`);

    const res = await https.getSSLInfo(host, port);

    logger().debug(
      `Received SSL status response for ${name}: `,
      JSON.stringify(res, null, 4)
    );

    return {
      sslStatusId: sslStatusIdMap[res.valid],
      validFrom: res.validFrom,
      validTo: res.validTo
    };
  } catch (err) {
    logger().debug(`Received SSL status error response for ${name}: `, err);

    return {
      sslStatusId: UNKNOWN,
      validTo: null,
      validFrom: null
    };
  }
}
