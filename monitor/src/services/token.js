
import * as base64 from '../utils/base64';

/**
 * Calculates token for basic authentication from username and password.
 *
 * @param {Object} auth
 * @returns {String} 
 */
export function getToken(auth) {
  const requiresAuthentication = auth && auth.userName && auth.password;

  if (requiresAuthentication) {
    const { userName, password } = auth;

    return base64.encode(`${userName}:${password}`);
  }
}
