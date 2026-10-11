import { Check, Route as RouteIcon, Trash2 } from 'lucide-react';
import type { Wonda } from '../state';
import { t } from '../i18n/translations';

export default function RoutesList({ s }: { s: Wonda }) {
  const tr = (k: string) => t(s.lang, k);
  return (
    <div className="routes-panel-body">
      <button className="btn primary" onClick={() => {
        s.setPick('route'); s.setDraftRoute([]); s.setPicked(null);
        s.setRoutesOpen(false); s.setTideOpen(false);
      }}><RouteIcon size={16} /> {tr('routes.new')}</button>
      {s.routes.length === 0 && <p className="tiny">{tr('list.empty')}</p>}
      {s.routes.map((r) => (
        <div key={r.id} className="row">
          <div><strong>{r.name}</strong><br />
            <span className="tiny">{r.waypoints.length} {tr('routes.waypoints')} · {r.distanceKm.toFixed(1)} km</span></div>
          <div className="row-actions">
            <button className="icon-btn" aria-label={tr('routes.view')}
              onClick={() => { s.setFocusRouteId(r.id); s.setRoutesOpen(false); }}><Check size={15} /></button>
            <button className="icon-btn danger" aria-label={tr('form.delete')}
              onClick={() => s.setConfirmDel({ kind: 'route', id: r.id })}><Trash2 size={15} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
