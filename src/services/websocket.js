import logger from '../utils/logger';
import * as config from '../config/config';
import * as wsServer from '../utils/websocket';

/**
 * Check WebScoket notification is enabled.
 *
 * @return {Boolean}
 */
export function isEnabled() {
  let { websocket } = config.get().notifications;

  return websocket && websocket.enabled;
}

/**
 * Initialize WebSocket server.
 */
export function init() {
  let { websocket } = config.get().notifications;

  if (!isEnabled()) {
    return;
  }

  logger().info(`Initializing WebSocket Server on port ${websocket.port}.`);
  wsServer.init(websocket.port);
}

/**
 * Send notification through WebSocket.
 *
 * @param  {Object} payload
 */
export function notify(payload) {
  logger().info('Sending websocket notification to all connected clients.');
  logger().debug('WebSocket broadcast payload: ', payload);
  wsServer.broadcast(payload);
}
