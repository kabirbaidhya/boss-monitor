import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import routes from './routes';

import * as errorHandler from './middlewares/errorHandler';

const app = express();

export function init() {
  app.set('port', process.env.PORT || 8001);

  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // API Routes
  app.use('/', routes);

  // Error Middlewares
  app.use(errorHandler.genericErrorHandler);
  app.use(errorHandler.notFoundError);

  app.listen(app.get('port'), () => {
    console.info(`Server listening is on port ${app.get('port')}`);
  });
}
