import WebSocket from 'ws';
import logger from './logger';

export const CONNECTION_ESTABLISHED_EVENT = 'ws-connection-establish';

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

  wsServer = new WebSocket.Server({ port });
  wsServer.broadcast = handleBroadcast;
  wsServer.on('connection', handleConnection);
  wsServer.on('error', handleError);

  logger().info(`WebSocket server started on port ${port}`);
}

/**
 * Handle websocket connection opened.
 *
 * @param {Object} client
 */
function handleConnection(client) {
  logger().info('Connected with a new WebSocket client');
  logger().debug('Client data', client);

  let data = {
    event: CONNECTION_ESTABLISHED_EVENT,
    data: {
      message: 'Chill WebSocket connection established'
    }
  };

  sendToClient(client, data).catch(err => {
    logger().error('Error sending message to newly connected client', err);
  });
}

/**
 * Handle WebSocket server error.
 *
 * @param {Object} err
 */
function handleError(err) {
  logger().error('WebSocket error occurred', err);
}

/**
 * Send data to the client.
 *
 * @param {Object} client
 * @param {Object} data
 * @returns {Promise}
 */
function sendToClient(client, data) {
  let payload = JSON.stringify(data);

  logger().info('Sending data to client via WebSocket.');
  logger().debug('Client: ', client);
  logger().debug('Data:', data);

  return new Promise((resolve, reject) => {
    client.send(payload, err => {
      if (err) {
        reject(err);

        return;
      }

      resolve();
    });
  });
}

/**
 * Broadcast data to WebSocket clients.
 *
 * @param  {Object} data
 */
export function broadcast(data) {
  logger().info('Doing a WebSocket broadcast');
  logger().debug('Broadcast data', data);
  wsServer.broadcast(data);
}

/**
 * Handle WebSocket broadcast.
 *
 * @param  {Object} data
 */
function handleBroadcast(data) {
  wsServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      sendToClient(client, data).catch(err => {
        logger().error('Error on broadcasting message to client', err);
      });
    }
  });
}
