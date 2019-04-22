import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import * as errorHandler from './middlewares/errorHandler';
import routes   from './routes';

const app = express();

app.set('port', 8000);

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

// API Routes
app.use('/slack', routes);

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFoundError);

app.listen(app.get('port'), () => {
  console.info(`Server listening is on port ${app.get('port')}`);
});

export default app;
