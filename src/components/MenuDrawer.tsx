import { Settings, User, X } from 'lucide-react';
import type { Wonda } from '../state';
import { t } from '../i18n/translations';
import { seedHazards, seedPoints } from '../data/seed';
import RoutesList from './RoutesList';

export default function MenuDrawer({ s }: { s: Wonda }) {
  const tr = (k: string) => t(s.lang, k);
  if (!s.menuOpen) return null;

  function resetDemo() {
    s.setPoints(seedPoints); s.setHazards(seedHazards); s.setRoutes([]);
    s.setVotes({}); s.setFocusRouteId(null);
    s.setPick(null); s.setPicked(null);
    s.setToast(tr('menu.resetDone'));
    window.setTimeout(() => s.setToast(''), 2600);
  }

  return (
    <div className="menu-root">
      <nav className="menu-pill" aria-label={tr('menu.extra')}>
        <button className={`menu-row${s.menuView === 'settings' ? ' active' : ''}`} onClick={() => s.setMenuView('settings')} aria-label={tr('menu.settings')} aria-pressed={s.menuView === 'settings'}><Settings size={20} /></button>
        <button className={`menu-row${s.menuView === 'profile' ? ' active' : ''}`} onClick={() => s.setMenuView('profile')} aria-label={tr('menu.profile')} aria-pressed={s.menuView === 'profile'}><User size={20} /></button>
      </nav>
      {s.menuView !== 'main' && (
        <div className="drawer">
          <div className="drawer-head">
            <strong>{
              s.menuView === 'settings' ? tr('nav.settings')
              : s.menuView === 'profile' ? tr('nav.profile')
              : tr('nav.routes')
            }</strong>
            <button className="icon-btn" aria-label={tr('action.close')} onClick={() => s.setMenuView('main')}><X size={16} /></button>
          </div>
          {s.menuView === 'settings' && (
            <div className="drawer-body">
              <p className="drawer-label">{tr('menu.language')}</p>
              <div className="seg">
                <button className={s.lang === 'pt' ? 'on' : ''} onClick={() => s.setLang('pt')}>{tr('lang.pt')}</button>
                <button className={s.lang === 'en' ? 'on' : ''} onClick={() => s.setLang('en')}>{tr('lang.en')}</button>
              </div>
              <p className="drawer-label">{tr('menu.layers')}</p>
              {(['points', 'hazards', 'routes'] as const).map((k) => (
                <label key={k} className="check">
                  <input type="checkbox" checked={s.layers[k]}
                    onChange={() => s.setLayers((l: typeof s.layers) => ({ ...l, [k]: !l[k] }))} />
                  {tr(`layers.${k}`)}
                </label>
              ))}
              <label className="check">
                <input type="checkbox" checked={s.gpsDemo} onChange={() => s.setGpsDemo((v) => !v)} />
                {tr('speed.simulated')}
              </label>
              <button className="btn ghost" onClick={resetDemo}>{tr('menu.reset')}</button>
              <p className="tiny">{tr('sync.label')}</p>
            </div>
          )}
          {s.menuView === 'profile' && (
            <div className="drawer-body">
              <div className="avatar"><User size={28} /></div>
              <strong>{tr('profile.name')}</strong>
              <p className="tiny">{tr('profile.desc')}</p>
              <span className="badge demo">{tr('status.demo')}</span>
            </div>
          )}
          {s.menuView === 'routes' && <RoutesList s={s} />}
        </div>
      )}
    </div>
  );
}
