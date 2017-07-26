var Utils = {
  parsePage: function(page) {
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    return parseInt(page);
  },

  parseLimit: function(limit, maxLimit, defaultLimit) {
    if (isNaN(limit)) {
      limit = defaultLimit;
    } else if (limit > maxLimit) {
      limit = maxLimit;
    } else if (limit < 1) {
      limit = 1;
    }
    return parseInt(limit);
  },

  parseMonth: function(month) {
    if (isNaN(month) || month < 1 || month > 12) {
      return '';
    }
    return parseInt(month);
  },

  parseYear: function(year) {
    if (isNaN(year) || year < 0) {
      return '';
    }
    return parseInt(year);
  },

  parseDoc: function(doc) {
    if (typeof doc !== 'string') {
      return '';
    }
    return doc;
  },

  parseSort: function(sort) {
    if (typeof sort !== 'string' || sort.length === 0) {
      return {};
    }
    var allowedParameters = ['ReferenceYear', 'ReferenceMonth', 'Document'];
    var sortingArray = sort.split(',');
    var sortingDict = {};
    for (var i = 0; i < sortingArray.length; i++) {
      sortingParameter = sortingArray[i];
      ordering = 'ASC';
      if (sortingParameter[0] === '-') {
        sortingParameter = sortingParameter.replace('-', '');
        ordering = 'DESC';
      }
      if (allowedParameters.includes(sortingParameter)) {
        sortingDict[sortingParameter] = ordering;
      }
    }
    return sortingDict;
  }
};

module.exports = Utils;