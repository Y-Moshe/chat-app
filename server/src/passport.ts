import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';

import { User } from './models';
import { JWT_SECRET } from './config';

passport.use( new LocalStrategy({ session: false },
    async ( username, password, done ) => {
  try {
    const user = await User.findOne({ username }).lean();
    // user account was not found
    if ( !user ) {
      return done( null, false, { message: `The Username ${ username } does not exists!` });
    }
  
    // incorrect password
    const isPasswordMatch = await bcrypt.compare( password, user.password );
    if ( !isPasswordMatch ) {
      return done( null, false, { message: 'Incorrect password!' });
    }
    delete user.password;
  
    // onSuccess login
    done( null, user );
  } catch ( e ) {
    done( e );
  }
}));

passport.use(new JwtStrategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, ( payload, done ) => {
  done( null, payload );
}));
