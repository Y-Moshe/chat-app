import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar, Grid, Button,
  Toolbar, Box, Link,
  PaletteMode
} from '@mui/material';
import * as Icons from '@mui/icons-material';

import Logo from './Logo';
import DarkModeBtn from './DarkModeBtn';
import ProfileBtn from './ProfileBtn';
import { useAuth } from '../../../Hooks';
import { AuthService } from '../../../Services';

interface HeaderProps {
  themeMode: PaletteMode;
  setThemeMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
}

export function Header( props: HeaderProps ) {
  const { isAuth, username, profileImage, setAuthData } = useAuth();

  const handleLogout = () => {
    AuthService.logout();
    setAuthData( undefined );
  };

  return (
    <AppBar position = { 'static' }>
      <Toolbar>
        {/* App Logo */}
        <Logo />

        {/* Push Auth links to right */}
        <Grid flexGrow = { 1 } />

        {/* Dark Mode Switch */}
        <DarkModeBtn
          themeMode    = { props.themeMode }
          setThemeMode = { props.setThemeMode }
        />

        {/* Auth Links */}
        <Box>
          {
            isAuth ?
            <ProfileBtn
              username     = { username as string }
              profileImage = { profileImage as string }
              onLogout     = { handleLogout }
            /> :
            <Link component = { NavLink } to = { '/auth' }>
              <Button
                endIcon = { <Icons.AccountBox /> }
                color   = { 'primary' }
                sx      = {{ color: 'white' }}>
                Log-In / Sign-Up
              </Button>
            </Link>
          }
        </Box>
      </Toolbar>
    </AppBar>
  )
}
