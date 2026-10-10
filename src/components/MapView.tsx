import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, CircleMarker } from 'react-leaflet';
import { Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Wonda, PickMode } from '../state';
import { validLat, validLng } from '../lib/geo';

export const SAO_LUIS: [number, number] = [-2.53, -44.3];

const pointIcon = (color: string) => L.divIcon({
  className: 'wonda-pin', html: `<span style="background:${color}"></span>`,
  iconSize: [18, 18], iconAnchor: [9, 9],
});
const hazardIcon = (sev: 'attention' | 'danger') => L.divIcon({
  className: 'wonda-pin-hz', html: `<span class="${sev}">!</span>`,
  iconSize: [22, 22], iconAnchor: [11, 11],
});

function ClickCatcher({ mode, onPick }: { mode: PickMode; onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      if (mode === 'point' || mode === 'hazard' || mode === 'route') onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapView({ s }: { s: Wonda }) {
  function onPick(lat: number, lng: number) {
    if (s.pick === 'route') {
      if (!validLat(lat) || !validLng(lng)) return;
      s.setDraftRoute((d) => [...d, { lat, lng }]);
      return;
    }
    s.setPicked({ lat, lng });
  }

  return (
    <>
      <MapContainer center={SAO_LUIS} zoom={13} zoomControl={false} className="map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickCatcher mode={s.pick} onPick={onPick} />
        {s.layers.points && s.points.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]}
            icon={pointIcon(p.category === 'fishing' ? '#1f8ef1' : '#0f2743')} />
        ))}
        {s.layers.hazards && s.hazards.map((h) => (
          <Marker key={h.id} position={[h.lat, h.lng]} icon={hazardIcon(h.severity)} />
        ))}
        {s.layers.routes && s.routes.map((r) => (
          <Polyline key={r.id} positions={r.waypoints.map((w: { lat: number; lng: number }) => [w.lat, w.lng] as [number, number])}
            pathOptions={{ color: '#e0a100', weight: r.id === s.focusRouteId ? 5 : 3, dashArray: r.id === s.focusRouteId ? undefined : '6 5' }} />
        ))}
        {s.pick === 'route' && s.draftRoute.length > 0 && (
          <Polyline positions={s.draftRoute.map((w: { lat: number; lng: number }) => [w.lat, w.lng] as [number, number])}
            pathOptions={{ color: '#e0a100', weight: 4 }} />
        )}
        {s.draftRoute.map((w, i) => (
          <CircleMarker key={i} center={[w.lat, w.lng]} radius={5}
            pathOptions={{ color: '#0f2743', fillColor: '#ffd23f', fillOpacity: 1 }} />
        ))}
        {s.picked && <CircleMarker center={[s.picked.lat, s.picked.lng]} radius={8}
          pathOptions={{ color: '#0f2743', fillColor: '#22d3ee', fillOpacity: 1 }} />}
        {s.gps?.live && (
          <Marker position={[s.gps.lat, s.gps.lng]} icon={L.divIcon({
            className: 'wonda-me', html: '<span>▲</span>', iconSize: [24, 24], iconAnchor: [12, 12],
          })} />
        )}
      </MapContainer>
      {!s.gps?.live && (
        <div className="center-arrow" aria-hidden="true">
          <Navigation size={26} fill="#fff" color="#fff" />
        </div>
      )}
    </>
  );
}
