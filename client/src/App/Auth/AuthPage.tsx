import { RouteComponentProps } from 'react-router-dom';
import { Grid, Theme, Typography } from '@mui/material';

import { ProgressImage } from '../Components';
import FormInputs from './FormInputs/FormInputs';

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
  const handleLoginRequest = ( data: any ) => {
    console.log(data);
  };
  
  const handleSignupRequest = ( data: any ) => {
    console.log(data);
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
            onSubmit = { handleLoginRequest }
          />
        </Grid>
        <Grid md = { 1 } item width = { 1 }>
          <Grid container item height = { 1 }>
            <Typography margin = "auto">-Or-</Typography>
          </Grid>
        </Grid>
        <Grid xs = { 12 } md = { 5.5 } item>
          <FormInputs
            isSignupForm
            onSubmit = { handleSignupRequest }
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
