var express = require('express');
var config = require('config');
var jwt = require('jsonwebtoken');

var apiConfig = config.InvoiceProject.apiConfig;
var router = express.Router();

router.post('/', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username === apiConfig.user) {
    if (password === apiConfig.password) {
      var token = jwt.sign(
        {data: username},
        apiConfig.secret,
        {expiresIn: '24h'});

      return res.json({
        success: true,
        message: 'Login Successful!',
        token: token
      });
    } else {
      return res.json({success: false, message: 'Invalid password.'});
    }
  } else {
    return res.json({success: false, message: 'Invalid username.'});
  }
});

module.exports = router;