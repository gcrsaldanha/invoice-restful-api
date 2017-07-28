const InvoiceDAO = require('../models/InvoiceDAO');

const InvoiceMiddlewares = {
  lookupInvoice: (req, res, next) => {
    const id = req.params.id;
    InvoiceDAO.getInvoiceById(id, (error, results) => {
      if (error) {
        console.error(error);
        res.statusCode = 500;
        return res.json({ errors: ['Could not retrieve Invoice'] });
      }
      if (results.length === 0) {
        res.statusCode = 404;
        return res.json({ errors: ['Invoice not found' ]});
      }
      req.invoice = results[0];
      next();
    });
  },

  validateInvoicePostPut: (req, res, next) => {
    req.checkBody('ReferenceMonth', 'Month must be an integer between [1, 12]').isInt({min: 1, max: 12});
    req.checkBody('ReferenceYear', 'Year must be a positive integer number').isInt({min: 0});
    req.checkBody('Document', 'Document cannot be empty').notEmpty();
    req.checkBody('Document', 'Document cannot be greater than 14 characters').isLength({max: 14});
    req.checkBody('Amount', 'Amount must be a valid currency (separators: decimal (.), thousands (,)').isCurrency();
    req.checkBody('IsActive', 'IsActive must be 0 (False) or 1 (True)').isIn([0, 1]);
    if (req.body.DeactiveAt) {
      req.checkBody('DeactiveAt', 'DeactiveAt must follow format YYYY-MM-DD [hh:mm:ss]').isDateTime();
    }

    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        res.statusCode = 400;
        return res.json({ errors: result.array() });
      } else {
        req.sanitize('Amount').blacklist(',');
        return next();
      }
    });
  },

  validateInvoicePatch: (req, res, next) => {
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
        return res.json({ errors: result.array() });
      } else {
        req.sanitize('Amount').blacklist(',');
        return next();
      }
    });
  }
};
module.exports = InvoiceMiddlewares;