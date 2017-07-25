var express = require('express');
var router = express.Router();

/* GET invoices listing. */
router.get('/invoices', function(req, res) {
  res.send('GET on /invoices');
});

/* POST invoice. */
router.post('/invoices', function(req, res) {
  res.send('POST on /invoices')
});

/* PUT invoice. */
router.put('/invoices', function(req, res) {
  res.send('PUT on /invoices')
});

/* DELETE invoice. */
router.delete('/invoices', function(req, res) {
  res.send('DELETE on /invoices')
});

module.exports = router;
