import fs from 'fs';
import winston from 'winston';
import 'winston-daily-rotate-file';
import config from '../config/config';
import * as str from '../utils/string';

const {
  level,
  logDir,
  tsFormat,
  jsonFormat,
  dateFormat,
  levelColumnWidth
} = config.logging;

// Create log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/**
 * Add custom formatter for logging.
 *
 * @param {Object} options
 * @returns {String}
 */
function customFormatter(options) {
  let level = formatLevel(options.level);
  let message = options.message ? options.message : '';
  let meta = options.meta && Object.keys(options.meta).length ? '\n' + JSON.stringify(options.meta.error, null, 4) : '';

  return `${options.timestamp()}  [${level}]  ${message}  ${meta}`;
}

/**
 * Formats the logging level with and colors & justification.
 *
 * @param {String} level
 * @returns {String}
 */
function formatLevel(level) {
  let centeredLevel = str.center(level.toUpperCase(), levelColumnWidth);

  return `${winston.config.colorize(level, centeredLevel.toUpperCase())}`;
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
