var express = require('express');
var router = express.Router();

/* GET invoices listing. */
router.get('/', function(req, res, next) {
  res.send('GET on /invoices');
});

/* POST invoice. */
router.post('/', function(req, res, next) {
  res.send('POST on /invoices')
});

/* PUT invoice. */
router.put('/', function(req, res, next) {
  res.send('PUT on /invoices')
});

/* DELETE invoice. */
router.delete('/', function(req, res, next) {
  res.send('DELETE on /invoices')
});

module.exports = router;
