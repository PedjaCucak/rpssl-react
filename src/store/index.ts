import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.resolve'],
        // Ignore these paths in the state
        ignoredPaths: ['ui.resolve'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
