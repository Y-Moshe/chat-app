import { Server, Socket } from 'socket.io';

import { User } from '../models';

export default function setUserAvailability( io: Server, socket: Socket,
    availability: 'Online' | 'Offline' ) {
  if ( availability === 'Online' ) {

  } else if ( availability === 'Offline' ) {

  }
};
