import { AlertTriangle, Fish, Route as RouteIcon, Waves, MapPin, Menu, X } from 'lucide-react';
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
      <div className="quick" role="toolbar" aria-label="quick">
        <button className="fab q hz" aria-label={tr('action.hazard')} onClick={() => startPick('hazard')}>
          <AlertTriangle size={22} /></button>
        <button className="fab q fish" aria-label={tr('action.fishing')} onClick={() => startPick('point')}>
          <Fish size={22} /></button>
        <button className="fab q route" aria-label={tr('action.routes')}
          onClick={() => { s.setMenuOpen(true); s.setMenuView('routes'); }}>
          <RouteIcon size={22} /></button>
      </div>
      <button className="fab corner left" aria-label={tr('action.tide')}
        onClick={() => s.setTideOpen((o) => !o)}><Waves size={20} /></button>
      <button className="fab corner right" aria-label={tr('action.markers')}
        onClick={() => { s.setMenuOpen(true); s.setMenuView('markers'); }}><MapPin size={20} /></button>
    </>
  );
}
