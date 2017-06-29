import WebSocket from 'ws';
import logger from './logger';

let wsServer;

/**
 * Initialize WebSocket server.
 *
 * @param  {Number} port
 */
export function init(port) {
  if (wsServer) {
    return;
  }

  wsServer = new WebSocket.Server({
    port: port
  });

  wsServer.broadcast = handleBroadcast;

  logger().info(`WebSocket started on port ${port}`);

  let data = {
    event: 'ws-connection-establish',
    data: {
      message: 'Chill WebSocket connection established'
    }
  };

  let payload = JSON.stringify(data);

  wsServer.on('connection', client => {
    client.send(payload, err => {
      logger().warn('Error sending message to newly connected client', err);
    });
  });
}

/**
 * Broadcast data to WebSocket clients.
 *
 * @param  {Object} data
 */
export function broadcast(data) {
  wsServer.broadcast(data);
}

/**
 * Handle WebSocket broadcast.
 *
 * @param  {Object} data
 */
function handleBroadcast(data) {
  let payload = JSON.stringify(data);

  wsServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload, err => {
        logger().warn('Error on broadcasting message to client', err);
      });
    }
  });
}
