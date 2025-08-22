import { loadRecent, saveRecent, clearRecent } from './scoreboardStorage';
import { test, expect, beforeEach } from 'vitest';

const make = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    results: 'win' as const,
    player: i + 1,
    computer: 1,
  }));

beforeEach(() => {
  localStorage.clear();
});

test('returns [] when empty', () => {
  expect(loadRecent()).toEqual([]);
});

test('saveRecent caps to 10 and loadRecent reads it back', () => {
  const arr = make(12);
  saveRecent(arr);
  const loaded = loadRecent();
  expect(loaded).toHaveLength(10);
  // saved slice(0,10) keeps first 10
  expect(loaded[0].player).toBe(1);
  expect(loaded[9].player).toBe(10);
});

test('clearRecent removes data', () => {
  saveRecent(make(3));
  clearRecent();
  expect(loadRecent()).toEqual([]);
});

test('loadRecent guards invalid JSON', () => {
  localStorage.setItem('rpsls_recent_v1', '{not json');
  expect(loadRecent()).toEqual([]);
});
