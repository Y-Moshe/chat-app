import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  SxProps, Theme, Grid, Box,
  TextField, InputAdornment, IconButton,
  
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

import { ChatMessage } from '../../Components';
import { ChatMessageType } from '../../Types';
import { useAuth } from '../../Hooks';

const PAGE_BG  = 'linear-gradient(120deg, rgba(23, 190, 187, 1), rgba(240, 166, 202, 1))';
const LIGHT_BG = 'rgba(255, 255, 255, 0.05)';
const DARK_BG  = 'rgba(79, 79, 79, 0.4)';

const generalChatBoxStyle = ({ palette }: Theme): SxProps<Theme> => ({
  margin: 'auto',
  padding: 1,
  width: 0.8,
  maxWidth: 1200,
  minHeight: 650,
  boxSizing: 'border-box',
  borderRadius: 5,
  background: palette.mode === 'light' ? LIGHT_BG : DARK_BG,
  boxShadow: '1px 1px 12px rgba(0, 0, 0, 0.1)'
});

const chatContainerStyle: SxProps<Theme> = {
  height: {
    md: 550,
    xs: 400
  },
  overflowY: 'scroll',
  '::-webkit-scrollbar': { width: 7 },
  '::-webkit-scrollbar-track': { background: '#f1f1f1' },
  '::-webkit-scrollbar-thumb': { background: '#888' },
  '::-webkit-scrollbar-thumb:hover': { background: '#555' }
};

export function GeneralChatPage() {
  const [ chatMessages, setChatMessages ] = useState<ChatMessageType[]>( [] );
  const [ messageInput, setMessageInput ] = useState( '' );
  const { isAuth } = useAuth();

  const chatContainerRef = useRef<HTMLDivElement>( null );
  const textFieldRef     = useRef<HTMLInputElement>( null );

  const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    setMessageInput( e.target.value );
  };

  const handleSubmit = () => {
    if ( !messageInput ) {
      return;
    }

    setChatMessages( prev => [
      ...prev,
      {
        id: uuidv4(),
        type: 'own',
        message: messageInput,
        date: new Date()
      }
    ]);

    setMessageInput( '' );
    setTimeout( () => autoScrollToLast(), 300 );
  };

  const handleEnterClick = ( e: KeyboardEvent<HTMLInputElement> ) => {
    const KEY = e.code.toUpperCase();
    if (  KEY === 'ENTER' ) {
      handleSubmit();
    }
  };

  const autoScrollToLast = () => {
    if ( chatContainerRef.current ) {
      const scrollHeight = chatContainerRef.current.scrollHeight;

      textFieldRef.current && textFieldRef.current.focus();
      chatContainerRef.current.scrollTo({
        top: scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Grid container
      sx  = {{ background: PAGE_BG }}
      flexGrow = { 1 }>
      <Grid sx = { generalChatBoxStyle as SxProps<Theme> } container>
        <Grid xs = { 12 } md = { 6 } item>
          {/* Chat */}
          <Grid height = {{ md: 1, xs: 0.9 }} container
            flexDirection  = { 'column' }
            justifyContent = { 'space-between' }>
            <Box sx = { chatContainerStyle } ref = { chatContainerRef }>
              {
                chatMessages.map(({ id, type, message, date }) => (
                  <ChatMessage
                    key     = { id }
                    id      = { id }
                    type    = { type }
                    message = { message }
                    date    = { date }
                  />
                ))
              }
            </Box>

            {/* TextField Component */}
            <Box marginY = { 1.5 }>
              <TextField
                fullWidth
                autoFocus
                inputRef   = { textFieldRef }
                disabled   = { isAuth === false }
                value      = { messageInput }
                onChange   = { handleChange }
                onKeyDown  = { handleEnterClick }
                size       = { 'small' }
                variant    = { 'filled' }
                InputProps = {{
                  endAdornment: (
                    <InputAdornment position = { 'end' }>
                      <IconButton onClick = { handleSubmit }>
                        <SendIcon color = {'primary'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Grid>

        </Grid>
        {/* Online Memebers */}
        <Grid xs = { 12 } md = { 6 } item>
          Online Memebers
        </Grid>
      </Grid>
    </Grid>
  )
}
