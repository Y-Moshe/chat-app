import express, { NextFunction } from 'express';
import { Server, Socket }        from 'socket.io';
import passport   from 'passport';
import mongoose   from 'mongoose';
import cors       from 'cors';
import http       from 'http';
import dotenv     from 'dotenv';
dotenv.config();

import onSocketConnection from './socket-handlers';
import { DB_CONNECTION_STRING, PORT } from './config';
import { AuthRoutes, UsersRoutes }    from './routes';
import { errorHandler, auth }         from './middlewares';
import { BASE_URI, APP_VERSION }      from './utils';

const app = express();

mongoose.connect( DB_CONNECTION_STRING )
  .then( () => {
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
const io = new Server( httpServer, {
  cors: {
    origin: '*',
    allowedHeaders: '*',
    methods: '*'
  }
});

const wrap = ( middleware: any ) => ( socket: Socket, next: NextFunction ) => middleware( socket.request, {}, next );

io.use( wrap( passport.initialize() ));
io.use( wrap( auth ));

io.on('connection', onSocketConnection( io ));

httpServer.listen( PORT, () => console.log( `Server(v${ APP_VERSION }) is running at port: ${ PORT }` ));
