process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var utils = require('../controllers/utils/InvoiceUtils');

var assert = chai.assert;

describe('InvoiceUtils (parsing)', function() {

  describe('parsePage(page)', function() {
    it('should return 1 if page is NaN', function() {
      assert.equal(utils.parsePage('its not a number =('), 1);
    });
    it('should return 1 if page is < 1', function() {
      assert.equal(utils.parsePage(0), 1);
    });
    it('should return page if page is a number greater than 0', function() {
      assert.equal(utils.parsePage(10), 10);
    });
  });

  describe('parseLimit(limit, maxLimit, defaultLimit)', () => {
    defaultLimit = 10;
    maxLimit = 50;
    it('should return defaultLimit if limit is NaN', () => {
      assert.equal(utils.parseLimit('asdf', maxLimit, defaultLimit), defaultLimit);
    });
    it('should return maxLimit if limit > maxLimit', () => {
      assert.equal(utils.parseLimit(100, maxLimit, defaultLimit), maxLimit);
    });
    it('should return 1 if limit < 1', () => {
      assert.equal(utils.parseLimit(0, maxLimit, defaultLimit), 1);
    });
    it('should return limit if 1 <= limit <= maxLimit', () => {
      assert.equal(utils.parseLimit(25, maxLimit, defaultLimit), 25);
    });
  });

  describe('parseMonth(month)', () => {
    it('should return \'\' if month is NaN', () => {
      assert.equal(utils.parseMonth('not a number =/'), '');
    });
    it('should return \'\' if month < 1', () => {
      assert.equal(utils.parseMonth(0), '');
    });
    it('should return \'\' if month > 12', () => {
      assert.equal(utils.parseMonth(13), '');
    });
    it('should return month if month is between [1, 12]', () => {
      assert.equal(utils.parseMonth(12), 12);
      assert.equal(utils.parseMonth(1), 1);
      assert.equal(utils.parseMonth(6), 6);
    });
  });

});
