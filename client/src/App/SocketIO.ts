import { io } from 'socket.io-client';

const CONNECTION_STRING = process.env.REACT_APP_API_SOCKET_IO;

export const connectIO = ( token: string ) => io( CONNECTION_STRING, {
  extraHeaders: {
    'Authorization': 'Bearer ' + token
  }
});

export enum ChatEvents {
  userConnected = 'userConnected',
  postMessage   = 'postMessage',
  messagePosted = 'messagePosted'
}
