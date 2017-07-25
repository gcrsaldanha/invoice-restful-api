var db = require('../db_connection_pooling');

var Invoice = {
  getAllInvoices: function(callback) {
    return db.query("Select * from Invoice", callback);
  },

  getInvoiceById: function(id, callback) {
    return db.query("select * from Invoice where Id = ?", [id], callback);
  },

  addInvoice: function(Invoice, callback) {
    console.log(Invoice.CreatedAt);
    query =
    return db.query("Insert into Invoice values(?, ?, ?, ?, ?, ?, ?)", [
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
    return db.query("delete from Invoice where Id = ?", [id], callback);
  },

  updateInvoice: function(id, Invoice, callback) {
    return db.query("update Invoice set \
      CreatedAt = ?, \
      ReferenceMonth = ?, \
      ReferenceYear = ?, \
      Document = ?, \
      Description = ?, \
      Amount = ?, \
      IsActive = ?, \
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
  }
};
module.exports=Invoice;