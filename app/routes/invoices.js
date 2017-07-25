var express = require('express');
var Invoice = require('../models/Invoice')

var router = express.Router();

/* GET invoices listing. */
router.get('/', function(req, res, next) {
  Invoice.getAllInvoices(function(error, rows) {
    if (error) {
      res.json(error);
    } else {
      res.json(rows);
    }
  });
});

/* GET single invoice. */
router.get('/:invoiceId', function(req, res, next) {
  Invoice.getInvoiceById(req.params.invoiceId, function(error, rows) {
    if (error) {
      res.json(error);
    } else {
      res.json(rows);
    }
  });
});

/* POST invoice. */
router.post('/', function(req, res, next) {
  Invoice.addInvoice(req.body, function(error, rows) {
    if (error) {
      res.json(error);
    } else {
      res.json(req.body)
    }
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
