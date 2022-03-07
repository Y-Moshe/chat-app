import { useContext } from 'react';

import { AuthContext } from '../App';

export function useAuth() {
  const { authData, setAuthData } = useContext( AuthContext );

  return {
    isAuth: authData !== undefined,
    ...authData,
    setAuthData
  };
}
