import { Suspense, useState, createContext } from 'react';
import { Grid } from '@mui/material';

import { ErrorBoundary, SuspenseFallBack, Header, Footer } from './Components';
import { AuthData, AuthContextType } from './Types';
import { AppRouting } from './AppRouting';

export const AuthContext = createContext<AuthContextType>({
  authData: undefined,
  setAuthData: ( value: React.SetStateAction<AuthData | undefined> ) => undefined
});

export default function App() {
  const [ authData, setAuthData ] = useState<AuthData>();

  return (
    <Grid
      container
      direction = "column"
      minHeight = "100vh">
      <AuthContext.Provider value = {{ authData, setAuthData }}>
        <Header />

        <ErrorBoundary>
          <Suspense fallback = { <SuspenseFallBack /> }>
            <AppRouting />
          </Suspense>
        </ErrorBoundary>
      </AuthContext.Provider>
      <Footer />
    </Grid>
  );
}
