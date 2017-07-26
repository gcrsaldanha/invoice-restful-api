var db = require('../db_connection_pooling');

var Invoice = {
  getInvoices: function(page, limit, month, year, doc, sortingDict, callback) {
    var offset = (page - 1) * limit;
    var sql = 'SELECT * FROM Invoice WHERE IsActive = 1';
    if (month !== '') sql += ' AND ReferenceMonth = ' + db.escape(month);
    if (year !== '') sql += ' AND ReferenceYear = ' + db.escape(year);
    if (doc !== '') sql += " AND Document = " + db.escape(doc);
    if (Object.keys(sortingDict).length !== 0) {
      sql += ' ORDER BY ';
      var i = 0;
      for(var el in sortingDict) {
        i += 1;
        var parameter = db.escape(el).replace(/'/g, "`");
        var order = sortingDict[el];
        // Last element of the list, no comma
        if (i === Object.keys(sortingDict).length) {
          sql += parameter + ' ' + order;
        } else {
          sql += parameter + ' ' + order + ', ';
        }
      }
    }
    console.log(sql);
    sql += ' LIMIT ' + db.escape(limit) + ' OFFSET ' + db.escape(offset);
    return db.query(sql, callback);
  },

  getInvoiceById: function(id, callback) {
    return db.query('SELECT * FROM Invoice WHERE Id = ? AND IsActive = 1', [id], callback);
  },

  addInvoice: function(Invoice, callback) {
    return db.query('INSERT INTO `Invoice` (\
      `CreatedAt`, `ReferenceMonth`, `ReferenceYear`, `Document`, `Description`, `Amount`, `IsActive`) \
      VALUES (?, ?, ?, ?, ?, ?, ?)', [
      Invoice.CreatedAt,
      Invoice.ReferenceMonth,
      Invoice.ReferenceYear,
      Invoice.Document,
      Invoice.Description,
      Invoice.Amount,
      Invoice.IsActive
    ], callback);
  },

  deleteInvoice: function(id, callback) {
    return db.query('UPDATE Invoice SET IsActive = 0 WHERE Id = ?', [id], callback);
  },

  updateInvoice: function(id, Invoice, callback) {
    query = db.query("update Invoice set \
      CreatedAt = ?, \
      ReferenceMonth = ?, \
      ReferenceYear = ?, \
      Document = ?, \
      Description = ?, \
      Amount = ?, \
      IsActive = ? \
      where Id = ?",
      [
        Invoice.CreatedAt,
        Invoice.ReferenceMonth,
        Invoice.ReferenceYear,
        Invoice.Document,
        Invoice.Description,
        Invoice.Amount,
        Invoice.IsActive,
        id
      ], callback);
    return query;
  }
};
module.exports = Invoice;