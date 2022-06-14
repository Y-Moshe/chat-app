import { Server, Socket } from 'socket.io';

import { ChatEvents } from './chat-events';
import registerSetUserAvailability from './set-user-availability';
import registerPostMessage from './post-message';

export default function( io: Server ) {
  return ( socket: Socket ) => {
    // User events
    registerSetUserAvailability( io, socket, 'Online' );
    socket.on( 'disconnect', () => registerSetUserAvailability( io, socket, 'Offline' ));

    // Chat events
    socket.on( ChatEvents.postMessage, message => registerPostMessage( io, socket, message ));
  }
}
