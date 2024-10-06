const propelAuth = require("@propelauth/express");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = propelAuth.initAuth({
  authUrl: process.env.AUTH_URL,
  apiKey: process.env.API_KEY,
});

console.log(auth)
// Sign Up
const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await auth.createUser({ email, password, name });
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email: user.email,
      password: hashedPassword,
      userId: user.userId,
      name: user.name,
    });

    await newUser.save();
    res.status(201).json({ message: "User signed up", user });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
};

// Sign In
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await auth.authenticateUser({ email, password });

    const dbUser = await User.findOne({ userId: user.userId });
    if (!dbUser) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: dbUser.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, userId: dbUser.userId });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error });
  }
};

module.exports = { signup, signin };
