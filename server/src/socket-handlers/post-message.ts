import { Server, Socket } from 'socket.io';

import { ChatEvents } from './chat-events';

export default function postMessage( io: Server, socket: Socket, msg: any ) {
  io.emit( ChatEvents.messagePosted, msg )
};
