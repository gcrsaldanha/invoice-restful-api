var express = require('express');
var Invoice = require('../models/Invoice')

var router = express.Router();

/* GET single Invoice Middleware. */
function lookupInvoice(req, res, next) {
  var id = req.params.id;
  Invoice.getInvoiceById(id, function(error, results){
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({errors: ['Could not retrieve Invoice.']});
    }
    if (results.length === 0) {
      res.statusCode = 404;
      return res.json({errors: ['Invoice not found.']});
    }
    req.invoice = results[0];
    next();
  });
}

/* GET invoices listing. */
router.get('/', function(req, res) {
  Invoice.getAllInvoices(function(error, results) {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({errors: ['Failed to retrieve Invoices']});
    }
    res.statusCode = 200;
    if (results.length === 0) {
      return res.json({message: ['No active Invoices registered']});
    }
    return res.json({invoices: results});
  });
});

/* GET single invoice. */
router.get('/:id', lookupInvoice, function(req, res) {
  return res.json(req.invoice);
});

/* POST invoice. */
router.post('/', function(req, res) {
  Invoice.addInvoice(req.body, function(error, results) {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({errors: ['Failed to create Invoice']});
    }
    console.log(results);
    var createdInvoiceId = results.insertId;
    Invoice.getInvoiceById(createdInvoiceId, function(error, results) {
      if (error) {
        console.error(error);
        res.statusCode = 500;
        return res.json({errors: ['Failed to retrieved created Invoice']});
      }
      res.statusCode = 201;
      return res.json(results[0]);
    });
  });
});

/* PUT invoice. */
router.put('/:invoiceId', function(req, res, next) {
  Invoice.updateInvoice(req.params.invoiceId, req.body, function(error, rows) {
    if (error) {
      res.json(error);
    } else {
      res.json(rows);
    }
  });
});

/* PATCH invoice. */
router.patch('/:invoiceId', function(req, res, next) {
  res.json({message: 'Not yet implemented'});
});

/* DELETE invoice. */
router.delete('/:invoiceId', function(req, res, next) {
  Invoice.deleteInvoice(req.params.invoiceId, function(error, rows) {
    if (error) {
      res.json(error);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
