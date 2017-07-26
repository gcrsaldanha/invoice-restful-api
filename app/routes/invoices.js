var express = require('express');
var Invoice = require('../models/Invoice');
var Utils = require('../Utils');

var router = express.Router();

/* Validation Middleware. */
function validateInvoice(req, res, next) {
  req.checkBody('ReferenceMonth', 'Month must be an integer between [1, 12]').isInt({min: 1, max: 12});
  req.checkBody('ReferenceYear', 'Year must be a positive integer number').isInt({min: 0});
  req.checkBody('Document', 'Document cannot be empty').notEmpty();
  req.checkBody('Document', 'Document cannot be greater than 14 characters').isLength({max: 14});
  req.checkBody('Amount', 'Amount must be a valid currency (separators: decimal (.), thousands (,)').isCurrency();
  req.checkBody('IsActive', 'IsActive must be 0 (False) or 1 (True)').isIn([0, 1]);

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.statusCode = 400;
      var response = {errors: result.array()};
      return res.json(response);
    } else {
      req.sanitize('Amount').blacklist(',');
      return next();
    }
  });
}

/* GET single Invoice Middleware. */
function lookupInvoice(req, res, next) {
  var id = req.params.id;
  Invoice.getInvoiceById(id, function(error, results){
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({errors: ['Could not retrieve Invoice']});
    }
    if (results.length === 0) {
      res.statusCode = 404;
      return res.json({errors: ['Invoice not found']});
    }
    req.invoice = results[0];
    next();
  });
}

/* GET invoices listing. */
router.get('/:page?/:limit?/:month?/:year?/:doc?/:sort?/', function(req, res) {

  var page = Utils.parsePage(req.query.page);
  var limit = Utils.parseLimit(req.query.limit, 50, 10);
  var month = Utils.parseMonth(req.query.month);
  var year = Utils.parseYear(req.query.year);
  var doc = Utils.parseDoc(req.query.doc);
  var sortingDict = Utils.parseSort(req.query.sort);

  Invoice.getInvoices(page, limit, month, year, doc, sortingDict, function(error, results) {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({errors: ['Failed to retrieve Invoices']});
    }
    res.statusCode = 200;
    if (results.length === 0) {
      return res.json({
        message: ['No active Invoices registered that attend the specified fields.']
      });
    }
    return res.json({invoices: results});
  });
});

/* GET single invoice. */
router.get('/:id([0-9]+)', lookupInvoice, function(req, res) {
  res.statusCode = 200;
  return res.json(req.invoice);
});

/* POST invoice. */
router.post('/', validateInvoice, function(req, res) {
  Invoice.addInvoice(req.body, function(error, results) {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({errors: ['Failed to create Invoice']});
    }
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
router.put('/:id([0-9]+)', function(req, res, next) {
  Invoice.updateInvoice(req.params.id, req.body, function(error, rows) {
    if (error) {
      res.json(error);
    } else {
      res.json(rows);
    }
  });
});

/* PATCH invoice. */
router.patch('/:id([0-9]+)', function(req, res, next) {
  res.json({message: 'Not yet implemented'});
});

/* DELETE invoice. */
router.delete('/:id([0-9]+)', lookupInvoice, function(req, res) {
  Invoice.deleteInvoice(req.params.id, function(error, results) {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({errors: ['Failed to delete Invoice']});
    }
    res.statusCode = 204;
    return res.send();
  });
});

module.exports = router;
