import { appConfig } from '../config/appConfig';
import type { GameResult } from '../types/model';

const KEY = appConfig.recentStorageKey ?? 'rpssl_recent_v1';

const hasStorage = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function loadRecent(): GameResult[] {
  if (!hasStorage()) return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];

    return data.slice(0, 10).map((x) => ({
      results: String(x?.results ?? ''),
      player: Number(x?.player ?? 0),
      computer: Number(x?.computer ?? 0),
    })) as GameResult[];
  } catch {
    return [];
  }
}

export function saveRecent(recent: GameResult[]) {
  if (!hasStorage()) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(recent.slice(0, 10)));
  } catch {
    /* ignore */
  }
}

export function clearRecent() {
  if (!hasStorage()) return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
