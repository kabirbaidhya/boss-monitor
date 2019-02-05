import swaggerSpec from '../utils/swagger';

/**
 * GET /api/swagger.json
 */
export function getSwaggerSpec(req, res) {
  res.json(swaggerSpec);
}


/**
 * @swagger
 * definitions:
 *   App:
 *     title: App
 *     type: object
 *     properties:
 *       app:
 *         type: string
 *       apiVersion:
 *         type: string
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get API version
 *     description: App version
 *     produces:
 *       - application/json
 *     tags:
 *       - Base
 *     responses:
 *       200:
 *         description: Application and API version
 *         schema:
 *           title: Users
 *           type: object
 *           $ref: '#/definitions/App'
 */

export function getAppInfo(req, res) {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
}
