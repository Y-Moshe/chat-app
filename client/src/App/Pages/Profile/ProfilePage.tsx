import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams, NavLink, Route } from 'react-router-dom';
import {
  Grid, Box,
  SxProps, Theme,
  Button, Link, Typography, CircularProgress,
  Grow
} from '@mui/material';

import PrivateChat from './PrivateChat/PrivateChat';
import { UserData } from '../../Types';
import { ProgressImage } from '../../Components';

const profileBoxStyle: SxProps<Theme> = {
  margin: 'auto',
  borderRadius: 2,
  background: 'rgba(0, 0, 0, 0.4)',
  boxShadow: '0 0 8px black',
  color: 'white',
  transitionDuration: '500ms'
};

export function ProfilePage() {
  const { pathname } = useLocation();
  const { username } = useParams<any>();
  const [ userData, setUserData ]   = useState<UserData>();
  const [ isLoading, setIsLoading ] = useState( true );
  const isChatRenderd = useMemo(() => pathname.includes('chat'), [ pathname ]);
  const baseUrl = '/profile/' + username;  
  console.log(isChatRenderd);

  useEffect(() => {
    // RETRIVE USER DATA
    setTimeout(() => setUserData({
      username: 'Y_Moshe',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg',
      creationDate: new Date()
    }), 1000)
  }, []);

  return (
    <Grid container flexGrow = "1">
      <Box sx = {{
          ...profileBoxStyle,
          minWidth:  isChatRenderd ? 0.5 : 230,
          height:    isChatRenderd ? 'auto' : 230,
          maxHeight: isChatRenderd ? 0.7 : 0.5
        }}>
        {
          // Loading Spinner
          userData === undefined ?
          <Grid container height={ 1 }>
            <Grow in children = { <CircularProgress sx = {{ m: 'auto' }} /> } />
          </Grid> :
          <Grid container padding = { 2 }>
            <Grow in>
              <Grid xs = { isChatRenderd ? 4 : 12 } item>
                <Typography component = "h3" marginBottom = { 1 }>{ userData?.username }</Typography>
                {/* Profile Image */}
                <Grid container>
                  <ProgressImage
                    src    = { userData?.profileImage }
                    alt    = { userData?.username }
                    imageStyle = {{ maxWidth: 100 }}
                  />
                </Grid>
                <Typography padding = { 0.5 }>Creation Date: { userData?.creationDate.toLocaleDateString('en-UK') }</Typography>
                {/* Chat Button */}
                <Link component = { NavLink } to = { baseUrl + '/chat' }>
                  <Button fullWidth
                    variant  = "contained"
                    disabled = { isChatRenderd }>
                    Chat
                  </Button>
                </Link>
              </Grid>
            </Grow>
            {/* Collapsable private chat */}
            <Grid xs = { isChatRenderd ? 8 : 0 } item>
              <Route path = { baseUrl + '/chat' } component = { PrivateChat } />
            </Grid>
          </Grid>
        }
      </Box>
    </Grid>
  )
}
