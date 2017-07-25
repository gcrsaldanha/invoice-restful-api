var mysql = require('mysql');
var connection = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'mypassword',
	database: 'dev_invoice',
});
module.exports = connection;