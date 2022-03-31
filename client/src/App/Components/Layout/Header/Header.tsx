import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar, Grid, Button,
  Toolbar, Box, Link,
  PaletteMode, Badge, Avatar,
  Tooltip, Menu, MenuItem,
  Divider
} from '@mui/material';
import * as Icons from '@mui/icons-material';

import { useAuth } from '../../../Hooks';
import DarkModeBtn from './DarkModeBtn';
import Logo from './Logo';
import { AuthService } from '../../../Services';

interface HeaderProps {
  themeMode: PaletteMode;
  setThemeMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
}

export function Header( props: HeaderProps ) {
  const [ avatarAnchorEl, setAvatarAnchorEl ] = useState<HTMLDivElement | null>( null );
  const isProfileMenuOpen = Boolean( avatarAnchorEl );
  const { isAuth, username, profileImage, setAuthData } = useAuth();

  const handleLogout = () => {
    AuthService.logout();
    setAuthData( undefined );
    setAvatarAnchorEl( null )
  };

  return (
    <AppBar position = "static">
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
            <Badge
              overlap      = { 'circular' }
              anchorOrigin = {{ vertical: 'bottom', horizontal: 'right' }}
              variant      = { 'dot' }>
              <Tooltip title = { username as string }>
                <Avatar
                  alt = { username }
                  src = { profileImage }
                  onClick = { e => setAvatarAnchorEl( e.currentTarget ) }
                />
              </Tooltip>
            </Badge> :
            <Link component = { NavLink } to = { '/auth' }>
              <Button
                endIcon = { <Icons.AccountBox /> }
                color   = "primary"
                sx = {{ color: 'white' }}>
                Log-In / Sign-Up
              </Button>
            </Link>
          }
        </Box>
        <Menu
          open     = { isProfileMenuOpen }
          anchorEl = { avatarAnchorEl }
          onClose  = { () => setAvatarAnchorEl( null ) }>
          <Link component = { NavLink } to = { '/profile/' + username }>
            <MenuItem>
              Profile
            </MenuItem>
          </Link>
          <Divider />
          <MenuItem>
            <Button
              color   = { 'error' }
              variant = { 'contained' }
              size    = { 'small' }
              endIcon = { <Icons.Logout /> }
              onClick = { handleLogout }>
                Log-Out
            </Button>   
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
