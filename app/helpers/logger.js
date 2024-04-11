const winston = require('winston');

const logger = winston.createLogger({
  level: 'http',
  defaultMeta: { service: 'oblog-api' },
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log', level: 'info' }),
    new winston.transports.File({ filename: './logs/access.log', level: 'http' }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

module.exports = logger;
