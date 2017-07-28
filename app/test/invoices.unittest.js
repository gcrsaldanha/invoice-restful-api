process.env.NODE_ENV = 'test';

var config = require('config');
var chai = require('chai');
var request = require('supertest');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

var app = require('../app');

var assert = chai.assert;
var expect = chai.expect;
var InvoiceDAO = require('../controllers/models/InvoiceDAO');
var serverConfig = config.get('InvoiceProject.nodeServer');

//var func = DAO.getInvoices(1, 10, '', '', '', {}, function(err, res){});

describe('Invoices routes test', () => {
  before(() => { });

  beforeEach(() => { });

  describe('GET /invoices', () => {
    it('should return 200 and empty array of invoices', () => {
      var getInvoicesStub = sinon.stub(InvoiceDAO, 'getInvoices').callsFake(() => {
        console.log('asdf');
      });
      request(app)
        .get('/invoices')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          invoices: [],
        });
    });
  });
});
