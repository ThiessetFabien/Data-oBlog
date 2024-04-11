function withErrorHandler(controller) {
  return (request, response, next) => {
    try {
      controller(request, response, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = withErrorHandler;
