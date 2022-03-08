import { useState, useRef } from 'react';
import { Grid, Box, SxProps, Theme, Tooltip, Button, Grow, Alert } from '@mui/material';
import * as Icons from '@mui/icons-material';

const ALLOWED_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];

const imgPreviewStyle: SxProps<Theme> = {
  width: 'auto',
  maxWidth: 350,
  height: 'auto',
  maxHeight: 150,
  m: 1,
  borderRadius: 2,
  boxShadow: '0 0 10px black'
};

interface ProfileImageInputProps {
  register: any;
  setValue: any;
  error?: string;
}

export default function ProfileImageInput( props: ProfileImageInputProps ) {
  const [ imgPreviewDataURL, setImgPreviewDataURL ] = useState<string>();
  const profileImageRef = useRef<HTMLInputElement>( null );

  const handlePreviewImage = ( e: React.ChangeEvent ) => {
    // @ts-ignore
    const file = (e.target as HTMLInputElement)?.files[0];
    if ( !file ) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImgPreviewDataURL( fileReader.result as string || '' );
      props.setValue( 'profileImage', file, { shouldValidate: true });
    };
    
    fileReader.readAsDataURL( file );
  };

  return (
    <Grid container padding = { 2 }>
      <Box
        component = "input"
        { ...props.register( 'profileImage' ) }
        type     = "file"
        accept   = { ALLOWED_MIME_TYPE.toString() }
        ref      = { profileImageRef }
        hidden   = { true }
        onChange = { handlePreviewImage }
      />
      <Grid container
        flexDirection = "column"
        margin = "auto">
        <Tooltip title = "Optional">
          <Button
            sx = {{ m: 1 }}
            variant   = "outlined"
            startIcon = { <Icons.Image /> }
            onClick   = { () => profileImageRef.current?.click() }>
            Pick a Profile Image
          </Button>
        </Tooltip>
        {
          props.error &&
          <Grow in = { true }>
            <Alert severity = "error">{ props.error }</Alert>
          </Grow>
        }
        {
          imgPreviewDataURL &&
          <Grow in = { Boolean( imgPreviewDataURL ) }>
            <Box
              component = "img"
              src = { imgPreviewDataURL }
              alt = "Profile Image Preview"
              sx  = { imgPreviewStyle }
            />
          </Grow>
        }
      </Grid>
    </Grid>
  )
}
