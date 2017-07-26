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
  }
};

module.exports = Utils;