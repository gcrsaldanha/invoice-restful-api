process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var utils = require('../controllers/utils/InvoiceUtils');

var assert = chai.assert;

describe('parsePage(page)', function() {
  describe('', function() {
    it('should return 1 if page is NaN', function(done) {
      var page = 'asdfasdf';
      assert.equal(utils.parsePage(page), 1);
      done();
    });
  });
});