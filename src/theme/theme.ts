import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#6A44B0',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FAFAFA', // background behind content
      paper: '#ffffff', // used by AppBar, Drawer, Dialog, etc.
    },
  },
  components: {},
});

export default theme;
