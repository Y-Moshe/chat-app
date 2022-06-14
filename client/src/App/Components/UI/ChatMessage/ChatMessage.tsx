import {
  Box, Grid, SxProps,
  Theme, Typography, Link
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import { ChatMessageType } from '../../../Types';

const GREEN_COLOR     = 'rgba(37, 211, 102, 0.65)';
const WHITE_COLOR     = 'rgba(255, 255, 255, 0.09)';
const TURQUOISE_COLOR = 'rgba(52, 183, 241, 0.75)';

const ChatMessageStyle: SxProps<Theme> = {
  boxSizing: 'border-box',
  borderRadius: 1,
  padding: 0.5,
  margin: 1,
  color: 'white',
  fontSize: '1.2rem'
};

interface ChatMessageProps extends ChatMessageType {}

export function ChatMessage( props: ChatMessageProps ) {
  let bgColor: string;

  switch ( props.type ) {
    case 'chat':
      bgColor = WHITE_COLOR;
      break;
    case 'own':
      bgColor = GREEN_COLOR;
      break;
    case 'system':
      bgColor = TURQUOISE_COLOR;
      break;
  
    default:
      bgColor = WHITE_COLOR;
      break;
  }

  return (
    <Box sx = {{ ...ChatMessageStyle, background: bgColor }}>
      {
        props.type !== 'system' && (
          <Link component = { NavLink } to = { '/profile/' + props.user.username }>
            -{ props.user.username }
          </Link>
        )
      }
      <Typography component = { 'p' }>
        { props.message }
      </Typography>
      <Grid container justifyContent = { 'flex-end' }>
        <Typography
          component  = { 'span' }
          fontSize   = { '0.6rem' }
          fontFamily = { 'cursive' }
          color      = { '#e1dce1' }
          fontWeight = { '900' }>
          { props.date.toLocaleTimeString() }
        </Typography>
      </Grid>
    </Box>
  )
}
