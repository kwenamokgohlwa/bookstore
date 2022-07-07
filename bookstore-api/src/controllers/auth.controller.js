const db = require("../models");
const config = require("../config/auth.config");
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
  db.user.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    pseudonym: req.body.pseudonym
    })
    .then( user => {
        res.send({ 
            id: user.id,
            username: user.username,
            password: "*************",
            pseudonym: user.pseudonym,
            message: "User was registered successfully." 
        });
    })
    .catch( err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signIn = (req, res) => {
  db.user.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var isPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!isPassword) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password."
        });
      }

      var token = jwt.sign({ id: user.id, username: user.username, pseudonym: user.pseudonym }, config.secret, {
        expiresIn: 86400
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        password: "*************",
        pseudonym: user.pseudonym,
        accessToken: token
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};