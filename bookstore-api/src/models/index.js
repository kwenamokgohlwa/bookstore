const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        port: config.port,
        dialect: config.dialect,
        dialectOptions: config.dialectOptions.ssl
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.book = require("../models/book.model.js")(sequelize, Sequelize);

db.book.belongsTo(db.user, {
    foreignKey: "author",
    targetKey: "id",
  });

module.exports = db;