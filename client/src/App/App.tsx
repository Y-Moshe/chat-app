import { useEffect, useState, useMemo, createContext, Suspense } from 'react';
import { Grid, createTheme, ThemeProvider, PaletteMode } from '@mui/material';

import { ErrorBoundary, SuspenseFallBack, Header, Footer } from './Components';
import { AuthData, AuthContextType } from './Types';
import { AppRouting } from './AppRouting';
import { AuthService } from './Services';

export const AuthContext = createContext<AuthContextType>({
  authData: undefined,
  setAuthData: ( value: React.SetStateAction<AuthData | undefined> ) => undefined
});

export default function App() {
  const [ authData, setAuthData ] = useState<AuthData>();
  const [ themeMode, setThemeMode ] = useState<PaletteMode>( 'light' );

  const theme = useMemo(() => createTheme({
    palette: { mode: themeMode }
  }), [ themeMode ]);

  useEffect(() => {
    AuthService.loadUserData()
      .then( userData => {
        if ( userData ) {
          setAuthData( userData );
          AuthService.setAutoLogoutTimer( userData.token.exp, () => setAuthData( undefined ));
        }
      })
      .catch( e => console.log( e ));
  }, []);

  return (
    <ThemeProvider theme = { theme }>
      <Grid
        container
        direction = "column"
        minHeight = "100vh">
        <AuthContext.Provider value = {{ authData, setAuthData }}>
          <Header
            themeMode    = { themeMode }
            setThemeMode = { setThemeMode }
          />

          <ErrorBoundary>
            <Suspense fallback = { <SuspenseFallBack /> }>
              <AppRouting />
            </Suspense>
          </ErrorBoundary>
        </AuthContext.Provider>
        <Footer />
      </Grid>
    </ThemeProvider>
  );
}
