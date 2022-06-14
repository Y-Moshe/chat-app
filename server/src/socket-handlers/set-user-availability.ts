import { Server, Socket } from 'socket.io';

import { User } from '../models';
import { ChatEvents } from './chat-events';

export default function setUserAvailability( io: Server, socket: Socket,
    availability: 'Online' | 'Offline' ) {
  const isOnline = availability === 'Online' ? true : false;
  // @ts-ignore
  const userId = socket.request.user.data._id;

  User.updateOne({ _id: userId }, { isOnline })
    .then(() => io.emit( ChatEvents.userConnected ))
    .catch( e => console.log( e ));
};
