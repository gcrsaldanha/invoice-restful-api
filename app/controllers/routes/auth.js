const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');

const apiConfig = config.InvoiceProject.apiConfig;
const router = express.Router();

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === apiConfig.user) {
    if (password === apiConfig.password) {
      const token = jwt.sign(
        { data: username },
        apiConfig.secret,
        { expiresIn: '24h' });

      return res.json({
        success: true,
        message: 'Login Successful!',
        token: token
      });
    } else {
      return res.json({ success: false, message: 'Invalid password.' });
    }
  } else {
    return res.json({ success: false, message: 'Invalid username.' });
  }
});
module.exports = router;