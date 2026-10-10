import type { Hazard, PointOfInterest, TideSample } from '../types';

// Pequenos dados de DEMONSTRAÇÃO — fictícios, marcados como demo.
// Nunca apresentados como estabelecimentos reais verificados.

export const seedPoints: PointOfInterest[] = [
  {
    id: 'demo_pt_praia',
    name: 'Ponta d’Areia — mirante (demo)',
    category: 'reference',
    description: 'Ponto de referência fictício para demonstração.',
    lat: -2.5105,
    lng: -44.2962,
    sourceType: 'demo',
    sourceName: 'Wonda demo',
    verificationStatus: 'demo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo_pt_pesca',
    name: 'Área de pesca — Baía (demo)',
    category: 'fishing',
    description: 'Exemplo de área de pesca fictícia.',
    lat: -2.55,
    lng: -44.33,
    sourceType: 'demo',
    sourceName: 'Wonda demo',
    verificationStatus: 'demo',
    createdAt: new Date().toISOString(),
  },
];

export const seedHazards: Hazard[] = [
  {
    id: 'demo_hz_banco',
    label: 'Banco de areia (demo)',
    category: 'shallow',
    description: 'Exemplo fictício — não é um perigo real mapeado.',
    lat: -2.57,
    lng: -44.31,
    severity: 'attention',
    sourceType: 'demo',
    sourceName: 'Wonda demo',
    verificationStatus: 'demo',
    createdAt: new Date().toISOString(),
  },
];

/** Amostra senoidal local de 24h — SIMULADA. */
export function seedTide(): TideSample[] {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  const out: TideSample[] = [];
  for (let h = 0; h <= 24; h += 1) {
    const t = new Date(base.getTime() + h * 3600_000);
    // duas preamares/dia aprox., amplitude ~2.5m típica de São Luís (valor ilustrativo)
    const level = 2.9 + 2.4 * Math.sin(((h - 3) / 12) * Math.PI * 2 * 0.97);
    out.push({ time: t.toISOString(), levelM: Math.round(level * 100) / 100 });
  }
  return out;
}
