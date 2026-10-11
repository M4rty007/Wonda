import { useMemo } from 'react';
import { X } from 'lucide-react';
import type { Wonda } from '../state';
import { t } from '../i18n/translations';
import { seedTide } from '../data/seed';

export default function TideSheet({ s }: { s: Wonda }) {
  const tr = (k: string) => t(s.lang, k);
  const tide = useMemo(() => seedTide(), []);
  const path = useMemo(() => {
    const W = 300, H = 120, P = 8;
    const vals = tide.map((x) => x.levelM);
    const min = Math.min(...vals), max = Math.max(...vals);
    return tide.map((x, i) => {
      const px = P + (i / (tide.length - 1)) * (W - P * 2);
      const py = H - P - ((x.levelM - min) / (max - min || 1)) * (H - P * 2);
      return `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`;
    }).join(' ');
  }, [tide]);

  if (!s.tideOpen) return null;
  return (
    <div className="sheet tide-sheet" role="dialog" aria-label={tr('tide.title')}>
      <div className="sheet-head">
        <strong>{tr('tide.title')}</strong>
        <button className="icon-btn" aria-label={tr('action.close')} onClick={() => s.setTideOpen(false)}><X size={16} /></button>
      </div>
      <p className="tiny">{tr('tide.station')} · {tr('tide.unit')}</p>
      <svg viewBox="0 0 300 120" className="tide-chart" role="img" aria-label={`${tr('tide.title')} — ${tr('tide.simulated')}`}>
        <path d={path} fill="none" stroke="#0f2743" strokeWidth="2" />
      </svg>
      <p className="tiny">• {tr('tide.height')} · {tr('tide.range')}</p>
      <p className="badge demo">{tr('tide.simulated')}</p>
      <p className="tiny dim">{tr('tide.source')}</p>
    </div>
  );
}
