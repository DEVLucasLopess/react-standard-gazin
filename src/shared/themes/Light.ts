import { createTheme } from '@mui/material';
import { blue, cyan } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      dark: blue[900],
      light: blue[500],
      contrastText: '#ffffff',
    },
    secondary: {
        main: cyan[500],
        dark: cyan[800],
        light: cyan[500],
        contrastText: '#ffffff',
    },
    background: {
        paper: '#ffffff',
        default: '#f7f6f3',
    }
  },
});

export default LightTheme;