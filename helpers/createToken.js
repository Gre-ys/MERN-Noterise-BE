const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "2h" });
  return token;
};

module.exports = createToken;
