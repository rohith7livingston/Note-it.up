const errorHandler = (err, req, res, next) => {
    // If a status code has already been set, use it. Otherwise, default to 500 (Internal Server Error).
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    res.json({
        message: err.message,
        // Only show the stack trace in development mode for security
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };