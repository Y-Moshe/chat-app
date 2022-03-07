import React from 'react';

import { ErrorPage } from '../../../Pages';

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError( error: any ) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch( error: any, errorInfo: any ) {
    console.log( error );
    console.log( errorInfo );
  }

  render() {
    if ( this.state.hasError ) {
      return (
        <ErrorPage
          name    = "SERVICE UNAVAILABLE"
          code    = { 503 }
          message = "Sorry, something went wrong!"
        />
      );
    }

    return this.props.children; 
  }
}
