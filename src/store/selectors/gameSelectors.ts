import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';

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
