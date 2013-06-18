module.exports = function(app) {
  var BookController = app.controllers.BookController;
  
  app.get('/', function(req, res) {
    res.redirect('/books');
  });

  /* Books */
  app.get('/new', BookController.new);
  app.get('/books', BookController.list);
  app.post('/books', BookController.create);
  app.get('/books/:id', BookController.read);
  app.put('/books/:id', BookController.update);
  app.del('/books', BookController.del);
}