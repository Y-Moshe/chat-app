import { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Alert, Grid, Grow, Theme, Typography, LinearProgress } from '@mui/material';

import { ProgressImage } from '../Components';
import FormInputs from './FormInputs/FormInputs';
import { AuthFormSchema } from '../Types';
import { AuthService } from '../Services';
import { AxiosError } from 'axios';
import { useAuth } from '../Hooks';

const loginBoxStyle = ( theme: Theme ): any => ({
  margin: 'auto',
  padding: 2,
  borderRadius: 3,
  width: 0.6,
  background: `rgba(0, 0, 0, ${ theme.palette.mode === 'light' ? 0.1 : 0.35 })`,
  boxShadow: '0 0 10px black',
  minWidth: 300,
  maxWidth: 1000
});

interface AuthPageProps extends RouteComponentProps {}

export default function AuthPage( props: AuthPageProps ) {
  const [ isSubmitting, setIsSubmitting ] = useState( false );
  const [ errorMessage, setErrorMessage ] = useState( '' );
  const { isAuth, username, setAuthData } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if ( isAuth ) {
      setTimeout(() => history.push( '/profile/' +  username ), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isAuth ]);

  const handleLoginRequest = ( data: AuthFormSchema ) => {
    const { username, password } = data;

    setIsSubmitting( true );
    AuthService.login( username, password )
      .then( res => {
        setAuthData({
          ...res.data.user,
          token: res.data.token
        });
      }).catch(( e: AxiosError ) => setErrorMessage( e.message ));
  };
  
  const handleSignupRequest = ( data: AuthFormSchema ) => {
    const { username, password, profileImage } = data;

    setIsSubmitting( true );
    AuthService.signup( username, password, profileImage )
      .then( res => {
        setAuthData({
          ...res.data.user,
          token: res.data.token
        });
      }).catch(( e: AxiosError ) => setErrorMessage( e.message ));
  };

  return (
    <Grid container
      flexGrow = { 1 }
      width    = { 1 }
      sx       = {{ background: 'linear-gradient(to right,rgba(247,84,9,.788),rgba(204,82,241,.678))' }}>
      <Grid container sx = { loginBoxStyle }>
        <ProgressImage
          src = "https://angular-dummy-project.herokuapp.com/assets/images/login-logo.png"
          alt = "Auth Logo"
          imageStyle = {{ borderRadius: '50%', boxShadow: '0 0 10px white', maxWidth: 1 }}
        />

        <Grid xs = { 12 } md = { 5.5 } item>
          <FormInputs
            setFocusOnUsername
            isSubmitting = { isSubmitting }
            onSubmit = { handleLoginRequest }
          />
        </Grid>
        <Grid md = { 1 } width = { 1 } item>
          <Grid container item height = { 1 }>
            <Typography margin = "auto">-Or-</Typography>
          </Grid>
        </Grid>
        <Grid xs = { 12 } md = { 5.5 } item>
          <FormInputs
            isSignupForm
            isSubmitting = { isSubmitting }
            onSubmit = { handleSignupRequest }
          />
        </Grid>
        <Grow in = { Boolean ( errorMessage ) }>
          <Grid xs = { 12 } paddingTop = { 1 } container item>
            <Alert severity = "warning" sx = {{ width: 0.5, m: 'auto' }}>{ errorMessage }</Alert>
          </Grid>
        </Grow>
        <Grow in = { isSubmitting }>
          <Grid xs = { 12 } margin = { 0.3 } item>
            <LinearProgress />
          </Grid>
        </Grow>
      </Grid>
    </Grid>
  )
}
