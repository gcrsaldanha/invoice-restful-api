process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var utils = require('../controllers/utils/InvoiceUtils');

var assert = chai.assert;

describe('InvoiceUtils (parsing)', () => {

  describe('parsePage(page)', () => {
    it('should return 1 if page is NaN', () => {
      assert.equal(utils.parsePage('its not a number =('), 1);
    });
    it('should return 1 if page is < 1', () => {
      assert.equal(utils.parsePage(0), 1);
    });
    it('should truncate page if page is positive decimal', () => {
      assert.equal(utils.parsePage(99.99), 99);
    });
    it('should return page if page is a number greater than 0', () => {
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
    it('should truncate decimal limit if and 1 <= limit <= maxLimit', () => {
      assert.equal(utils.parseLimit(20.999, maxLimit, defaultLimit), 20);
    });
    it('should return limit if 1 <= limit <= maxLimit', () => {
      assert.equal(utils.parseLimit(25, maxLimit, defaultLimit), 25);
    });
  });

  describe('parseMonth(month)', () => {
    it('should return empty string if month is NaN', () => {
      assert.equal(utils.parseMonth('not a number =/'), '');
    });
    it('should return empty string if month < 1', () => {
      assert.equal(utils.parseMonth(0), '');
    });
    it('should return empty string if month > 12', () => {
      assert.equal(utils.parseMonth(13), '');
    });
    it('should truncate month if month is decimal between [1, 12]', () => {
      assert.equal(utils.parseMonth(1.5), 1);
    })
    it('should return month if month is between [1, 12]', () => {
      assert.equal(utils.parseMonth(12), 12);
      assert.equal(utils.parseMonth(1), 1);
      assert.equal(utils.parseMonth(6), 6);
    });
  });

  describe('parseYear(year)', () => {
    it('should return empty string if year is NaN', () => {
      assert.equal(utils.parseYear('not a number =/'), '');
    });
    it('should return empty string if year < 0', () => {
      assert.equal(utils.parseYear(-1), '');
    });
    it('should truncate year if year is positive decimal', () => {
      assert.equal(utils.parseYear(2017.9999), 2017);
    })
    it('should return year if year >= 0', () => {
      assert.equal(utils.parseYear(0), 0);
      assert.equal(utils.parseYear(2017), 2017);
      assert.equal(utils.parseYear(2017), 2017);
    });
  });


});
