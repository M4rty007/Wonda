// Util de persistência LocalStorage com tratamento de dados ausentes/corrompidos.

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function uid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export const KEYS = {
  points: 'wonda:points',
  hazards: 'wonda:hazards',
  routes: 'wonda:routes',
  lang: 'wonda:lang',
  layers: 'wonda:layers',
  votes: 'wonda:votes',
  gpsDemo: 'wonda:gpsDemo',
} as const;
