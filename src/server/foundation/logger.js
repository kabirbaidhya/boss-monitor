import winston from 'winston';
import config from '../config/config';

const logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console({colorize: true})
    ]
});

logger.level = config.logging.level;

export default logger;