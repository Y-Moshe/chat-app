import React from 'react';
import { Grow, IconButton, PaletteMode } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface DarkModeBtnProps {
  themeMode: PaletteMode;
  setThemeMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
}

export default function DarkModeBtn( props: DarkModeBtnProps ) {
  const handleThemeModeChange = () => {
    const { themeMode, setThemeMode } = props;
    setThemeMode( themeMode === 'light' ? 'dark' : 'light' );
  };

  return (
    <IconButton onClick = { handleThemeModeChange }>
      {/* Dark mode switch */}
      {
        props.themeMode === 'light' &&
        <Grow in timeout = {{ enter: 500 }}>
          <Brightness4 htmlColor = "black" />
        </Grow>
      }
      {
        props.themeMode === 'dark' &&
        <Grow in timeout = {{ enter: 500 }}>
          <Brightness7 htmlColor = "orange" />
        </Grow>
      }
    </IconButton>
  )
}
