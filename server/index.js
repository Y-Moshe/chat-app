const express  = require('express'),
      passport = require('passport'),
      mongoose = require('mongoose'),
      cors     = require('cors'),
      http     = require('http'),
      Server   = require('socket.io').Server;
require('dotenv').config();

const {
  MONGO_CONNECTION_STRING,
  PORT
} = require('./config');
const { BASE_URI, appVersion } = require('./utils');
const {
  AuthRoutes,
  UsersRoutes,
} = require('./routes');
const { errorHandler, auth } = require('./middlewares');
const onSocketConnection     = require('./socket-handlers');

const app = express();

mongoose.connect( MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( () => {
  console.log( 'Connected to Database!' );
}).catch( error => {
  console.error( 'Could not connect to Database' );
  console.error( 'Error: ', error );
});

app.use( BASE_URI.concat( '/uploads' ), express.static( __dirname.concat( '/uploads' )));

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( cors() );

require( './passport' );
app.use( passport.initialize() );

app.get( '/', ( req, res ) => res.status(200).send('Hello from Node.js server :)') );

app.use(( req, res, next ) => setTimeout(() => next(), 900 ));
app.use( BASE_URI.concat( '/auth' ), AuthRoutes );
app.use( BASE_URI.concat( '/users' ), UsersRoutes );

/**
 * Using a global error handler to catch all types of errors.
 * And trying to find out which error message to send back to the Response!
 */
app.use( errorHandler );

app.get( '/*', ( req, res ) => res.redirect('/') );

const httpServer = http.createServer( app );
const io = new Server( httpServer, { cors: true });

const wrap = middleware => ( socket, next ) => middleware( socket.request, {}, next );

io.use( wrap( passport.initialize() ));
io.use( wrap( auth ));

io.on('connection', onSocketConnection( io ));

httpServer.listen( PORT, () => console.log( `Server(v${ appVersion }) is running at port: ${ PORT }` ));
