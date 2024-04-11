const ApiError = require('../errors/apiError');

function validate(schema, source) {
  return (request, _, next) => {
    const { error } = schema.validate(request[source]);
    if (error) {
      const apiError = new ApiError(400, error.name, error.message);
      next(apiError);
    }
    next();
  };
}

module.exports = validate;
