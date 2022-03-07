import { useState } from 'react';
import {
  Grid, Box,
  SxProps, Theme,
  CircularProgress, Grow, Fade
} from '@mui/material';

interface ProgressImageProps {
  src: string;
  alt: string;
  imageStyle?: SxProps<Theme>;
}

export function ProgressImage( props: ProgressImageProps ) {
  const [ isLoading, setIsLoading ] = useState( true );

  return (
    <Grid container>
      { isLoading && <Grow in children = { <CircularProgress sx = {{ m: 'auto' }} /> } /> }
      <Fade in = { !isLoading } hidden = { isLoading }>
        <Box component = "img"
          src    = { props.src }
          alt    = { props.alt }
          sx     = {{ ...props.imageStyle, margin: 'auto' }}
          onLoad = { () => setIsLoading( false ) }/>
      </Fade>
    </Grid>
  )
}
