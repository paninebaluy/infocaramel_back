const winston = require('winston');
const expressWinston = require('express-winston');

// logger of requests
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'request.log',
      handleExceptions: false,
      json: true,
      maxsize: 1048576, // 1MB
      colorize: false,
      prettyPrint: true,
      timestamp: true,
      maxFiles: 1, // ограничить количество файлов с логами, иначе они будут размножаться бесконечно
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'dd MMM YYYY, HH:mm:ss ZZ' }),
    winston.format.json(),
  ),
  levels: winston.config.syslog.levels,
  exitOnError: false,
});

// logger of errors
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      handleExceptions: true,
      json: true,
      maxsize: 1048576, // 1MB
      colorize: false,
      prettyPrint: true,
      timestamp: true,
      maxFiles: 1,
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'dd MMM YYYY, HH:mm:ss ZZ' }),
    winston.format.json(),
  ),
  levels: winston.config.syslog.levels,
  exitOnError: false,
});

module.exports = {
  requestLogger,
  errorLogger,
};
