var express = require('express');
var bodyParser = require('body-parser');
var invoices_router = require('./routes/invoices');

var app = express();

app.use(bodyParser.json({type: 'application/json'}));

/* Routes */
app.use('/invoices', invoices_router);

module.exports = app;
