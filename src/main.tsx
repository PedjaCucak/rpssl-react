import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import theme from './theme/theme';
import { SnackbarProvider } from 'notistack';
import { CustomAlert } from './components/CustomAlert';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={10}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        Components={{
          success: CustomAlert,
          error: CustomAlert,
          warning: CustomAlert,
          info: CustomAlert,
        }}
      >
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
