import io from 'socket.io-client';

import logger from '../utils/logger';
import * as map from '../services/map';
import * as config from '../config/config';
import Monitor from '../monitoring/Monitor';

const SOCKET_CONNECT = 'connect';
const SOCKET_MONITOR_NS = '/monitor';
const SOCKET_REST_API_NS = '/rest-api';
const SOCKET_DISCONNECT = 'disconnect';

const SERVICE_STOP = 'service-stop';
const SERVICE_START = 'service-start';
const SERVICE_STATUS_CHANGED = 'service-status-changed';

let monitorSocket;

/**
 * Check socket notification is enabled.
 *
 * @returns {Boolean}
 */
export function isEnabled() {
  let { socket } = config.get();

  return socket && socket.enabled;
}

/**
 * Start socket connection.
 */
export function start() {
  try {
    let { host, port } = config.get().socket;
    let monitorUrl = `${host}:${port}${SOCKET_MONITOR_NS}`;
    let restApiUrl = `${host}:${port}${SOCKET_REST_API_NS}`;
    let restApiSocket = io.connect(restApiUrl, { reconnect: true });

    monitorSocket = io.connect(monitorUrl, { reconnect: true });

    restApiSocket.on(SOCKET_CONNECT, () => {
      logger().info(`REST-API-SOCKET connected on ${restApiUrl}`);
    });

    monitorSocket.on(SOCKET_CONNECT, () => {
      logger().info(`REST-API-SOCKET connected on ${monitorUrl}`);
    });

    restApiSocket.on(SOCKET_DISCONNECT, () => {
      logger().info(`REST-API-SOCKET disconnected on ${restApiUrl}`);
    });

    monitorSocket.on(SOCKET_DISCONNECT, () => {
      logger().info(`REST-API-SOCKET disconnected on ${monitorUrl}`);
    });

    restApiSocket.on(SERVICE_START, payload => {
      logger().debug(`REST-API-SOCKET start service`, payload);

      if (map.hasId(payload.id)) {
        map.get(payload.id).start();
      } else {
        let service = new Monitor(payload);

        service.start();
        map.set(payload.id, service);
      }
    });

    restApiSocket.on(SERVICE_STOP, payload => {
      logger().debug(`REST-API-SOCKET stop service`, payload);

      if (map.hasId(payload.id)) {
        map.get(payload.id).stop();
        map.remove(payload.id);
      }
    });

  } catch (err) {
    logger().error(`REST-API-SOCKET error`, err.message);
  }
}

/**
 * Send notification through socket.
 *
 * @param {object} payload
 */
export function notify(payload) {
  try {
    monitorSocket.emit(SERVICE_STATUS_CHANGED, payload);
  } catch (err) {
    logger().error(`MONITOR-SOCKET error on notify`, err.message);
  }
}
