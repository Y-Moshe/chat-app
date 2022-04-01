import { useState } from 'react';
import { NavLink }  from 'react-router-dom';
import {
  Avatar, Badge, Box,
  Button, Divider, Link,
  Menu, ListItem, styled,
  Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import * as Icons from '@mui/icons-material';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

interface ProfileBtnProps {
  username: string;
  profileImage: string;
  onLogout: () => void;
}

export default function ProfileBtn( props: ProfileBtnProps ) {
  const [ isDialogOpen, setIsDialogOpen ]     = useState( false );
  const [ avatarAnchorEl, setAvatarAnchorEl ] = useState<HTMLDivElement | null>( null );
  const isProfileMenuOpen = Boolean( avatarAnchorEl );

  return (
    <Box>
      <Tooltip title = { props.username }>
        <StyledBadge
          overlap      = { 'circular' }
          anchorOrigin = {{ vertical: 'bottom', horizontal: 'right' }}
          variant      = { 'dot' }>
          <Avatar
            sx = {{ cursor: 'pointer' }}
            alt = { props.username }
            src = { props.profileImage }
            onClick = { e => setAvatarAnchorEl( e.currentTarget ) }
          />
        </StyledBadge>
      </Tooltip>
      <Menu
        open     = { isProfileMenuOpen }
        anchorEl = { avatarAnchorEl }
        onClose  = { () => setAvatarAnchorEl( null ) }>
        <Link component = { NavLink } to = { '/profile/' + props.username }>
          <ListItem>
            Account
          </ListItem>
        </Link>
        <Divider />
        <ListItem>
          <Button
            color   = { 'error' }
            variant = { 'contained' }
            size    = { 'small' }
            endIcon = { <Icons.Logout /> }
            onClick = { () => setIsDialogOpen( true ) }>
              Log-Out
          </Button>   
        </ListItem>
      </Menu>
      <Dialog
        open    = { isDialogOpen }
        onClose = { () => setIsDialogOpen( false ) }>
        <DialogTitle>Log-Out</DialogTitle>
        <DialogContent>Are your sure you want to logout?</DialogContent>
        <Divider />

        <DialogActions>
          <Button onClick = { () => setIsDialogOpen( false ) }>Cancel</Button>
          <Button onClick = { props.onLogout } color = { 'error' }>Log-Out</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
