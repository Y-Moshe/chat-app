const bcrypt   = require('bcryptjs'),
      jwt      = require('jsonwebtoken'),
      passport = require('passport'),
      ms       = require('ms');

const { User }        = require('../models');
const { BASE_URI }    = require('../utils');
const { JWT_SECRET }  = require('../config');

const HASH_PASSWORD_SALT = 10;
const LOGIN_TOKEN_EXPIRES_IN = ms( '3h' );
const DEFAULT_PROFILE_IMAGE_NAME = 'default.png';

const signToken = ( data, expiresIn = LOGIN_TOKEN_EXPIRES_IN ) =>
  jwt.sign({ data }, JWT_SECRET, { expiresIn });

const createUser = async ( req, res, next ) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash( password, HASH_PASSWORD_SALT );

    const user = new User({
      username,
      password: hashedPassword,
      creationDate: new Date()
    });

    let uploadsUrl = req.protocol.concat( '://', req.get( 'host' ), BASE_URI, '/uploads/' );

    if ( req.file ) {
      user.profileImage = uploadsUrl.concat( req.file.filename );
    } else {
      user.profileImage = uploadsUrl.concat( DEFAULT_PROFILE_IMAGE_NAME );
    }

    await user.save();
    const user2Return = user.toObject();
    delete user2Return.password;

    const token = signToken( user2Return );
    res.status( 201 ).json({ user: user2Return, token });
  } catch( error ) {
    next( error );
  }
};

const loginUser = ( req, res ) => {
  passport.authenticate( 'local', { session: false },
    ( error, user, info ) => {
    // any error case that can occurs.
    if ( error ) {
      return res.status( 500 ).json( error );
    }

    // password or username are incorrect!
    if ( !user ) {
      return res.status( 401 ).json( info );
    }

    const token = signToken( user );
    return res.status( 200 ).json({ user, token });
  })( req, res );
};

const verifyToken = ( req, res ) => res.status( 200 ).json( req.user );

module.exports = {
  createUser,
  loginUser,
  verifyToken
};
