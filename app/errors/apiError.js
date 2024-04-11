class ApiError extends Error {
  constructor(status, name, message) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

module.exports = ApiError;
