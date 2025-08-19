import type { Outcome } from '../types/ui';

export function outcomeColor(results: string | undefined) {
  const r = (results ?? '').toLowerCase();
  if (r.includes('win')) return 'success.main';
  if (r.includes('lose') || r.includes('loss')) return 'error.main';
  if (r.includes('draw') || r.includes('tie')) return 'text.secondary';
  return 'text.primary';
}

export function detectOutcome(results?: string): Outcome {
  const r = (results ?? '').toLowerCase();
  if (r.includes('win')) return 'player';
  if (r.includes('lose') || r.includes('loss')) return 'computer';
  return 'tie';
}
