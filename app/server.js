var express = require('express');
var config = require('config');
var moment = require('moment');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var invoicesRouter = require('./controllers/routes/invoices');

console.log('Starting server using ' + config.util.getEnv('NODE_ENV') + ' environment.');

var app = express();

app.use(bodyParser.json({type: 'application/json'}));
app.use(expressValidator({
  customValidators: {
    isDateTime: function(value) {
      var formats = ['YYYY-MM-DD', "YYYY-MM-DD HH:mm:ss"];
      return moment(value, formats, true).isValid();
    }
  }
}));

/* Routes */
app.use('/invoices', invoicesRouter);

port = config.InvoiceProject.nodeServer.port;
app.listen(port);
console.log('Server Listening on port ' + port + '...');

module.exports = app;
