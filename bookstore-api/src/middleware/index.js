const validation = require("./validation");

module.exports = {
  username: validation.verifyUsername,
  token: validation.verifyToken
};