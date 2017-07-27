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