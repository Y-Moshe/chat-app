import { io } from 'socket.io-client';

const CONNECTION_STRING = process.env.REACT_APP_API_SOCKET_IO;

export const connectIO = ( token: string ) => io( CONNECTION_STRING, {
  auth: { token },
  extraHeaders: {
    'Authorization': 'Bearer ' + token
  }
});
