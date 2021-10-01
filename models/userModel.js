const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  //   role: {
  //     type: String,
  //     enum: ['user', 'guide', 'lead-guide', 'admin'],
  //     default: 'user',
  //   },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // Only on .create() || .save()
      validator: function (el) {
        return el === this.password;
      },
      message: 'Entered passwords do not match.',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  // Run this if password is isModified
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};
userSchema.methods.changedPassAfter = function (JwtTimestamp) {
  if (this.passwordChangedAt) {
    console.log(this.passwordChangedAt, JwtTimestamp);
  }
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
