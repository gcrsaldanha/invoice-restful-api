CREATE DATABASE IF NOT EXISTS InvoiceDB;

USE InvoiceDB;

CREATE TABLE IF NOT EXISTS Invoice (
  Id INTEGER NOT NULL AUTO_INCREMENT,
  CreatedAt DATETIME NOT NULL,
  ReferenceMonth INTEGER NOT NULL,
  ReferenceYear INTEGER NOT NULL,
  Document VARCHAR(14) NOT NULL,
  Description VARCHAR(256),
  Amount DECIMAL(16, 2) NOT NULL,
  IsActive TINYINT NOT NULL,
  DeactiveAt DATETIME,
  PRIMARY KEY(Id),
  INDEX ReferenceMonthIndex (ReferenceMonth),
  INDEX ReferenceYearIndex (ReferenceYear),
  INDEX DocumentIndex (Document),
  INDEX IsActiveIndex (IsActive)
);