import fs from 'fs';
import winston from 'winston';
import 'winston-daily-rotate-file';
import string from '../utils/string';
import config from '../config/config';

const {
  width,
  level,
  logDir,
  tsFormat,
  jsonFormat,
  dateFormat
} = config.logging;

// Create log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/**
 * Add custom formatter for logging.
 *
 * @param {object} options
 * @returns {String}
 */
function customFormatter(options) {
  let level = winston.config.colorize(options.level, options.level.toUpperCase());
  let message = options.message ? options.message : '';
  let meta = options.meta && Object.keys(options.meta).length ? '\n' + JSON.stringify(options.meta.error, null, 4) : '';

  return `${options.timestamp}  [${string.center(level, width)}]  ${message}  ${meta}`;
}

/**
 * Create new winston logger instance.
 */
const logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      level: level,
      colorize: true,
      timestamp: tsFormat,
      formatter: customFormatter
    }),
    new winston.transports.DailyRotateFile({
      align: true,
      level: level,
      prepend: true,
      json: jsonFormat,
      timestamp: tsFormat,
      datePattern: dateFormat,
      formatter: customFormatter,
      filename: `${logDir}/-log.log`
    })
  ]
});

export default logger;
