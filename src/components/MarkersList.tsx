import { Pencil, Trash2, X } from 'lucide-react';
import type { Wonda } from '../state';
import { t } from '../i18n/translations';

export function Status({ s, tr }: { s: string; tr: (k: string) => string }) {
  return <span className={`badge ${s}`}>{tr(`status.${s}`)}</span>;
}

export default function MarkersList({ s }: { s: Wonda }) {
  const tr = (k: string) => t(s.lang, k);
  if (!s.markersOpen) return null;
  return (
    <section className="markers-panel" aria-label={tr('nav.markers')}>
      <div className="markers-panel-head">
        <strong>{tr('nav.markers')}</strong>
        <button className="icon-btn" aria-label={tr('action.close')} onClick={() => s.setMarkersOpen(false)}><X size={16} /></button>
      </div>
      <div className="markers-panel-body">
      <p className="drawer-label">{tr('list.points')}</p>
      {s.points.length === 0 && <p className="tiny">{tr('list.empty')}</p>}
      {s.points.map((p) => (
        <div key={p.id} className="row">
          <div><strong>{p.name}</strong><br />
            <span className="tiny">{tr(`cat.${p.category}`)} · <Status s={p.verificationStatus} tr={tr} /></span></div>
          <div className="row-actions">
            <button className="icon-btn" aria-label={tr('form.edit')} onClick={() => {
              s.setEditingPoint(p.id); s.setPicked({ lat: p.lat, lng: p.lng });
              s.setPick('point'); s.setMarkersOpen(false);
            }}><Pencil size={15} /></button>
            <button className="icon-btn danger" aria-label={tr('form.delete')}
              onClick={() => s.setConfirmDel({ kind: 'point', id: p.id })}><Trash2 size={15} /></button>
          </div>
        </div>
      ))}
      <p className="drawer-label">{tr('list.hazards')}</p>
      {s.hazards.length === 0 && <p className="tiny">{tr('list.empty')}</p>}
      {s.hazards.map((h) => (
        <div key={h.id} className="row">
          <div><strong>{h.label}</strong><br />
            <span className="tiny">{tr(`hz.${h.category}`)} · <Status s={h.verificationStatus} tr={tr} /></span></div>
          <div className="row-actions">
            <button className="icon-btn" aria-label={tr('form.edit')} onClick={() => {
              s.setEditingHz(h.id); s.setPicked({ lat: h.lat, lng: h.lng });
              s.setPick('hazard'); s.setMarkersOpen(false);
            }}><Pencil size={15} /></button>
            <button className="icon-btn danger" aria-label={tr('form.delete')}
              onClick={() => s.setConfirmDel({ kind: 'hz', id: h.id })}><Trash2 size={15} /></button>
          </div>
        </div>
      ))}
      </div>
    </section>
  );
}
