process.env.NODE_ENV = 'test';

const chai = require('chai');
const utils = require('../controllers/utils/InvoiceUtils');

const assert = chai.assert;

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
    const defaultLimit = 10;
    const maxLimit = 50;
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

  describe('parseDoc(doc)', () => {
    it('should return an empty string if doc is not a string', () => {
      assert.equal(utils.parseDoc(123), '');
    });
    it('should return doc if doc is a string', () => {
      const doc = 'A string with ' + 123 + ' numbers';
      assert.equal(utils.parseDoc(doc), doc);
    });
  });

  describe('parseSort(sort)', () => {
    const validSort = '-ReferenceYear,ReferenceMonth';
    const onlyOneValidAttribute = 'RefEtc,ReferenceYear';
    it('should return an empty dict if sort is not a string', () => {
      const dict = utils.parseSort(1234);
      const expectedDict = {}
      assert.isTrue(Object.keys(dict).length === 0);
      assert.equal(JSON.stringify(dict), JSON.stringify(expectedDict));
    });
    it('should return an empty dict if sort is an empty string', () => {
      const dict = utils.parseSort('');
      const expectedDict = {}
      assert.isTrue(Object.keys(dict).length === 0);
      assert.equal(JSON.stringify(dict), JSON.stringify(expectedDict));
    });
    it('should return a parsed dict {\'<InvoiceAttribute>\': \'ASC|DESC\'} if sort is valid', () => {
      const expectedDict = JSON.stringify({'ReferenceYear': 'DESC', 'ReferenceMonth': 'ASC'});
      assert.equal(JSON.stringify(utils.parseSort(validSort)), expectedDict);
      assert.isTrue(Object.keys(utils.parseSort(validSort)).length === 2);
    });
    it('should return a parsed dict with ANY valid attribute', () => {
      const expectedDict = JSON.stringify({'ReferenceYear': 'ASC'});
      assert.equal(JSON.stringify(utils.parseSort(onlyOneValidAttribute)), expectedDict);
      assert.isTrue(Object.keys(utils.parseSort(onlyOneValidAttribute)).length === 1);
    });
  });

});
