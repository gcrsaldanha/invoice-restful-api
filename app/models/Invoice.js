var db = require('../db_connection_pooling');

var Invoice = {
  getAllInvoices: function(callback) {
    return db.query("Select * from Invoice where IsActive = 1", callback);
  },

  getInvoiceById: function(id, callback) {
    return db.query("select * from Invoice where Id = ? AND IsActive = 1", [id], callback);
  },

  addInvoice: function(Invoice, callback) {
    return db.query("Insert into Invoice values(null, ?, ?, ?, ?, ?, ?, ?)", [
      Invoice.CreatedAt,
      Invoice.ReferenceMonth,
      Invoice.ReferenceYear,
      Invoice.Document,
      Invoice.Description,
      Invoice.Amount,
      Invoice.IsActive
    ], callback);
  },

  deleteInvoice: function(id,callback) {
    return db.query("update Invoice set IsActive = 0 where Id = ?", [id], callback);
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
module.exports=Invoice;
