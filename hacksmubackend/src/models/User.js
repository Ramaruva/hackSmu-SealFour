// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  userId: { type: String, required: true, unique: true }, // From PropelAuth
});

const User = mongoose.model('User', userSchema);

module.exports = User;
