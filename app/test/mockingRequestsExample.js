process.env.NODE_ENV = 'test';

var config = require('config');
var request = require('supertest');
var nock = require('nock');

var serverConfig = config.get('InvoiceProject.nodeServer');
var baseURI = 'https://' + serverConfig.host + ':' + serverConfig.port;

describe('GET /invoices test', () => {
  it('returns active invoices', (done) => {
    nock(baseURI)
      .get('/')
      .reply(200);
    done();
  });
});