var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
});
module.exports = connection;

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  connection.query("CREATE DATABASE IF NOT EXISTS dev_db", function(err, result) {
    if (err) throw err;
    console.log("Database ${connection.datase} created.");
  });
  connection.query("USE dev_db", function(err, result) {
    if (err) throw err;
    console.log("Database dev_db selected.");
  });
  connection.query("CREATE TABLE IF NOT EXISTS `Invoice` (\
    `Id` INTEGER NOT NULL AUTO_INCREMENT,\
    `CreatedAt` DATETIME,\
    `ReferenceMonth` INTEGER,\
    `ReferenceYear` INTEGER,\
    `Document` VARCHAR(14),\
    `Description` VARCHAR(256),\
    `Amount` DECIMAL(16, 2),\
    `IsActive` TINYINT,\
    PRIMARY KEY(`Id`))", function(err, result) {
      if (err) throw err;
      console.log("Invoice table created.");
  });
  connection.end(function(err){
    if (err) throw err;
    console.log("Conncection closed. Database initialized.");
  });
});
