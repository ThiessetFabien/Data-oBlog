const debug = require('debug')('app:middlewares:errorHandler');
const logger = require('../helpers/logger');

function errorHandler(err, _, response, next) {
  debug('Error:', err);

  logger.error('ApiError', err);
  response.status(err.status).json({ status: 'error', name: err.name, message: err.message });
}

module.exports = errorHandler;
