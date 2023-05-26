const getDefaultMessage = (statusCode) => {
    switch (statusCode) {
        case 400:
            return 'Bad Request';
        case 401:
            return 'Unauthorized';
        case 403:
            return 'Forbidden';
        case 404:
            return 'Not Found';
        case 500:
            return 'Internal Server Error';
        default:
            return 'Error';
    }
};


const errorHandler = (err, req, res, next) => {
    let statusCode = err.status || 500;
    let message = err.message || getDefaultMessage(statusCode);

    res.status(statusCode).json({ message: message });
};

module.exports = errorHandler;
