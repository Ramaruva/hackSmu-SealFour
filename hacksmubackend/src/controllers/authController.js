const propelAuth = require("@propelauth/express");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = propelAuth.initAuth({
  authUrl: process.env.AUTH_URL,
  apiKey: process.env.API_KEY,
});

//register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let userdb = await User.findOne({ email });
    if (userdb) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const user = await auth.createUser({ name, email, password, role });
    console.log(user, "hs");
    const newUser = new User({
      email: email,
      password: password,
      userId: user.userId,
      name: name,
      role: role,
    });
    await newUser.save();
    console.log(newUser,"newUser");
    if (role == "doctor") {
      const newDoctor = new Doctor({
        doctorId: newUser._id,
        specialty: req.body?.specialty,
      });
      await newDoctor.save();
    }
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ token, newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// Sign In
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const dbUser = await User.findOne({ email: email });
    if (!dbUser) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: dbUser.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, userData: dbUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error signing in", error });
  }
};

module.exports = { register, signin };
