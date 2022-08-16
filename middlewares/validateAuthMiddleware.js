const { verifyToken } = require("../helpers/manipulateToken");

const validateAuth = async (req, res, next) => {
  if(req.user) return next()
	
  const token = req.header("token");

  if (!token || token === undefined || token.length == 0) return res.status(401).json({ error: "User Not Authenticated!" });

  try {
    const data = verifyToken(token);
    req.user = data;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token!" });
  }
};

module.exports = validateAuth;
