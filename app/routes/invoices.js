var express = require('express');
var InvoiceDAO = require('../models/InvoiceDAO');
var Utils = require('../Utils');

var router = express.Router();

/* Validation Middleware. */
function validateInvoicePostPut(req, res, next) {
  req.checkBody('ReferenceMonth', 'Month must be an integer between [1, 12]').isInt({min: 1, max: 12});
  req.checkBody('ReferenceYear', 'Year must be a positive integer number').isInt({min: 0});
  req.checkBody('Document', 'Document cannot be empty').notEmpty();
  req.checkBody('Document', 'Document cannot be greater than 14 characters').isLength({max: 14});
  req.checkBody('Amount', 'Amount must be a valid currency (separators: decimal (.), thousands (,)').isCurrency();
  req.checkBody('IsActive', 'IsActive must be 0 (False) or 1 (True)').isIn([0, 1]);
  if (req.body.DeactiveAt) {
    req.checkBody('DeactiveAt', 'DeactiveAt must follow format YYYY-MM-DD [hh:mm:ss]').isDateTime();
  }

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

function validateInvoicePatch(req, res, next) {
  req.checkBody('ReferenceMonth', 'Month must be an integer between [1, 12]').optional().isInt({min: 1, max: 12});
  req.checkBody('ReferenceYear', 'Year must be a positive integer number').optional().isInt({min: 0});
  req.checkBody('Document', 'Document cannot be empty').optional().notEmpty();
  req.checkBody('Document', 'Document cannot be greater than 14 characters').optional().isLength({max: 14});
  req.checkBody('Amount', 'Amount must be a valid currency (separators: decimal (.), thousands (,)').optional().isCurrency();
  req.checkBody('IsActive', 'IsActive must be 0 (False) or 1 (True)').optional().isIn([0, 1]);
  req.checkBody('DeactiveAt', 'DeactiveAt must follow format YYYY-MM-DD [hh:mm:ss]').optional().isDateTime();

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
  InvoiceDAO.getInvoiceById(id, function(error, results){
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

/* GET single invoice. */
router.get('/:id([0-9]+)', lookupInvoice, function(req, res) {
  res.statusCode = 200;
  return res.json(req.invoice);
});

/* GET invoices listing. */
router.get('/:page?/:limit?/:month?/:year?/:doc?/:sort?/', function(req, res) {

  var page = Utils.parsePage(req.query.page);
  var limit = Utils.parseLimit(req.query.limit, 50, 10);
  var month = Utils.parseMonth(req.query.month);
  var year = Utils.parseYear(req.query.year);
  var doc = Utils.parseDoc(req.query.doc);
  var sortingDict = Utils.parseSort(req.query.sort);

  InvoiceDAO.getInvoices(page, limit, month, year, doc, sortingDict, function(error, results) {
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

/* POST invoice. */
router.post('/', validateInvoicePostPut, function(req, res) {
  InvoiceDAO.addInvoice(req.body, function(error, results) {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({errors: ['Failed to create Invoice']});
    }
    var createdInvoiceId = results.insertId;
    InvoiceDAO.getInvoiceById(createdInvoiceId, function(error, results) {
      if (error) {
        console.error(error);
        res.statusCode = 500;
        return res.json({errors: ['Failed to retrieve created Invoice']});
      }
      res.statusCode = 201;
      return res.json(results[0]);
    });
  });
});

/* PUT invoice. */
router.put('/:id([0-9]+)', lookupInvoice, validateInvoicePostPut, function(req, res) {
  InvoiceDAO.updateInvoice(req.params.id, req.body, function(error, results) {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({errors: ['Failed to update Invoice']});
    }
    var updatedInvoiceId = req.params.id;
    InvoiceDAO.getInvoiceById(updatedInvoiceId, function(error, results) {
      if (error) {
        console.error(error);
        res.statusCode = 500;
        return res.json({errors: ['Failed to retrieve updated Invoice']});
      }
      res.statusCode = 200;
      return res.json(results[0]);
    });
  });
});

/* PATCH invoice. */
router.patch('/:id([0-9]+)', lookupInvoice, validateInvoicePatch, function(req, res) {
  InvoiceDAO.patchInvoice(req.params.id, req.body, function(error, results) {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({errors: ['Failed to patch Invoice']});
    }
    var patchedInvoiceId = req.params.id;
    InvoiceDAO.getInvoiceById(patchedInvoiceId, function(error, results) {
      if (error) {
        console.error(error);
        res.statusCode = 500;
        return res.json({errors: ['Failed to retrieve patched Invoice']});
      }
      res.statusCode = 200;
      return res.json(results[0]);
    });
  });
});

/* DELETE invoice. */
router.delete('/:id([0-9]+)', lookupInvoice, function(req, res) {
  InvoiceDAO.deleteInvoice(req.params.id, function(error, results) {
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
