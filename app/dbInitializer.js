const config = require('config');
const dbConfig = config.get('InvoiceProject.dbConfig');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  port: dbConfig.port
});

const create_database_sql = 'CREATE DATABASE IF NOT EXISTS ' + dbConfig.dbName + ';'
const use_database_sql = 'USE ' + dbConfig.dbName + ';';
const create_table_sql = '\
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
  PRIMARY KEY(Id), \
  INDEX ReferenceMonthIndex (ReferenceMonth), \
  INDEX ReferenceYearIndex (ReferenceYear), \
  INDEX DocumentIndex (Document), \
  INDEX IsActiveIndex (IsActive) \
);\
'
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
  connection.query(create_database_sql, function(err, result) {
    if (err) throw err;
    console.log(dbConfig.dbName + ' database created!');
  });
  connection.query(use_database_sql, function(err, result) {
    if (err) throw err;
    console.log(dbConfig.dbName + ' selected.');
  })
  connection.query(create_table_sql, function(err, result) {
    if (err) throw err;
    console.log('Invoice table created!');
  })
  connection.end(function(err){
    if (err) throw err;
    console.log('Connection closed. Database initialized.');
  });
});
module.exports = connection;