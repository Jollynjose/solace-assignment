'use client';
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#667085',
    },
  },
  typography: {
    fontFamily: '--font-roboto',
    h1: {
      fontWeight: 700,
      fontSize: '1.25rem', // 20px
      lineHeight: '1.875rem', // 30px
    },
    h2: {
      fontWeight: 500,
      fontSize: '1.25rem', // 20px
      lineHeight: '1.875rem', // 30px
    },
    h3: {
      fontWeight: 700,
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
    },
    h4: {
      fontWeight: 600,
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
      letterSpacing: '0.25px',
    },
    h5: {
      fontWeight: 500,
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
    },
  },
});

export default theme;
