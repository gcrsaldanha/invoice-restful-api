var db = require('../db_connection_pooling');

var Invoice = {
  getAllInvoices:function(callback){
    return db.query("Select * from Invoice", callback);
  },
  getInvoiceById:function(id, callback){
    return db.query("select * from Invoice where Id=?", [id], callback);
  },
  addInvoice:function(Invoice, callback){
    return db.query("Insert into Invoice values(?,?)", [Invoice.ReferenceMonth, Invoice.ReferenceYear], callback);
  },
  deleteInvoice:function(id,callback){
    return db.query("delete from Invoice where Id=?", [id], callback);
  },
  updateInvoice:function(id, Invoice, callback){
    return db.query("update Invoice set ReferenceMont=?, ReferenceYear=? where Id=?", [Invoice.ReferenceMonth, Invoice.ReferenceYear, id], callback);
  }
};
 module.exports=Invoice;