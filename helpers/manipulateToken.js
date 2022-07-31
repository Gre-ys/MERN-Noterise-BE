//const redis = require("redis");
//const JWTR = require("jwt-redis");
//const redisClient = redis.createClient();
const jwtr = require("jsonwebtoken")

const createToken = async (user) => {
  try {
    //await redisClient.connect();
    //const jwtr = new JWTR(redisClient);
    const token = await jwtr.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "2h" });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const verifyToken = async (token) => {
  try {
    //await redisClient.connect();
    //const jwtr = new JWTR(redisClient);
    const data = jwtr.verify(token, process.env.SECRET_KEY);
    return data;
  } catch (error) {
    throw new Error("Invalid Token!");
  }
};

//const destroyToken = async (data) => {
  //try {
    //await redisClient.connect();
    //const jwtr = new JWTR(redisClient);
    //await jwtr.destroy(data.jti, process.env.SECRET_KEY);
    //return true;
  //} catch (error) {
    //throw new Error("Failed To Destroy Token!");
  //}
//};

module.exports = { createToken, verifyToken };
