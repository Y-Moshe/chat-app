import { useContext } from 'react';

import { SocketIOContext } from '../App';

export function useSocket() {
  return useContext( SocketIOContext );
}
