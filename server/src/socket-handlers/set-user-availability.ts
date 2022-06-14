import { Server, Socket } from 'socket.io';

import { User } from '../models';
import { ChatEvents } from './chat-events';

export default function setUserAvailability( io: Server, socket: Socket,
    availability: 'Online' | 'Offline' ) {
  const isOnline = availability === 'Online' ? true : false;
  // @ts-ignore
  const userData = socket.request.user.data;
  delete userData.isOnline;
  delete userData.__v;
  const messageObj = {
    type: 'system',
    user: userData,
    message: `${ userData.username } ${ isOnline ? 'is Connected' : 'Disconnected' }!`
  };

  User.updateOne({ _id: userData._id }, { isOnline })
    .then(() => io.emit( ChatEvents.userConnected, messageObj ))
    .catch( e => console.log( e ));
};
