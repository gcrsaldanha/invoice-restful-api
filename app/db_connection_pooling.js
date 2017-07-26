var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'InvoiceDB'
});
module.exports=pool;

pool.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
	if (error) throw error;
	console.log('The solution is: ', results[0].solution);
	console.log('The result above must be 2 to ensure the Pool querying is working properly.')
});