const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Username is required!',
    unique: 'Username already exists!',
    minlength: [ 3, 'Username is too short! At least 3 characters is required!' ],
    maxlength: [ 23, 'Username is too long! Max characters: 23!' ]
  },
  password: {
    type: String,
    required: 'Password is required!',
    minlength: [ 6, 'Password is too short! At least 6 characters is required!' ]
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
