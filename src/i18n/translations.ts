import type { Language } from '../types';
import pt from './pt';
import en from './en';

const dicts: Record<Language, Record<string, string>> = { pt, en };

export function t(lang: Language, key: string): string {
  return dicts[lang][key] ?? pt[key] ?? key;
}
