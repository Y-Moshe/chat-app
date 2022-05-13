import { useEffect, useState, useMemo, createContext, Suspense } from 'react';
import { Grid, createTheme, ThemeProvider, PaletteMode } from '@mui/material';
import { Socket } from 'socket.io-client';

import { ErrorBoundary, SuspenseFallBack, Header, Footer } from './Components';
import { AuthData, AuthContextType } from './Types';
import { AppRouting } from './AppRouting';
import { AuthService } from './Services';
import { connectIO } from './SocketIO';

export const AuthContext = createContext<AuthContextType>({
  authData: undefined,
  setAuthData: ( value: React.SetStateAction<AuthData | undefined> ) => undefined
});

export const SocketIOContext = createContext<Socket | undefined>( undefined );

export default function App() {
  const [ themeMode, setThemeMode ] = useState<PaletteMode>( 'light' );
  const [ authData, setAuthData ]   = useState<AuthData>();
  const [ socket, setSocketIO ]     = useState<Socket>();

  const theme = useMemo(() => createTheme({
    palette: { mode: themeMode }
  }), [ themeMode ]);

  // Handling automatic user login
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

  // Handling SocketIO Connection
  useEffect(() => {
    // open socket connection when user logged in at first and re-login
    if ( authData ) {
      if ( !socket || ( socket && socket.disconnected )) {
        setSocketIO( connectIO( authData.token.string ));
      }
    }

    // close SocketIO Connection on logout
    if ( socket && !authData ) {
      socket.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ authData ]);

  return (
    <ThemeProvider theme = { theme }>
      <Grid container
        direction = "column"
        minHeight = "100vh">
        <AuthContext.Provider value = {{ authData, setAuthData }}>
          <SocketIOContext.Provider value = { socket }>
            <Header themeMode = { themeMode } setThemeMode = { setThemeMode } />

            <ErrorBoundary>
              <Suspense fallback = { <SuspenseFallBack /> }>
                <AppRouting />
              </Suspense>
            </ErrorBoundary>
          </SocketIOContext.Provider>
        </AuthContext.Provider>
        <Footer />
      </Grid>
    </ThemeProvider>
  );
}
