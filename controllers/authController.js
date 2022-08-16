const bcrypt = require("bcrypt");
const { createToken } = require("../helpers/manipulateToken");
const User = require("../models/User");
const sendEmail = require("../helpers/sendEmail");

const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check If Username Has Already Used
    const userExistUsername = await User.findOne({ username: username });
    if (userExistUsername) return res.status(400).json({ error: "Username Already Used!" });

    // Check If Email Already Used
    const userExistEmail = await User.findOne({ email: email });
    if (userExistEmail) return res.status(400).json({ error: "Email Already Used!" });
  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    // Hash Password
    const hash = await bcrypt.hash(password, 10);
    // Create User
    await User.create({ username, password: hash, email });
    // Send Email
    const html = `
    <h1>Welcome To Noterise!!!</h1>
    <p>Share Everything You Consider Important In Form Of Notes</p>
    `;
    await sendEmail(email, "Registered In Noterise", html);
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
    return res.status(200).json({ message: "Login Success!", token: token });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const googleOk = async (req, res) => {
  // If Cookie User Not Found
  if (!req.user) return res.status(401).json({ error: "User Not Authenticated!" });

  return res.status(400).json({message:"Login Success"})
};

const logout = (req, res) => {
  req.logout(async function (error) {
    if (error) return res.status(400).json({ error });
    req.session.destroy();
	req.user = null
    res.status(200).json({ message: "Logout Success!" });
  });
};

const updateProfile = (req, res) => {
	// Get Data For Profile
	 const { username, password } = req.body;
	 const findEmail = await User.findById(req.user.id)
	 const email = findEmail.email;

  try {
    // Check If Username Has Already Used
    const userExistUsername = await User.findOne({ username: username });
    if (userExistUsername) return res.status(400).json({ error: "Username Already Used!" });

  } catch (error) {
    return res.status(400).send(error);
  }

  try {
    // Hash Password
    const hash = await bcrypt.hash(password, 10);
	
    // Update User
	const user = await User.findByIdAndUpdate(req.user.id, { ...req.body, email });

    return res.status(200).json({ message: "Profile Updated!" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
}

module.exports = { register, login, googleOk, logout, updateProfile };
