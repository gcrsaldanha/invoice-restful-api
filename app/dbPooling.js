const config = require('config');
const dbConfig = config.get('InvoiceProject.dbConfig');

const mysql = require('mysql');
const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  port: dbConfig.port,
  database: dbConfig.dbName
});
module.exports = pool;