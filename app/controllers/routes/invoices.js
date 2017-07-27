var express = require('express');
var InvoiceDAO = require('../models/InvoiceDAO');
var Utils = require('../utils/InvoiceUtils');
var Mws = require('./InvoiceMiddlewares');

var router = express.Router();

/* GET single invoice. */
router.get('/:id([0-9]+)', Mws.lookupInvoice, function(req, res) {
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
      return res.json({invoices: []});
    }
    return res.json({invoices: results});
  });
});

/* POST invoice. */
router.post('/', Mws.validateInvoicePostPut, function(req, res) {
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
router.put('/:id([0-9]+)', Mws.lookupInvoice, Mws.validateInvoicePostPut, function(req, res) {
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
router.patch('/:id([0-9]+)', Mws.lookupInvoice, Mws.validateInvoicePatch, function(req, res) {
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
router.delete('/:id([0-9]+)', Mws.lookupInvoice, function(req, res) {
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
