import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';

import pkg from '../package';
import routes from './routes';
import logger from './utils/logger';
import bodyParser from 'body-parser';
import compression from 'compression';
import * as config from './config/config';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

app.set('port', config.get().restApi.port);

app.locals.title = pkg.name;
app.locals.version = pkg.version;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev', { stream: logger().stream }));
app.use(bodyParser.json());

// API Routes
app.use('/api', routes);

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFoundError);

app.listen(app.get('port'), () => {
  logger().info(`Server listening is on port ${app.get('port')}`);
});

export default app;
