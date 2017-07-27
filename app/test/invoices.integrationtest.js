process.env.NODE_ENV = 'test';

var config = require('config');
var chai = require('chai');
var request = require('supertest');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

var app = require('../app');
var InvoiceDAO = require('../controllers/models/InvoiceDAO');

var assert = chai.assert;
var serverConfig = config.get('InvoiceProject.nodeServer');

var validInvoice = {
  "CreatedAt": "2017-12-21 21:00:30",
  "ReferenceMonth": 12,
  "ReferenceYear": 2012,
  "Document": "a3kvdfj9",
  "Description": "lorem ipsum description",
  "Amount": 10.50,
  "IsActive": 1,
  "DeactiveAt": "2018-12-20 10:00:00"
}

describe('Invoices routes test', () => {
  beforeEach(function() {
    InvoiceDAO.deleteAll((err, result) => { });
  });

  describe('GET /invoices', function() {
    it('should respond with an empty array', function(done) {
      request(app)
        .get('/invoices')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          invoices: [],
        }, done);
    });
  });

  describe('GET /user/:id', () => {
    InvoiceDAO.addInvoice(validInvoice, function(err, res) { });
    InvoiceDAO.deleteAll(function(err, result) { });

    it('respond with 404 not found ', (done) => {
      request(app)
        .get('/invoices/1')
        .expect(404, done);
    });
  });
});