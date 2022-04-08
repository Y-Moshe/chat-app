import axios from '../Axios';
import { AuthData, AuthResponse, VerifyTokenResponse } from '../Types';

const BASE_API = '/auth';
let authTimeoutId: any;

const login = ( username: string, password: string ) => {
  return axios.post<AuthResponse>( BASE_API.concat( '/login' ), {
    username,
    password
  });
};

/**
 * Logged out the user by removes token and clear timeout for the autologout("setAutoLogoutTimer")
 */
const logout = () => {
  window.localStorage.removeItem( 'token' );
  authTimeoutId && clearTimeout( authTimeoutId );
};

const signup = (
  username: string,
  password: string,
  profileImage?: File
) => {
  const formData = new FormData();
  formData.set( 'username', username );
  formData.set( 'password', password );
  profileImage && formData.set( 'profileImage', profileImage );

  return axios.post<AuthResponse>( BASE_API.concat( '/signup' ), formData );
};

const verifyToken = ( token: string ) =>
  axios.post<VerifyTokenResponse>( BASE_API.concat( '/verify-token' ), { token });

const loadUserData = async () => {
  const token = window.localStorage.getItem( 'token' );
  if ( token ) {
    try {
      const user = await verifyToken( token );
      const authData: AuthData = {
        ...user.data.data,
        token: {
          string: token,
          iat: user.data.iat,
          exp: user.data.exp
        }
      };
      return authData;
    } catch ( e ) {
      // incase of invalid token or expired
      window.localStorage.removeItem( 'token' );
      return null;
    }
  }

  return null;
}

/**
 * Sets auto-logout timer when the token is invalid and expired!
 * @param exp expiration time returns from the server response
 * @param callback The callback function executes when time expired, for example: like reset auth state.
 * @returns the timeout id number, which can be used to clear the timeout.
 */
const setAutoLogoutTimer = ( exp: number, callback: () => void ) => {
  const expireIn = exp * 1000 - new Date().getTime();

  authTimeoutId = setTimeout(() => {
    logout();
    callback();
  }, expireIn );

  return authTimeoutId;
};

export {
  login,
  signup,
  loadUserData,
  logout,
  setAutoLogoutTimer
};
