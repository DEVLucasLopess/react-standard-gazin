import { createTheme } from '@mui/material';
import { cyan, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
      dark: yellow[900],
      light: yellow[500],
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