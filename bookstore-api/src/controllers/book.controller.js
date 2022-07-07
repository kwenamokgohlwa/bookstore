const db = require("../models");
const Op = db.Sequelize.Op;

exports.getBooks = (req, res) => {
    db.book.findAll()
    .then( books => {
        res.status(200).send(JSON.stringify(books));
    })
    .catch( err => {
        res.status(500).send({ message: err.message });
    });
};

exports.searchBooks = (req, res) => {
     db.book.findAll({
         where: {
           title: req.params.title
         }
       })
     .then( books => {
         res.status(200).send(JSON.stringify(books));
     })
     .catch( err => {
         res.status(500).send({ message: err.message });
     });
 };

exports.unpublishBook = (req, res) => {
    if (!req.user.id) {
        return res.status(404).send({ message: "User not logged in." });
      }

    db.user.findOne({
        where: {
          id: req.params.id
        }
      })
        .then(user => {
          if (!user && user.id != req.user.id) {
            return res.status(404).send({ message: "User not authorised to unpublish this book." });
          }
    
          db.book.destroy({
            where: {
                id: req.params.id
            }
            })
            .then( () => {
                res.status(200).send({ message: "Book Unpublished." });
            })
            .catch( err => {
                res.status(500).send({ message: err.message });
            });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
};