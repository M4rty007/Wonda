import type { Wonda } from '../state';
import { t } from '../i18n/translations';

export default function SpeedPanel({ s }: { s: Wonda }) {
  const tr = (k: string) => t(s.lang, k);

  function enableGps() {
    if (!('geolocation' in navigator)) { s.setErr('GPS unavailable'); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const kts = pos.coords.speed != null ? pos.coords.speed * 1.94384 : null;
        s.setGps({ lat: pos.coords.latitude, lng: pos.coords.longitude, speedKts: kts, live: true });
      },
      () => s.setErr('GPS indisponível — mantido o mapa de São Luís.'),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  const live = s.gps?.live && s.gps.speedKts != null;
  const speedText = live ? String(Math.round(s.gps!.speedKts!)).padStart(2, '0') : tr('speed.unavailable');
  const badge = s.gps?.live ? tr('speed.live') : (s.gpsDemo ? tr('speed.simulated') : '');

  return (
    <div className="speed-panel" role="status" aria-label={tr('speed.label')}>
      <span className="speed-val">{speedText}</span>
      <span className="speed-unit">kn</span>
      <span className="speed-sub">{tr('speed.label')}
        {badge ? ` · ${badge}` : ''}
        {!s.gps?.live && (
          <button className="link" onClick={enableGps}> · {tr('speed.enable')}</button>
        )}
      </span>
      <span className="tiny dim">{tr('speed.enableHint')}</span>
    </div>
  );
}
