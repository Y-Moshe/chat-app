import axios from '../Axios';
import { AuthResponse, VerifyTokenResponse } from '../Types';

const BASE_API = '/auth';

const login = ( username: string, password: string ) => {
  return axios.post<AuthResponse>( BASE_API.concat( '/login' ), {
    username,
    password
  });
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
      return user.data.data;
    } catch ( e ) {
      // incase of invalid token or expired
      window.localStorage.removeItem( 'token' );
      return null;
    }
  }

  return null;
}

export {
  login,
  signup,
  loadUserData
};
