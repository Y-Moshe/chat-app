import { Box, SxProps, Theme, CircularProgress, Grow } from '@mui/material';

const suspenseFallBackStyle: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex'
};

export function SuspenseFallBack() {
  return (
    <Box sx = { suspenseFallBackStyle }>
      <Grow in = { true }>
        <CircularProgress sx = {{ m: 'auto' }} />
      </Grow>
    </Box>
  )
}
