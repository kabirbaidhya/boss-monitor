import logger from '../utils/logger';
import * as config from '../config/config';
import * as websocketServer from '../utils/websocketServer';

/**
 * Check WebScoket notification is enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  const { websocket } = config.get().notifications;

  return websocket && websocket.enabled;
}

/**
 * Initialize WebSocket server.
 */
export function init() {
  if (!isEnabled()) {
    return;
  }

  const { websocket } = config.get().notifications;

  logger().info(`Initializing WebSocket Server on port ${websocket.port}.`);
  websocketServer.init(websocket.port);
}

/**
 * Send notification through WebSocket.
 *
 * @param  {Object} payload
 */
export function notify(payload) {
  logger().info('Sending websocket notification to all connected clients.');
  logger().debug('WebSocket broadcast payload: ', payload);
  websocketServer.broadcast(payload);
}
