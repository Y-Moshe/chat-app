import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

instance.interceptors.request.use( req => {
  const token = window.localStorage.getItem( 'token' );

  if ( token ) {
    req.headers = {
      ...req.headers,
      Authorization: 'Bearer ' + token
    };
  }

  return req;
});

export default instance;
