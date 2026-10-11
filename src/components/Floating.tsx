import { AlertTriangle, Fish, Route as RouteIcon, Waves, MapPin, Menu, X, List } from 'lucide-react';
import type { Wonda } from '../state';
import { t } from '../i18n/translations';

export default function Floating({ s }: { s: Wonda }) {
  const tr = (k: string) => t(s.lang, k);
  function startPick(mode: 'point' | 'hazard') {
    s.setPick(mode); s.setPicked(null); s.setErr('');
    s.setMenuOpen(false); s.setTideOpen(false);
  }
  return (
    <>
      <button className="fab fab-menu" aria-label={tr('action.menu')}
        onClick={() => { s.setMenuOpen((o) => !o); s.setMenuView('main'); }}>
        {s.menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      {s.pillOpen && (
        <div className="quick marker-pill" role="toolbar" aria-label={tr('action.markerPill')}>
          <button className="fab q hz" aria-label={tr('action.hazard')} title={tr('action.hazard')} onClick={() => startPick('hazard')}>
            <AlertTriangle size={22} /></button>
          <button className="fab q fish" aria-label={tr('action.fishing')} title={tr('action.fishing')} onClick={() => startPick('point')}>
            <Fish size={22} /></button>
          <button className={`fab q route${s.routesOpen ? ' on' : ''}`} aria-label={tr('action.routes')} title={tr('action.routes')}
            aria-pressed={s.routesOpen}
            onClick={() => { s.setRoutesOpen((o) => !o); }}>
            <RouteIcon size={22} /></button>
          <button className={`fab q panel${s.markersOpen ? ' on' : ''}`} aria-label={tr('action.markerPanel')} title={tr('action.markerPanel')}
            aria-pressed={s.markersOpen} onClick={() => { s.setMarkersOpen((o) => !o); }}>
            <List size={22} /></button>
        </div>
      )}
      <button className="fab corner left" aria-label={tr('action.tide')}
        onClick={() => s.setTideOpen((o) => !o)}><Waves size={20} /></button>
      <button className={`fab corner right${s.pillOpen ? ' active' : ''}`} aria-label={tr('action.markerPill')}
        title={tr('action.markerPill')} aria-expanded={s.pillOpen}
        onClick={() => { s.setPillOpen((o) => !o); }}><MapPin size={20} /></button>
    </>
  );
}
