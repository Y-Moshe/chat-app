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
import {
  Lock,
  AccountBox,
  Menu as MenuIcon,
  AccountCircle
} from '@mui/icons-material';

import DarkModeBtn from './DarkModeBtn';
import Logo from './Logo';
import { useAuth } from '../../../Hooks';

interface HeaderProps {
  themeMode: PaletteMode;
  setThemeMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
}

export function Header( props: HeaderProps ) {
  const [ isMenuOpen, setIsMenuOpen ] = useState( false );
  const { pathname } = useLocation();
  const { isAuth } = useAuth();

  const authLinks = useMemo(() => {
    let authLinks = [
      {
        label: 'Log-In',
        href: '/auth/login',
        icon: <Lock />
      },
      {
        label: 'Sign-Up',
        href: '/auth/signup',
        icon: <AccountBox />
      }
    ];
  
    if ( isAuth ) {
      authLinks = [
        {
          label: 'UserName',
          href: '/profile/userName',
          icon: <AccountCircle />
        }
      ];
    }

    return authLinks;
  }, [ isAuth ]);

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
        {/* Responsive IconButton Menu */}
        <IconButton
          sx      = {{ display: { sm: 'none' }}}
          size    = "large"
          edge    = "start"
          onClick = { () => setIsMenuOpen( prev => !prev ) }>
          <MenuIcon htmlColor = "white" />
        </IconButton>

        {/* Push Desktop Auth links to right */}
        <Box sx = {{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}} />
        <Box sx = {{ display: { xs: 'none', sm: 'block' }}}>
          {/* Dark mode switch */}
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
