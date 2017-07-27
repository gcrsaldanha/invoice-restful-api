var config = require('config');
var dbConfig = config.get('InvoiceProject.dbConfig');

var mysql = require('mysql');
var pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  port: dbConfig.port,
  database: dbConfig.dbName
});
module.exports=pool;

pool.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
  console.log('The result above must be 2 to ensure the Pool querying is working properly.')
});