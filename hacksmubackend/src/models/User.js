const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'consultant'], required: true },  // student or doctor
  profile: {
    age: Number,
    gender: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    bio: String,
    specialty: String,  // For consultants (doctors)
  },
  createdAt: { type: Date, default: Date.now },
});

// Password hash middleware
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password validation
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
