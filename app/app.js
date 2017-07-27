var express = require('express');
var config = require('config');
var moment = require('moment');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressValidator = require('express-validator');

var app = express();

var apiConfig = config.InvoiceProject.apiConfig;

app.use(bodyParser.json({type: 'application/json'}));
app.use(morgan('dev'));

app.use(expressValidator({
  customValidators: {
    isDateTime: function(value) {
      var formats = ['YYYY-MM-DD', "YYYY-MM-DD HH:mm:ss"];
      return moment(value, formats, true).isValid();
    }
  }
}));

/* Routes */
var authRouter = require('./controllers/routes/auth');
var invoicesRouter = require('./controllers/routes/invoices');
app.use('/auth', authRouter);
app.use('/invoices', invoicesRouter);

// Server startup
port = config.InvoiceProject.nodeServer.port;
console.log('Starting server using ' + config.util.getEnv('NODE_ENV') + ' environment.');
app.listen(port);
console.log('Server Listening on port ' + port + '...');

module.exports = app;
