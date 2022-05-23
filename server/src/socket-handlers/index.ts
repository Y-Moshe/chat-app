import { Server, Socket } from 'socket.io';

import registerSetUserAvailability from './set-user-availability';

export default function( io: Server ) {
  return ( socket: Socket ) => {
    registerSetUserAvailability( io, socket, 'Online' );
    socket.on( 'disconnect', reason => registerSetUserAvailability( io, socket, 'Offline' ));
    
    console.log('Connection Made!');
  }
}
