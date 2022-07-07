const User = require("./user.model");

module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('books', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.DOUBLE,
        },
        image: {
            type: Sequelize.STRING,
        },
    });

    return Book;
  };


