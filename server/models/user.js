const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const { UPLOADS_FOLDER } = require('../middlewares');
const defaultProfileImage = UPLOADS_FOLDER.concat( '/default.png' );

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'user name is required!',
    unique: 'user name must be unique!'
  },
  password: {
    type: String,
    required: 'password is required!'
  },
  profileImage: {
    type: String,
    default: defaultProfileImage
  },
  creationDate: {
    type: Date,
    required: true
  }
});

userSchema.plugin( mongooseUniqueValidator );
module.exports = mongoose.model( 'User' , userSchema );
