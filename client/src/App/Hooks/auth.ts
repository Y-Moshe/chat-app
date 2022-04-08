import { useContext, useEffect } from 'react';

import { AuthContext } from '../App';

export function useAuth() {
  const { authData, setAuthData } = useContext( AuthContext );

  useEffect(() => {
    if ( authData && authData.token ) {
      window.localStorage.setItem( 'token', authData.token.string );
    }
  }, [ authData ]);

  return {
    isAuth: authData !== undefined,
    ...authData,
    setAuthData
  };
}
