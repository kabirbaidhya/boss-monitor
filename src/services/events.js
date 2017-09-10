import EventEmitter from 'events';

// Public constants
export const EVENT_MONITORING = 'monitoring';
export const EVENT_STATUS_CHANGED = 'status-changed';
export const EVENT_MONITORING_STOPPED = 'stopped-monitoring';
export const EVENT_MONITORING_STARTED = 'started-monitoring';
export const EVENT_MONITORING_RESTARTED = 'restarted-monitoring';

let emitter = new EventEmitter();

/**
 * Trigger an event.
 *
 * @param {String} event
 * @param {Object} [params={}]
 */
export function trigger(event, params = {}) {
  emitter.emit(event, params);
}

/**
 * Add an event listener.
 *
 * @param {String} event
 * @param {Function} listener
 */
export function addListener(event, listener) {
  emitter.addListener(event, listener);
}

/**
 * Remove an event listener.
 *
 * @param {String} event
 * @param {Function} listener
 */
export function removeListener(event, listener) {
  emitter.removeListener(event, listener);
}
