import fs from 'fs';
import winston from 'winston';
import 'winston-daily-rotate-file';
import * as str from '../utils/string';
import * as config from '../config/config';

/**
 * Logger instance.
 */
let instance;

/**
 * Create log directory if it does not exist.
 *
 * @param {string} logDir
 */
function createDirectory(logDir) {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
}

/**
 * Add custom formatter for logging.
 *
 * @param {Object} options
 * @param {Object} config
 * @returns {String}
 */
function customFormatter(options, config) {
  const { levelColumnWidth } = config;
  const { level, message, meta, timestamp } = options;
  const log = {
    level: formatLevel(level, levelColumnWidth),
    message: message || '',
    meta: meta && Object.keys(meta).length ? '\n' + JSON.stringify(options.meta, null, 4) : ''
  };

  return `${timestamp()}  [${log.level}]  ${log.message}  ${log.meta}`;
}

/**
 * Formats the logging level with and colors & justification.
 *
 * @param {String} level
 * @param {Number} width
 * @returns {String}
 */
function formatLevel(level, width) {
  const centeredLevel = str.center(level.toUpperCase(), width);

  return `${winston.config.colorize(level, centeredLevel.toUpperCase())}`;
}

/**
 * Create and return a new instance of Logger.
 *
 * @param   {Object} config
 * @returns {winston.Logger}
 */
function createLogger(config) {
  const {
    level,
    logDir,
    maxFiles,
    tsFormat,
    jsonFormat,
    dateFormat
  } = config;

  createDirectory(logDir);

  return new (winston.Logger)({
    transports: [
      new winston.transports.Console({
        level: level,
        colorize: true,
        timestamp: tsFormat,
        formatter: opts => customFormatter(opts, config)
      }),
      new winston.transports.DailyRotateFile({
        maxFiles,
        align: true,
        level: level,
        prepend: true,
        json: jsonFormat,
        timestamp: tsFormat,
        zippedArchive: true,
        datePattern: dateFormat,
        filename: `${logDir}/.log`,
        formatter: opts => customFormatter(opts, config)
      })
    ]
  });
}

/**
 * Return an instance of logger.
 *
 * @returns {winston.Logger}
 */
export default function logger() {
  if (instance) {
    return instance;
  }

  instance = createLogger(config.get().logging);

  return instance;
}
