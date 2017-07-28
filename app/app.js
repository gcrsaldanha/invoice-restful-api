const express = require('express');
const config = require('config');
const moment = require('moment');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator');

const app = express();

const apiConfig = config.InvoiceProject.apiConfig;

app.use(bodyParser.json({type: 'application/json'}));
if (process.env.NODE_ENV !== 'test'){
  app.use(morgan('dev'));
}

app.use(expressValidator({
  customValidators: {
    isDateTime: function(value) {
      const formats = ['YYYY-MM-DD', "YYYY-MM-DD HH:mm:ss"];
      return moment(value, formats, true).isValid();
    }
  }
}));

/* Routes */
const authRouter = require('./controllers/routes/auth');
const invoicesRouter = require('./controllers/routes/invoices');
app.use('/auth', authRouter);
app.use('/invoices', invoicesRouter);

// Server startup
const port = config.InvoiceProject.nodeServer.port;
console.log('Starting server using ' + config.util.getEnv('NODE_ENV') + ' environment.');
app.listen(port);
console.log('Server Listening on port ' + port + '...');

module.exports = app;
