import { NavLink } from 'react-router-dom';
import { IconButton, Link } from '@mui/material';
import { Forum } from '@mui/icons-material';

export default function Logo() {
  return (
    <Link component = { NavLink } to = "/">
      <IconButton
        sx    = {{ mr: 2 }}
        size  = "large"
        edge  = "start"
        color = "warning">
        <Forum htmlColor = "white" />
      </IconButton>
    </Link>
  )
}
