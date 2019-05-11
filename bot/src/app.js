import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import routes from './routes';
import logger from './utils/logger';
import * as config from './config/config';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

app.set('port', config.get().bot.port);

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
  logger().info(`Bot Server is listening on port ${app.get('port')}`);
});

export default app;
