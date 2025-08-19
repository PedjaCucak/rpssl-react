import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { getChoices, play } from '../../api/GameAPIs';
import type { ApiError } from '../../types/api';
import { mapChoice, mapGameResult } from '../../utils/mappers';
import type { LoadStatus } from '../../types/ui';
import type { Choice, GameResult } from '../../types/model';

type GameState = {
  choices: Choice[];
  choicesStatus: LoadStatus;

  // gameplay
  playStatus: LoadStatus;
  lastRound?: GameResult;

  // scoreboard (last 10, newest first)
  recent: GameResult[];
};

const initialState: GameState = {
  choices: [],
  choicesStatus: 'loading',

  playStatus: 'idle',
  lastRound: undefined,
  recent: [],
};

export const fetchChoicesThunk = createAsyncThunk<
  Choice[], // fulfilled payload = Choice[]
  void, // arg
  { rejectValue: ApiError }
>('game/fetchChoices', async (_, { rejectWithValue }) => {
  const response = await getChoices();
  if (response.error) {
    return rejectWithValue(response.error);
  }
  return (response.data ?? []).map(mapChoice);
});

export const playRoundThunk = createAsyncThunk<
  GameResult,
  number, // player choice id
  { rejectValue: ApiError }
>('game/playRound', async (choiceId, { rejectWithValue }) => {
  const response = await play(choiceId);
  if (response.error) return rejectWithValue(response.error);

  if (!response.data) {
    return rejectWithValue({ message: 'Empty result from server' } as ApiError);
  }
  return mapGameResult(response.data);
});

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearGameSlice: () => initialState,
    resetScoreboard(state) {
      state.recent = [];
    },
    hydrateRecent(state, action: PayloadAction<GameResult[]>) {
      state.recent = action.payload.slice(0, 10);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchChoicesThunk.pending, (state) => {
        state.choicesStatus = 'loading';
      })
      .addCase(fetchChoicesThunk.fulfilled, (state, action) => {
        state.choicesStatus = 'success';
        state.choices = action.payload;
      })
      .addCase(fetchChoicesThunk.rejected, (state) => {
        state.choicesStatus = 'error';
      })
      .addCase(playRoundThunk.pending, (state) => {
        state.playStatus = 'loading';
      })
      .addCase(playRoundThunk.fulfilled, (state, action) => {
        state.playStatus = 'success';
        state.lastRound = action.payload;
        // newest first; cap to 10
        state.recent.unshift(action.payload);
        if (state.recent.length > 10) state.recent.pop();
      })
      .addCase(playRoundThunk.rejected, (state) => {
        state.playStatus = 'error';
      });
  },
});

export const { clearGameSlice, resetScoreboard, hydrateRecent } =
  gameSlice.actions;
export default gameSlice.reducer;

const selectGame = (s: RootState) => s.game;

export const selectChoices = createSelector([selectGame], (g) => g.choices);
export const selectChoicesStatus = createSelector(
  selectGame,
  (g) => g.choicesStatus
);

export const selectPlayStatus = createSelector(selectGame, (g) => g.playStatus);
export const selectLastRound = createSelector(selectGame, (g) => g.lastRound);
export const selectRecentResults = createSelector(selectGame, (g) => g.recent);

export const selectChoiceNameById = createSelector(selectChoices, (choices) => {
  const m = new Map<number, string>();
  for (const c of choices) m.set(c.id, c.name);
  return (id: number) => m.get(id) ?? `#${id}`;
});
