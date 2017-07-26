var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
});
module.exports = connection;

var create_database_sql = "CREATE DATABASE IF NOT EXISTS InvoiceDB;"
var use_database_sql = "USE InvoiceDB;";
var create_table_sql = "\
CREATE TABLE IF NOT EXISTS Invoice (\
  Id INTEGER NOT NULL AUTO_INCREMENT,\
  CreatedAt DATETIME NOT NULL,\
  ReferenceMonth INTEGER NOT NULL,\
  ReferenceYear INTEGER NOT NULL,\
  Document VARCHAR(14) NOT NULL,\
  Description VARCHAR(256),\
  Amount DECIMAL(16, 2) NOT NULL,\
  IsActive TINYINT NOT NULL,\
  DeactiveAt DATETIME,\
  PRIMARY KEY(Id)\
)\
"
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query(create_database_sql, function(err, result) {
    if (err) throw err;
    console.log('InvoiceDB database created!');
  });
  connection.query(use_database_sql, function(err, result) {
    if (err) throw err;
    console.log('InvoiceDB selected.');
  })
  connection.query(create_table_sql, function(err, result) {
    if (err) throw err;
    console.log('Invoice table created!');
  })
  connection.end(function(err){
    if (err) throw err;
    console.log("Connection closed. Database initialized.");
  });
});
