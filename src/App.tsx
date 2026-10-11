import { useWondaState } from './state';
import MapView from './components/MapView';
import Floating from './components/Floating';
import MenuDrawer from './components/MenuDrawer';
import MarkersList from './components/MarkersList';
import PickSheets from './components/PickSheets';
import RouteSheets from './components/RouteSheets';
import TideSheet from './components/TideSheet';
import SpeedPanel from './components/SpeedPanel';
import { t } from './i18n/translations';
import './App.css';
import './panels.css';

export default function App() {
  const s = useWondaState();
  const tr = (k: string) => t(s.lang, k);

  function doDelete() {
    if (!s.confirmDel) return;
    if (s.confirmDel.kind === 'point') s.setPoints((ps) => ps.filter((p) => p.id !== s.confirmDel!.id));
    if (s.confirmDel.kind === 'hz') s.setHazards((hs) => hs.filter((h) => h.id !== s.confirmDel!.id));
    if (s.confirmDel.kind === 'route') {
      s.setRoutes((rs) => rs.filter((r) => r.id !== s.confirmDel!.id));
      if (s.focusRouteId === s.confirmDel.id) s.setFocusRouteId(null);
    }
    s.setConfirmDel(null);
  }

  return (
    <div className="wonda">
      <div className="map-wrap">
        <MapView s={s} />
        <Floating s={s} />
        <MenuDrawer s={s} />
        <MarkersList s={s} />
        <PickSheets s={s} />
        <RouteSheets s={s} />
        <TideSheet s={s} />
        <SpeedPanel s={s} />
        {s.confirmDel && (
          <div className="modal-back">
            <div className="modal" role="alertdialog" aria-label={tr('confirm.delete')}>
              <p>{tr('confirm.delete')}</p>
              <div className="sheet-actions">
                <button className="btn ghost" onClick={() => s.setConfirmDel(null)}>{tr('common.no')}</button>
                <button className="btn danger" onClick={doDelete}>{tr('common.yes')}</button>
              </div>
            </div>
          </div>
        )}
        {s.toast && <div className="toast" role="status">{s.toast}</div>}
      </div>
      <aside className="side">
        <h1>Wonda</h1>
        <p className="tiny">{tr('app.tagline')}</p>
        <p className="notice">{tr('notice.academic')}</p>
        <p className="tiny">{tr('sync.label')}</p>
      </aside>
      <footer className="academic-bar">{tr('notice.academic')}</footer>
    </div>
  );
}
