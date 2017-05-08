import fs from 'fs';
import winston from 'winston';
import 'winston-daily-rotate-file';
import config from '../config/config';

const logDir = process.env.LOGGING_DIR || 'logs';
const isJsonFormat = process.env.JSON_FORMAT || false;
const logLevel = config.logging.level || 'info';
const tsFormat = new Date();

// Create log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

function customFormatter(options) {
    // Return string will be passed to logger.
  return options.timestamp + '\t' + 
  '[' + winston.config.colorize(options.level, options.level.toUpperCase()) + '] \t' +
  (options.message ? options.message : '') +
  (options.meta && Object.keys(options.meta).length ? '\n' + JSON.stringify(options.meta.error, null, 4) : '');
}


/**
 * Create new winston logger instance.
 */
const logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      timestamp: tsFormat,
      colorize: true,
      level: logLevel,
      formatter: customFormatter
    }),
    new winston.transports.DailyRotateFile({
      filename: `${logDir}/-debug.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: logLevel,
      align: true,
      formatter: customFormatter,
      json: isJsonFormat
    })
  ]
});

export default logger;
