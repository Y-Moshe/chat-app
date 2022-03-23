import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  Grid
} from '@mui/material';
import * as Icons from '@mui/icons-material';

import ProfileImageInput from './ProfileImageInput';
import { AuthFormSchema } from '../../Types';

const ALLOWED_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];

const validateImageType = ( file: File ) => !file || ( file && ALLOWED_MIME_TYPE.includes( file.type ));
const validateImageSize = ( file: File ) => !file || ( file && file.size < 2097152 );

const validationSchema = yup.object({
  username:     yup.string().required().min(3).max(23),
  password:     yup.string().required().min(6),
  profileImage: yup.mixed()
  .test( 'is-valid-type', 'Invalid file, please pick an image! jpg, jpeg or png!', validateImageType )
  .test( 'is-valid-size', 'The profile image is too big, Max 2MB!', validateImageSize )
});

interface FormInputsProps {
  isSignupForm?: boolean;
  setFocusOnUsername?: boolean;
  isSubmitting: boolean;
  onSubmit: ( data: AuthFormSchema ) => void;
}

export default function FormInputs( props: FormInputsProps ) {
  const [ showPassword, setShowPassword ] = useState( false );

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isValid,
      touchedFields
    }
  } = useForm<AuthFormSchema>({
    resolver: yupResolver( validationSchema ),
    mode: 'all'
  });

  const userNameRef = useRef<HTMLInputElement>( null );

  useEffect(() => {
    setTimeout( () => props.setFocusOnUsername && userNameRef?.current?.focus(), 500 );
  }, [ props.setFocusOnUsername ]);

  return (
    <Grid container
      component = "form"
      direction = "column"
      height = { 1 }
      onSubmit  = { handleSubmit( props.onSubmit ) }>
      <Typography component = "h3">{ props.isSignupForm ? 'Sign-Up' : 'Log-In' }</Typography>
      <TextField
        InputProps = {{
          startAdornment: (
            <InputAdornment position = "start">
              <Icons.AccountBox />
            </InputAdornment>
          )
        }}
        variant  = "filled"
        label    = "Username"
        inputRef = { userNameRef }
        { ...register( 'username' ) }
        error      = { touchedFields.username && Boolean( errors.username ) }
        helperText = { touchedFields.username && errors.username?.message }
        fullWidth
      />
      <TextField
        InputProps = {{
          startAdornment: (
            <InputAdornment position = "start">
              <Icons.Password />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              sx = {{ cursor: 'pointer' }}
              position = "end">
                <IconButton onClick = { () => setShowPassword( prev => !prev )}>
                  { showPassword ? <Icons.VisibilityOff /> : <Icons.Visibility /> }
                </IconButton>
            </InputAdornment>
          )
        }}
        type    = { showPassword ? 'text' : 'password' }
        variant = "filled"
        label   = "Password"
        { ...register( 'password' ) }
        error      = { touchedFields.password && Boolean( errors.password ) }
        helperText = { touchedFields.password && errors.password?.message }
        fullWidth
      />

      {
        props.isSignupForm &&
        <ProfileImageInput
          register = { register }
          setValue = { setValue }
          error    = { errors.profileImage && errors.profileImage?.message }
        />
      }
      <Grid flexGrow = { 1 } />
      <Box sx = {{ marginTop: 2 }}>
        <Button
          type     = "submit"
          disabled = { !isValid || props.isSubmitting }
          endIcon  = { props.isSignupForm ? <Icons.Verified /> : <Icons.LockOpen /> }
          variant  = "contained"
          color    = "primary"
          fullWidth>
            { props.isSignupForm ? 'Sign-Up' : 'Log-In' }
        </Button>
      </Box>
    </Grid>
  )
}
