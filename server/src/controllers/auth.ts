import { Request, Response, NextFunction } from 'express';
import bcrypt   from 'bcryptjs';
import jwt      from 'jsonwebtoken';
import passport from 'passport';


import { User }       from '../models';
import { BASE_URI }   from '../utils';
import { JWT_SECRET } from '../config';

const HASH_PASSWORD_SALT         = 10;
const LOGIN_TOKEN_EXPIRES_IN     = '3h';
const DEFAULT_PROFILE_IMAGE_NAME = 'default.png';

/**
 * Sign JWT Token based on user data.
 * @param {*} data should be a user data!
 * @param {*} expiresIn in ms as number (optional)
 * @returns token properties contains the token, iat and experation date.
 */
const signToken = ( data: any, expiresIn = LOGIN_TOKEN_EXPIRES_IN ) => {
  const token = jwt.sign({ data }, JWT_SECRET, { expiresIn });
  const { iat, exp }: any  = jwt.verify( token, JWT_SECRET );

  return {
    string: token,
    iat,
    exp
  };
};

export const createUser = async ( req: Request, res: Response, next: NextFunction ) => {
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

export const loginUser = ( req: Request, res: Response ) => {
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

export const verifyToken = ( req: Request, res: Response ) => res.status( 200 ).json( req.user );
