
const debug = require('debug')('app');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

global.app = express();

app.disable('x-powered-by');
if (process.env.NODE_ENV === 'development')
    app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    debug({message: 'SimpleMailer server listening on port ' + port + ' with env ' + process.env.NODE_ENV});
});

require('./router')

// ups
process.on('uncaughtException', err => {
    debug('uncaughtException', err.stack);
    process.exit();
});