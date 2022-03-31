import { AxiosError } from 'axios';
import { ErrorPage } from '../Pages';

export const unAuthorizedError = () => {
  return (
    <ErrorPage
      name     = "UNAUTHORIZED"
      code     = { 401 }
      message  = "You're not allowed to visit this route!"
      redirect = {{
        in: 1500,
        to: '/'
      }}
    />
  );
};

export const notFoundError = () => {
  return (
    <ErrorPage
      name    = "NOT FOUND"
      code    = { 404 }
      message = "Sorry, we couldn't find the page you were looking for :("
    />
  );
};

/**
 * Get a readable error message from AxiosError.
 * @param e Axios Response error object
 * @returns readable meesage
 */
export const getErrorMessage = ( e: AxiosError ) => {
  let msg = e.message;
  if ( e.response?.data?.message ) {
    msg = e.response.data.message;
  }

  return msg;
};
