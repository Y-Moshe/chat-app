import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid, Box,
  SxProps, Theme,
  Button, Typography, CircularProgress,
  Grow
} from '@mui/material';

import PrivateChat from './PrivateChat/PrivateChat';
import { ProgressImage } from '../../Components';
import { UsersService } from '../../Services';
import { UserData } from '../../Types';
import { useAuth } from '../../Hooks';

const profileBoxStyle: SxProps<Theme> = {
  margin: 'auto',
  borderRadius: 2,
  background: 'rgba(0, 0, 0, 0.4)',
  boxShadow: '0 0 8px black',
  color: 'white',
  transitionDuration: '500ms'
};

export function ProfilePage() {
  const { username } = useParams<any>();
  const [ userData, setUserData ]     = useState<UserData>();
  const [ isLoading, setIsLoading ]   = useState( true );
  const [ isChatOpen, setIsChatOpen ] = useState( false );
  const authData = useAuth();

  useEffect(() => {
    if ( authData.isAuth && authData.username === username ) {
      setUserData({
        _id: authData._id as string,
        username: authData.username as string,
        profileImage: authData.profileImage as string,
        creationDate: authData.creationDate as string
      });
      setIsLoading( false )
    } else {
      UsersService.getUser( username )
        .then( res => setUserData( res.data ))
        .catch( e => console.log( e ))
      .finally(() => setIsLoading( false ));
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  return (
    <Grid container flexGrow = "1">
      <Box sx = {{
          ...profileBoxStyle,
          minWidth:  isChatOpen ? 0.5 : 230,
          height:    isChatOpen ? 'auto' : 230,
          maxHeight: isChatOpen ? 0.7 : 0.5
        }}>
        {
          // Loading Spinner
          isLoading ?
          <Grid container height={ 1 }>
            <Grow in children = { <CircularProgress sx = {{ m: 'auto' }} /> } />
          </Grid> :
          <Grid container padding = { 2 }>
            <Grow in>
              <Grid xs = { isChatOpen ? 4 : 12 } item>
                <Typography component = "h3" marginBottom = { 1 }>{ userData?.username }</Typography>
                {/* Profile Image */}
                <Grid container>
                  <ProgressImage
                    src    = { userData?.profileImage as string }
                    alt    = { userData?.username as string }
                    imageStyle = {{ maxWidth: 100 }}
                  />
                </Grid>
                <Typography padding = { 0.5 }>Creation Date: { new Date( userData?.creationDate as string ).toLocaleDateString('en-UK') }</Typography>
                {/* Chat Button */}
                <Button fullWidth
                  variant  = "contained"
                  onClick  = { () => setIsChatOpen( true ) }
                  disabled = { isChatOpen }>
                    Chat
                </Button>
              </Grid>
            </Grow>
            {
              isChatOpen &&
              <Grid xs = { 8 } item>
                <PrivateChat />
              </Grid>
            }
          </Grid>
        }
      </Box>
    </Grid>
  )
}
