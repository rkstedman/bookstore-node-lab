module.exports = function(app) {
  var Controller = { name: 'BookController' },
      BookModel = app.models.BookModel;
  
  Controller.list = function(req, res){
    BookModel.list({}, function(error, books) {
      res.format({
        html: function(){
          if(error) {
            res.render('books/bookshelf', {error: error});
          } else {
            res.render('books/bookshelf', {books: books});
          }
        }, 
        json: function(){
          if(error) {
            res.send(error.code, error);
          } else {
            res.send(200, books);
          }
        }
      });
    });
  };

  Controller.new = function(req, res) {
    res.render('books/new', {page: 'new'});
  }

  Controller.create = function(req, res) {
    res.send("respond with a resource");
  };

  Controller.read = function(req, res) {
    var isbn = req.params.isbn;
    console.log(isbn);
    BookModel.read(isbn, function(error, book) {
      res.format({
        html: function(){
          if(error) {
            res.render('books/bookshelf', {error: error});
          } else {
            res.render('books/book', {book: book});
          }
        }, 
        json: function(){
          if(error) {
            res.send(error.code, error);
          } else {
            res.send(200, book);
          }
        }
      });
    });
    // res.render('books/book', {page: 'book', book: book});
  };

  Controller.update = function(req, res) {
    res.send("respond with a resource");
  };

  Controller.del = function(req, res) {
    res.send("respond with a resource");
  };
  
  return Controller;
}


