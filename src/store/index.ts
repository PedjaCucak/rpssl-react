import { configureStore } from '@reduxjs/toolkit';
import gameReducer, {
  hydrateRecent,
  selectRecentResults,
} from './slices/gameSlice';
import { loadRecent, saveRecent } from '../utils/scoreboardStorage';

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

const persisted = loadRecent();
if (persisted.length) {
  store.dispatch(hydrateRecent(persisted));
}

let lastJson = JSON.stringify(persisted);
store.subscribe(() => {
  const state = store.getState();
  const recent = selectRecentResults(state);
  const json = JSON.stringify(recent);
  if (json !== lastJson) {
    lastJson = json;
    saveRecent(recent);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
