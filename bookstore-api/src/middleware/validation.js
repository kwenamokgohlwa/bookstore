const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");

verifyUsername = (req, res, next) => {
  db.user.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    next();
  });
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "Missing token"
    });
  }
  
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized"
      });
    }

    req.user = {
      id: decoded.id,
      username: username.id,
      pseudonym: pseudonym.id
    };

    next();
  });
};

module.exports = {
  verifyUsername: verifyUsername,
  verifyToken: verifyToken
};