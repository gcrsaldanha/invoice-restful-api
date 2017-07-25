CREATE TABLE IF NOT EXISTS `Invoice` (
	`Id` INTEGER NOT NULL,
	`CreatedAt` DATETIME,
	`ReferenceMonth` INTEGER,
	`ReferenceYear` INTEGER,
	`Document` VARCHAR(14),
	`Description` VARCHAR(256),
	`Amount` DECIMAL(16, 2),
	`IsActive` TINYINT,
	PRIMARY KEY(`Id`)
)