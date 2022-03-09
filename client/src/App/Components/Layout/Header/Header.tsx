import React, { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Box,
  Link,
  Collapse,
  PaletteMode
} from '@mui/material';
import * as Icons from '@mui/icons-material';

import { useAuth } from '../../../Hooks';
import DarkModeBtn from './DarkModeBtn';
import Logo from './Logo';

interface HeaderProps {
  themeMode: PaletteMode;
  setThemeMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
}

export function Header( props: HeaderProps ) {
  const [ isMenuOpen, setIsMenuOpen ] = useState( false );
  const { pathname } = useLocation();
  const { isAuth, username } = useAuth();

  const authLinks = useMemo(() => {
    let authLinks = [
      {
        label: 'Log-In / Sign-Up',
        href: '/auth',
        icon: <Icons.AccountBox />
      }
    ];
  
    if ( isAuth && username ) {
      authLinks = [
        {
          label: username,
          href: `/profile/${ username }`,
          icon: <Icons.AccountCircle />
        }
      ];
    }

    return authLinks;
  }, [ isAuth, username ]);

  return (
    <AppBar position = "static">
      <Toolbar>
        {/* App Logo */}
        <Logo />
        {/* Responsivly Collapsable content */}
        <Collapse
          in = { isMenuOpen }
          sx = {{ width: 1, flexGrow: 1, display: { sm: 'none' }}}>
          {/* Mobile Auth Links */}
          <Box sx = {{ m: 1 }}>
            {
              authLinks.map( link => (
                <Link
                  key       = { link.label }
                  component = { NavLink }
                  to        = { link.href }>
                  <Button
                    endIcon = { link.icon }
                    color   = "primary"
                    sx      = {{ color: pathname === link.href ? 'red' : 'white', justifyContent: 'space-between' }}
                    fullWidth>
                      { link.label }
                  </Button>
                </Link>
              ))
            }
          </Box>
        </Collapse>
        {/* Dark Mode Switch */}
        <DarkModeBtn
          sx           = {{ display: { sm: 'none' }}}
          themeMode    = { props.themeMode }
          setThemeMode = { props.setThemeMode }
        />
        {/* Responsive Menu IconButton */}
        <IconButton
          sx      = {{ display: { sm: 'none' }}}
          size    = "large"
          edge    = "start"
          onClick = { () => setIsMenuOpen( prev => !prev ) }>
          <Icons.Menu htmlColor = "white" />
        </IconButton>

        {/* Push Desktop Auth links to right */}
        <Box sx = {{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}} />
        <Box sx = {{ display: { xs: 'none', sm: 'block' }}}>
          {/* Dark Mode Switch */}
          <DarkModeBtn
            themeMode    = { props.themeMode }
            setThemeMode = { props.setThemeMode }
          />
          {/* Desktop Auth Links */}
          {
            authLinks.map( link => (
              <Link
                key         = { link.label }
                component   = { NavLink }
                to          = { link.href }>
                <Button
                  sx      = {{ color: pathname === link.href ? 'red' : 'white' }}
                  endIcon = { link.icon }
                  color   = "primary">
                    { link.label }
                </Button>
              </Link>
            ))
          }
        </Box>
      </Toolbar>
    </AppBar>
  )
}
