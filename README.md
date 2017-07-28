# RESTful API for Invoices
----
A NodeJS/Express RESTful API for handling invoices.

It's intended to be used as a **learning resource** (i.e., not suitable for production use).

## API Interface
If you already have your project set up, head over to [API Interface Documentation](API.md).

## Getting Started
### Configuration File
There are 3 files to be configured under [app/config/](app/config/):
- [default.yaml](app/config/default.yaml) (*meant to be overriden by dev or test*)
- [dev.yaml](app/config/dev.yaml)
- [test.yam](app/config/test.yaml)

***DISCLAIMER***: credentials were put "raw" in this file for simplicity. If you want to use it publicly, consider reading credentials from environment variables.

The meaning of each value is as follows:
- `dbConfig`
  - `host`: database host URI (*default: localhost*)
  - `user`: database user (*default: root*)
  - `password`: database passowrd (*default: root*)
- `apiConfig`
  - `secret`: api private key for token signature (*default: thatsmysecret*)
  - `user`: api username for authentication (*default: apiuser*)
  - `password`: api password for authentication (*default: apipassword*)
- `nodeServer`
  - `host`: server host (*default: localhost*)
  - `port`: server port (*default: 3000*)
  
### Starting the server
After setting up the configuration files as indicated above:

`npm install` inside `app/` folder to install the dependencies.

`export NODE_ENV=dev`(*Optional but recommended*)

`node dbInitializer`: creates database according to `NODE_ENV` and config files

`npm start`: starts the server using `config` parameters

***For testing***: 

Configure `config/test.yaml` then set `NODE_ENV=test` and run `node dbInitializer.js`

After database creation, simply run: `npm test`
  
### Database Setup details
#### [dbInitializer.js](app/dbInitializer.js)
`node dbInitializer.js`

Initializes MySQL database using `NODE_ENV` environment variable for configuration parameters. **(if `NODE_ENV` is not provided, it uses [default.yaml](app/config/default.yaml))**

Create table query:
```
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
```



