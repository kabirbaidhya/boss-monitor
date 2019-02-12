import * as serviceService from '../services/service';

/**
 * Get all the services.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function getAll(req, res, next) {
  serviceService.fetchAll()
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Fetch a single service by it's id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function get(req, res, next) {
  serviceService.fetch(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));
}

/**
 * Fetch a latest status of a service by the service id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export function getServiceStatus(req, res, next) {
  serviceService.fetchStatus(req.params.id)
    .then(data => res.json(data))
    .catch(err => next(err));
}
