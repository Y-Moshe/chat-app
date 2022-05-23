/**
 * Simple CustomError to be used in error-hanlder middlewere, and in general, for all app.
 */
export default class CustomError extends Error {
  status: number;

  constructor( message = '', status = 500 )  {
      super( message );
      
      this.status = status;
      this.name = 'CustomError';
  }
}
