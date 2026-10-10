import { useState } from 'react';
import { Trash2, X } from 'lucide-react';
import type { Wonda } from '../state';
import { t } from '../i18n/translations';
import { kmToNm, routeDistanceKm } from '../lib/geo';
import { uid } from '../lib/storage';
import Community from './Community';

export default function RouteSheets({ s }: { s: Wonda }) {
  const tr = (k: string) => t(s.lang, k);
  const [routeName, setRouteName] = useState('');
  const focus = s.routes.find((r) => r.id === s.focusRouteId) ?? null;
  const draftKm = routeDistanceKm(s.draftRoute);

  function saveRoute() {
    if (s.draftRoute.length < 2) { s.setErr(tr('routes.tapHint')); return; }
    const km = routeDistanceKm(s.draftRoute);
    const name = routeName.trim() || `${tr('routes.new')} ${s.routes.length + 1}`;
    s.setRoutes((rs) => [...rs, {
      id: uid('rt'), name, waypoints: s.draftRoute,
      distanceKm: Math.round(km * 100) / 100,
      sourceType: 'demo', verificationStatus: 'demo', createdAt: new Date().toISOString(),
    }]);
    setRouteName(''); s.setPick(null); s.setDraftRoute([]); s.setErr('');
    s.setToast(tr('sync.label'));
    window.setTimeout(() => s.setToast(''), 2600);
  }

  return (<>
    {s.pick === 'route' && (
      <div className="sheet" role="dialog" aria-label={tr('action.routes')}>
        <div className="sheet-head">
          <strong>{tr('routes.new')}</strong>
          <button className="icon-btn" aria-label={tr('action.close')}
            onClick={() => { s.setPick(null); s.setDraftRoute([]); s.setErr(''); }}><X size={16} /></button>
        </div>
        <p className="tiny">{tr('routes.tapHint')}</p>
        <p><strong>{s.draftRoute.length}</strong> {tr('routes.waypoints')} · {tr('routes.distance')}: <strong>{draftKm.toFixed(2)} km ({kmToNm(draftKm).toFixed(2)} nm)</strong></p>
        <p className="tiny warn">{tr('routes.distanceWarn')}</p>
        <label>{tr('form.name')}<input placeholder={tr('routes.namePh')} value={routeName}
          onChange={(e) => setRouteName(e.target.value)} /></label>
        {s.err && <p className="error" role="alert">{s.err}</p>}
        <div className="sheet-actions">
          <button className="btn ghost" onClick={() => { s.setPick(null); s.setDraftRoute([]); }}>{tr('routes.discard')}</button>
          <button className="btn amber" onClick={saveRoute}>{tr('routes.save')}</button>
        </div>
      </div>
    )}
    {focus && !s.pick && (
      <div className="sheet" role="dialog" aria-label={focus.name}>
        <div className="sheet-head">
          <strong>{focus.name}</strong>
          <button className="icon-btn" aria-label={tr('action.close')} onClick={() => s.setFocusRouteId(null)}><X size={16} /></button>
        </div>
        <p>{focus.waypoints.length} {tr('routes.waypoints')} · {focus.distanceKm.toFixed(2)} km ({kmToNm(focus.distanceKm).toFixed(2)} nm)</p>
        <p className="tiny warn">{tr('routes.distanceWarn')}</p>
        <Community id={focus.id} s={s} tr={tr} />
        <div className="sheet-actions">
          <button className="btn ghost" onClick={() => s.setFocusRouteId(null)}>{tr('common.close')}</button>
          <button className="btn danger" onClick={() => s.setConfirmDel({ kind: 'route', id: focus.id })}>
            <Trash2 size={15} /> {tr('form.delete')}</button>
        </div>
      </div>
    )}
  </>);
}
