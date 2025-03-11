'use client';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#0000ff',
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
