import config from '../config';

const CONNECTION_ESTABLISHED_EVENT = 'ws-connection-establish';

let ws;
let handlers = {};

/**
 * Initialize websocket client.
 *
 * @param {Object} handlers
 */
export function initialize(handlers) {
  if (!ws) {
    connect(handlers);
  }
}

/**
 * Connect to the websocket endpoint.
 *
 * @param {Object} eventHandlers
 */
function connect(eventHandlers) {
  ws = new WebSocket(config.websocket.endpoint);
  handlers = eventHandlers || {};

  ws.onclose = handleClose;
  ws.onmessage = handleMessage;
}

/**
 * Handle websocket incoming message.
 *
 * @param {Object} e
 */
function handleMessage(e) {
  let data = JSON.parse(e.data);

  // Do not call callback function for connection established event
  if (data.event !== CONNECTION_ESTABLISHED_EVENT) {
    handlers.onMessage(e, data);
  }
}

/**
 * Handle websocket connection closed.
 *
 */
function handleClose() {
  setTimeout(() => {
    connect(handlers);
  }, config.websocket.reconnectTimeout);
}

