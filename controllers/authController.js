const bcrypt = require("bcrypt");
const createToken = require("../helpers/createToken");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, password, email } = req.body;

  // Check If Username Has Already Used
  try {
    const userExist = await User.findOne({ username: username });
    if (userExist) return res.status(400).json({ error: "Username Already Used!" });
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    // Hash Password
    const hash = await bcrypt.hash(password, 10);
    // Create User
    await User.create({ username, password: hash, email });
    return res.status(201).json({ message: "User Registered!" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  // Check If Username&Password match
  try {
    // Check Username
    const userExist = await User.findOne({ username: username });

    if (!userExist) return res.status(400).json({ error: "Wrong Username or Password!" });

    // Check Password
    const match = await bcrypt.compare(password, userExist.password);

    if (!match) return res.status(400).json({ error: "Wrong Username or Password!" });

    // Create Token
    const token = createToken(userExist);
    res.cookie("token", token, { maxAge: 60 * 60 * 2 * 1000, httpOnly: true });
    return res.status(200).json({ message: "Login Success!", token: token });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { register, login };
