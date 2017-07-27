process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var app = require('../app');

var InvoiceDAO = require('../controllers/models/InvoiceDAO');

/*
chai.use(chaiHttp);
describe('Invoices', () => {
  beforeEach((done) => {
    InvoiceDAO.deleteAll(function(error, results) => {
      done();
    });
  });

  describe('/GET invoices', () => {
    it('it should GET all active invoices', (done) => {
      chai.request(app).get('/invoices').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
});
*/