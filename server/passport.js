const passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      JwtStrategy   = require('passport-jwt').Strategy,
      ExtractJwt    = require('passport-jwt').ExtractJwt,
      bcrypt        = require('bcryptjs');

const { User } = require('./models');
const { JWT_SECRET } = require('./config');

passport.use( new LocalStrategy({ session: false }, async ( username, password, done ) => {
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
