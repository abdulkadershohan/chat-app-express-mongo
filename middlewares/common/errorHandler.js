const createError = require('http-errors');

// 404 handler middleware

function notFoundHandler(req, res, next) {
    next(createError(404, 'Your requested content was not found'));
}

// default error handler middleware

function errorHandler(err, req, res, next) {
    res.render('error', {
        title: 'Error Page',
    })
}

module.exports = {
    notFoundHandler,
    errorHandler,
}