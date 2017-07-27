/*
process.env.NODE_ENV = 'test';

var config = require('config');
var chai = require('chai');
var request = require('supertest');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

var app = require('../app');

var assert = chai.assert;
var expect = chai.expect;
//var DAO = require('../controllers/models/InvoiceDAO');
var serverConfig = config.get('InvoiceProject.nodeServer');

describe('Invoices routes test', () => {
  var InvoiceDAOStub, request, response;

  beforeEach(() => {
    InvoiceDAOStub = sinon.stub();
  });

  describe('GET /invoices', () => {
    it('GETs all active invoices', (done) => {
      request(app)
        .get('/invoices')
        .expect(200, (err, res) => {
          //expect(res.body).to.equal('');
          done();
        });
    });
  });

  describe('POST /invoices', () => {
    it('POSTs a new invoice', () => {
      assert.equal(1, 1);
    });
  })
});
*/