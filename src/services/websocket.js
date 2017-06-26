import WebSocket from 'ws';
import logger from '../utils/logger';
import * as config from '../config/config';

let webSocket;

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
 * Send notification through WebSocket.
 *
 * @param  {Object} params
 */
export function notify(params) {
  logger().debug('Notification Params:', params);

  webSocket.broadcast = function broadcast(data) {
    let message = {
      data: data,
      event: 'server-status-change'
    };

    message = JSON.stringify(message);

    webSocket.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };

  webSocket.broadcast(params);
}

/**
 * Start WebSocket server.
 */
export function start() {
  let port = config.get().notifications.websocket.port;

  if (!webSocket) {
    webSocket =  new WebSocket.Server({ port: port });

    let message = {
      event: 'ws-connection-establish',
      data: {
        message: 'Chill WebSocket connection established'
      }
    };

    message = JSON.stringify(message);

    webSocket.on('connection', function connection(ws) {
      ws.send(message);
    });
  }
}
