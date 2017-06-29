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

  wsServer.init(websocket.port);
}

/**
 * Send notification through WebSocket.
 *
 * @param  {Object} params
 */
export function notify(params) {
  wsServer.broadcast(params);
}
