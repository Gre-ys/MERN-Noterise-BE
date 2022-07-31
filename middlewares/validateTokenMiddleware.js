const { verifyToken } = require("../helpers/manipulateToken");

const validateToken = async (req, res, next) => {
  const token = req.header("token");

  if (!token || token === undefined || token.length == 0) return res.status(401).json({ error: "User Not Authenticated!" });

  try {
    const data = await verifyToken(token);
    req.user = data;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token!" });
  }
};

module.exports = validateToken;
