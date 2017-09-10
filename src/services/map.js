// TODO: Use hash table.
const map = {};

/**
 * Get value from hash table.
 *
 * @param {number} key
 * @returns {object}
 */
export function get(key) {
  return map[key];
}

/**
 * Check id exists in map.
 *
 * @param {number} key
 * @returns {boolean}
 */
export function hasId(key) {
  return map.hasOwnProperty(key);
}

/**
 * Set value to hash table.
 *
 * @param {number} key
 * @param {object} value
 */
export function set(key, value) {
  map[key] = value;
}

/**
 * Remove value from hash table.
 *
 * @param {number} key
 */
export function remove(key) {
  delete map[key];
}

