const verify = require("../middleware");
const bookController = require("../controllers/book.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/books", bookController.getBooks);
  app.get("/api/books/:title", bookController.searchBooks);

  app.delete(
    "/api/books/:id",
    [verify.token],
    bookController.unpublishBook
  );
};