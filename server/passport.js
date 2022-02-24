const passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      JwtStrategy   = require('passport-jwt').Strategy,
      ExtractJwt    = require('passport-jwt').ExtractJwt,
      bcrypt        = require('bcryptjs');

const { User } = require('./models');
const { JWT_SECRET } = require('./config');

passport.use( new LocalStrategy({ session: false }, async ( username, password, done ) => {
  const user = await User.findOne({ username }).lean();

  // username was not found
  if ( !username ) {
    return done( null, false, { message: `username ${ username } does not exists!` });
  }

  // incorrect password
  const isPasswordMatch = await bcrypt.compare( password, user.password );
  if ( !isPasswordMatch ) {
    return done( null, false, { message: 'incorrect password!' });
  }
  delete user.password;

  // onSuccess login
  done( null, user );
}));

passport.use(new JwtStrategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, ( payload, done ) => {
  done( null, payload );
}));
