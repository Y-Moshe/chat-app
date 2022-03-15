const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Username is required!',
    unique: 'This Username already exists!'
  },
  password: {
    type: String,
    required: 'Password is required!'
  },
  profileImage: {
    type: String,
    required: 'ProfileImage is required!'
  },
  creationDate: {
    type: Date,
    required: true
  }
});

userSchema.plugin( mongooseUniqueValidator );
const User = mongoose.model( 'User' , userSchema );
module.exports = { User };
