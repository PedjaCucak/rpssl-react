import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { getChoices } from '../../api/GameAPIs';
import type { ApiError } from '../../types/api';
import { mapChoice } from '../../utils/mappers';
import type { LoadStatus } from '../../types/ui';
import type { Choice } from '../../types/model';

type GameState = {
  choices: Choice[];
  choicesStatus: LoadStatus;
};

const initialState: GameState = {
  choices: [],
  choicesStatus: 'loading',
};

export const fetchCoicesThunk = createAsyncThunk<
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

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    clearGameSlice: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoicesThunk.pending, (state) => {
        state.choicesStatus = 'loading';
      })
      .addCase(fetchCoicesThunk.fulfilled, (state, action) => {
        state.choicesStatus = 'success';
        state.choices = action.payload;
      })
      .addCase(fetchCoicesThunk.rejected, (state) => {
        state.choicesStatus = 'error';
      });
  },
});

export const { clearGameSlice } = gameSlice.actions;
export default gameSlice.reducer;

const selectGame = (s: RootState) => s.game;
export const selectChoices = createSelector([selectGame], (choices) => choices);
