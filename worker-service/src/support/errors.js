function createCustomError(message, statusCode) {
    const error = new Error(message);
    error.status = statusCode;
    return error;
}

const errors = {
    BadRequest: (message) => createCustomError(message, 400),
    Unauthorized: (message) => createCustomError(message, 401),
    Forbidden: (message) => createCustomError(message, 403),
    NotFound: (message) => createCustomError(message, 404),
    MethodNotAllowed: (message) => createCustomError(message, 405),
    InternalServerError: (message) => createCustomError(message, 500),
    NotImplemented: (message) => createCustomError(message, 501),
    BadGateway: (message) => createCustomError(message, 502),
    ServiceUnavailable: (message) => createCustomError(message, 503),
    GatewayTimeout: (message) => createCustomError(message, 504),
};

module.exports = errors;
