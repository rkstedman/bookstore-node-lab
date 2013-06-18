module.exports = function(app) {
  var ObjectId = require('mongodb').ObjectID;
  
  var Model = { name: 'BookModel' },
      collection = app.db.collection('books');
  
  Model.list = function(query, callback) {
    try {
      collection.find(query).toArray(function(error, books) {
        if(error) {
          console.log(Model.name + ' #list error when performing find ' + error.toString());
          callback(app.config.errors.database_error);
        } else {
          callback(null, books);
        }
      });
    } catch(exception) {
      console.log(Model.name + ' #list exception when performing find ' + exception);
      callback(app.config.errors.database_error);
    }  
  };
  
  Model.create = function(bookToAdd, callback) {
    try {
      collection.insert(bookToAdd, {safe: true}, function(error, book) {
        if(error) {
          console.log(Model.name + ' #create error when inserting '+ book.toString() + ' - '+ error.toString());
          callback(app.config.errors.database_error);
        } else {
          callback(null, book);
        }
      });
    } catch(exception) {
      console.log(Model.name + ' #create exception when inserting '+ book.toString() + ' - '+ exception);
      callback(app.config.errors.database_error);
    }  
  };
  
  Model.read = function(isbn, callback) {
    try {
      collection.findOne({isbn: isbn}, function(error, book) {
        if(error) {
          console.log(Model.name + ' #read error when finding book '+ isbn + ' - '+ error.toString());
          callback(app.config.errors.database_error);
        } else if(book === null){
          console.log(Model.name + ' #read could not find book '+ isbn);
          callback(app.config.errors.resource_not_found);
        } else {
          callback(null, book);
        } 
      });
    } catch(exception) {
      console.log(Model.name + ' #read exception when finding book '+ isbn +' - ' + exception);
      callback(app.config.errors.database_error);
    }  
  };
  
  Model.update = function(isbn, book, callback) {
    try {
      collection.update(isbn, book, function(error) {
        callback(app.config.errors.database_error);
      });
    } catch(exception) {
      console.log(Model.name + ' #update exception when performing update ' + exception);
      callback(app.config.errors.database_error);
    }
  };
  
  Model.del = function(isbn, callback) {
    callback();
  };
  
  return Model;
}