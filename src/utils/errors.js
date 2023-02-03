class ServerError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

class ResourceNotFoundError extends ServerError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = { ServerError, ResourceNotFoundError };