var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var invoicesRouter = require('./controllers/routes/invoices');

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

module.exports = app;
