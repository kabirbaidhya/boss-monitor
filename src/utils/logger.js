import fs from 'fs';
import winston from 'winston';
import 'winston-daily-rotate-file';
import config from '../config/config';
import { centerAlignString } from '../utils/stringFormatter';

const { logDir, level, jsonFormat, spaceLength, tsFormat, dateFormat } = config.logging;
// Create log directory if it does not exist

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

function customFormatter(options) {
  // Return string will be passed to logger.
  let level = winston.config.colorize(options.level, options.level.toUpperCase());
  let message = options.message ? options.message : '';
  let meta = options.meta && Object.keys(options.meta).length ? '\n' + JSON.stringify(options.meta.error, null, 4) : '';
  
  return `${options.timestamp}  [${centerAlignString(level, spaceLength)}]  ${message}  ${meta}`;
}

/**
 * Create new winston logger instance.
 */
const logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      timestamp: tsFormat,
      colorize: true,
      level: 'info',
      formatter: customFormatter
    }),
    new winston.transports.DailyRotateFile({
      filename: `${logDir}/-debug.log`,
      timestamp: tsFormat,
      datePattern: dateFormat,
      prepend: true,
      level: level,
      align: true,
      formatter: customFormatter,
      json: jsonFormat
    })
  ]
});

export default logger;
