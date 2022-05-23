import { Request, Response, NextFunction } from 'express';

import { User } from '../models';
import { isValidId, CustomError } from '../utils';

export const getUsers = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const users  = await User.find().select( '-password' ).lean();
    const status = users.length > 0 ? 200 : 204;

    res.status( status ).json( users );
  } catch( error ) {
    next( error );
  }
};

export const getUser = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const { id: _id } = req.params;
    let user;
    if (isValidId( _id )) {
      user = await User.findById( _id ).select( '-password' ).lean();
    } else {
      user = await User.findOne({ username: _id }).select( '-password' ).lean();
    }

    if ( !user ) {
      throw new CustomError( 'Could not found the user', 404 );
    }

    res.status( 200 ).json( user );
  } catch( error ) {
    next( error );
  }
};
