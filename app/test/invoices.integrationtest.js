process.env.NODE_ENV = 'test';

const config = require('config');
const chai = require('chai');
const request = require('supertest');

const app = require('../app');
const InvoiceDAO = require('../controllers/models/InvoiceDAO');

const assert = chai.assert;
const serverConfig = config.get('InvoiceProject.nodeServer');



describe('Invoices routes test', () => {
  beforeEach(() => {
    InvoiceDAO.deleteAll((err, result) => {
      if (err) throw err;
    });
  });

  describe('GET /invoices', () => {
    it('should respond with an empty array', (done) => {
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
    it('should respond with 404 not found ', (done) => {
      request(app)
        .get('/invoices/1')
        .expect(404, done);
    });
  });
});