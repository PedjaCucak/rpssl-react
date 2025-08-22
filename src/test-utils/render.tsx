import * as React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import gameReducer from '../store/slices/gameSlice';
import type { RootState } from '../store';

// If you use MUI in this app, uncomment:
// import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
const theme = createTheme();

export function setupStore(preloadedState?: RootState) {
  return configureStore({
    reducer: { game: gameReducer },
    preloadedState,
    devTools: false,
  });
}

export function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
  }: {
    preloadedState?: RootState;
    store?: ReturnType<typeof setupStore>;
  } = {}
) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ThemeProvider>
  );

  return { store, ...rtlRender(ui, { wrapper: Wrapper }) };
}
