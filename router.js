
const debug = require('debug')('app');
const httpStatus = require('http-status-codes');

// Before routes
app.use((req, res, next) => {
    
    res.ok = (data, status) => {
        status = status || 200;
        res.status(status).send({
            data: data
        });
    };

    next();
});

// routes
app.use('/', require('./lib/email'));

// 404 handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    
    const errSplitted = err.stack.split('\n');
    debug({
        message: errSplitted[0].trim(),
        location: errSplitted[1].trim(),
        url: req.originalUrl,
    });

    const status = err.status || 500;
    res.status(status).send({
        errors: [{
            status: status,
            title: httpStatus.getStatusText(status),
            detail: err.message,
        }]
    });
});
