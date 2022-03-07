import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { Send } from '@mui/icons-material';

export default function PrivateChat() {
  const [ text, setText ] = useState('');
  const textFieldRef = useRef<HTMLInputElement>( null );

  useEffect(() => {
    setTimeout(() => textFieldRef.current?.focus(), 500);
  }, []);

  const handleSentClick = () => {
    if ( !text.trim() ) { 
      return;
    }

    console.log('Sent');
    setText( '' );
  };

  const handleTyping = ( e: ChangeEvent<HTMLInputElement> ) => {
    setText( e.target.value );
    // Add user typing... functionaility
  }

  const handleEnterKeyPress = ( e: React.KeyboardEvent ) => {
    if ( e.code.toUpperCase() === 'ENTER' ) {
      handleSentClick();
    }
  };

  return (
    <Grid container
      flexDirection  = "column"
      justifyContent = "space-between"
      paddingX = "10px"
      height = { 1 }>
      <p>Message</p>
      <TextField fullWidth
        value      = { text }
        onChange   = { handleTyping }
        label      = "Type here.."
        size       = "small"
        variant    = "filled"
        onKeyDown  = { handleEnterKeyPress }
        InputProps = {{
          inputRef: textFieldRef,
          endAdornment: (
            <Button
              type    = "submit"
              variant = "contained"
              endIcon = { <Send /> }
              onClick = { handleSentClick }>
                Send
            </Button>
          )
        }}/>
    </Grid>
  )
}
