const jwt = require("jsonwebtoken");

const createToken = (user) => {
  try {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "2h" });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    return data;
  } catch (error) {
    throw new Error("Invalid Token!");
  }
};

module.exports = { createToken, verifyToken };
