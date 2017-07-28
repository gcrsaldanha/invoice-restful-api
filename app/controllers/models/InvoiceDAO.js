var db = require('../../dbPooling');

var InvoiceDAO = {
  getInvoices: (page, limit, month, year, doc, sortingDict, callback) =>{
    const offset = (page - 1) * limit;
    let sql = 'SELECT * FROM Invoice WHERE IsActive = 1';
    if (month !== '') sql += ' AND ReferenceMonth = ' + db.escape(month);
    if (year !== '') sql += ' AND ReferenceYear = ' + db.escape(year);
    if (doc !== '') sql += ' AND Document = ' + db.escape(doc);
    if (Object.keys(sortingDict).length !== 0) {
      sql += ' ORDER BY ';
      let sortingDictIndex = 0;
      for (const el in sortingDict) {
        sortingDictIndex += 1;
        const parameter = db.escape(el).replace(/'/g, "`");
        const order = sortingDict[el];
        // Last element of the list, no comma
        if (sortingDictIndex === Object.keys(sortingDict).length) {
          sql += parameter + ' ' + order;
        } else {
          sql += parameter + ' ' + order + ', ';
        }
      }
    }
    sql += ' LIMIT ' + db.escape(limit) + ' OFFSET ' + db.escape(offset);
    return db.query(sql, callback);
  },

  getInvoiceById: (id, callback) => {
    return db.query('SELECT * FROM Invoice WHERE Id = ? AND IsActive = 1', [id], callback);
  },

  addInvoice: (Invoice, callback) => {
    return db.query('INSERT INTO Invoice (\
      CreatedAt, ReferenceMonth, ReferenceYear, Document, Description, Amount, IsActive, DeactiveAt) \
      VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?)', [
        Invoice.ReferenceMonth,
        Invoice.ReferenceYear,
        Invoice.Document,
        Invoice.Description,
        Invoice.Amount,
        Invoice.IsActive,
        Invoice.DeactiveAt
      ], callback);
  },

  deleteInvoice: (id, callback) => {
    return db.query('UPDATE Invoice SET IsActive = 0 WHERE Id = ?', [id], callback);
  },

  updateInvoice: (id, Invoice, callback) => {
    query = db.query('UPDATE Invoice SET \
      ReferenceMonth = ?, \
      ReferenceYear = ?, \
      Document = ?, \
      Description = ?, \
      Amount = ?, \
      IsActive = ?, \
      DeactiveAt = ? \
      WHERE Id = ?',
      [
        Invoice.ReferenceMonth,
        Invoice.ReferenceYear,
        Invoice.Document,
        Invoice.Description,
        Invoice.Amount,
        Invoice.IsActive,
        Invoice.DeactiveAt,
        id
      ], callback);
    return query;
  },

  patchInvoice: (id, Invoice, callback) => {
    query = db.query('UPDATE Invoice SET \
      ReferenceMonth = COALESCE(?, ReferenceMonth), \
      ReferenceYear = COALESCE(?, ReferenceYear), \
      Document = COALESCE(?, Document), \
      Description = COALESCE(?, Description), \
      Amount = COALESCE(?, Amount), \
      IsActive = COALESCE(?, IsActive), \
      DeactiveAt = COALESCE(?, DeactiveAt) \
      WHERE Id = ?',
      [
        Invoice.ReferenceMonth,
        Invoice.ReferenceYear,
        Invoice.Document,
        Invoice.Description,
        Invoice.Amount,
        Invoice.IsActive,
        Invoice.DeactiveAt,
        id
      ], callback);
    return query;
  },

  deleteAll: (callback) => {
    query = db.query('TRUNCATE Invoice');
    return query;
  }
};
module.exports = InvoiceDAO;