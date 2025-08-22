import reducer, {
  type GameState,
  playRoundThunk,
  resetScoreboard,
} from './gameSlice';
import { test, expect } from 'vitest';

const base: GameState = {
  choices: [],
  choicesStatus: 'idle', // value here doesn't matter for these tests
  playStatus: 'idle',
  lastRound: undefined,
  recent: [],
};

const result = (player: number, computer = 1) => ({
  results: 'win' as const,
  player,
  computer,
});

test('caps recent to 10; newest first', () => {
  let state = { ...base };

  for (let i = 1; i <= 12; i++) {
    // use the thunk's action creator -> correct type every time
    state = reducer(
      state,
      playRoundThunk.fulfilled(result(i), /* requestId */ '', /* arg */ i)
    );
  }

  expect(state.recent).toHaveLength(10);
  expect(state.recent[0].player).toBe(12);
  expect(state.recent[9].player).toBe(3);
});

test('resetScoreboard clears on action dispatch', () => {
  const s1 = reducer(
    { ...base, recent: [result(1)] },
    resetScoreboard() // <-- plain action, no ".fulfilled"
  );
  expect(s1.recent).toEqual([]);
});
