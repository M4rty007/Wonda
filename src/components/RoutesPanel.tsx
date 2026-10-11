import { X } from 'lucide-react';
import type { Wonda } from '../state';
import { t } from '../i18n/translations';
import RoutesList from './RoutesList';

export default function RoutesPanel({ s }: { s: Wonda }) {
  const tr = (k: string) => t(s.lang, k);
  if (!s.routesOpen) return null;
  return (
    <section className="routes-panel" aria-label={tr('nav.routes')}>
      <div className="routes-panel-head">
        <strong>{tr('nav.routes')}</strong>
        <button className="icon-btn" aria-label={tr('action.close')} onClick={() => s.setRoutesOpen(false)}><X size={16} /></button>
      </div>
      <RoutesList s={s} />
    </section>
  );
}
