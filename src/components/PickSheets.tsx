import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Wonda } from '../state';
import { t } from '../i18n/translations';
import { uid } from '../lib/storage';
import { validLat, validLng } from '../lib/geo';
import type { Hazard, PointOfInterest } from '../types';

export default function PickSheets({ s }: { s: Wonda }) {
  const tr = (k: string) => t(s.lang, k);
  const [name, setName] = useState('');
  const [cat, setCat] = useState<PointOfInterest['category']>('fishing');
  const [desc, setDesc] = useState('');
  const [sev, setSev] = useState<Hazard['severity']>('danger');

  // Pré-carrega os campos quando o formulário abre em modo edição.
  useEffect(() => {
    if (s.editingPoint) {
      const p = s.points.find((x) => x.id === s.editingPoint);
      if (p) { setName(p.name); setCat(p.category); setDesc(p.description); }
    } else if (s.editingHz) {
      const h = s.hazards.find((x) => x.id === s.editingHz);
      if (h) { setName(h.label); setDesc(h.description); setSev(h.severity); }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.editingPoint, s.editingHz]);

  function cancel() {
    s.setPick(null); s.setPicked(null);
    s.setEditingPoint(null); s.setEditingHz(null); s.setErr('');
    setName(''); setDesc('');
  }

  if (s.pick !== 'point' && s.pick !== 'hazard') return null;
  const isPoint = s.pick === 'point';

  function save() {
    if (!s.picked) { s.setErr(tr('panel.pickHint')); return; }
    if (!name.trim()) { s.setErr(tr('form.required')); return; }
    if (!validLat(s.picked.lat) || !validLng(s.picked.lng)) { s.setErr(tr('form.coordsInvalid')); return; }
    if (isPoint) {
      if (s.editingPoint) {
        s.setPoints((ps) => ps.map((p) => p.id === s.editingPoint
          ? { ...p, name: name.trim(), category: cat, description: desc.trim(), lat: s.picked!.lat, lng: s.picked!.lng } : p));
      } else {
        s.setPoints((ps) => [...ps, {
          id: uid('pt'), name: name.trim(), category: cat, description: desc.trim(),
          lat: s.picked!.lat, lng: s.picked!.lng,
          sourceType: 'real', verificationStatus: 'unverified', createdAt: new Date().toISOString(),
        }]);
      }
    } else {
      if (s.editingHz) {
        s.setHazards((hs) => hs.map((h) => h.id === s.editingHz
          ? { ...h, label: name.trim(), category: cat as unknown as Hazard['category'], description: desc.trim(), severity: sev, lat: s.picked!.lat, lng: s.picked!.lng } : h));
      } else {
        s.setHazards((hs) => [...hs, {
          id: uid('hz'), label: name.trim(), category: 'community_report', description: desc.trim(),
          severity: sev, lat: s.picked!.lat, lng: s.picked!.lng,
          sourceType: 'real', verificationStatus: 'unverified', createdAt: new Date().toISOString(),
        }]);
      }
    }
    cancel();
    s.setToast(tr('sync.label'));
    window.setTimeout(() => s.setToast(''), 2600);
  }

  return (
    <div className="sheet" role="dialog" aria-label={isPoint ? tr('action.fishing') : tr('action.hazard')}>
      <div className="sheet-head">
        <strong>{isPoint ? tr('action.fishing') : tr('action.hazard')}</strong>
        <button className="icon-btn" aria-label={tr('action.close')} onClick={cancel}><X size={16} /></button>
      </div>
      <p className="tiny">{s.picked ? `${s.picked.lat.toFixed(5)}, ${s.picked.lng.toFixed(5)}` : tr('panel.pickHint')}</p>
      <label>{tr('form.name')}*<input value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label>{tr('form.category')}
        <select value={cat} onChange={(e) => setCat(e.target.value as PointOfInterest['category'])}>
          {(isPoint
            ? ['reference', 'fishing', 'access', 'support', 'other']
            : ['obstacle', 'shallow', 'attention_area', 'community_report']
          ).map((c) => (
            <option key={c} value={c}>{tr(isPoint ? `cat.${c}` : `hz.${c}`)}</option>
          ))}
        </select></label>
      {!isPoint && (
        <label>{tr('form.severity')}
          <select value={sev} onChange={(e) => setSev(e.target.value as Hazard['severity'])}>
            <option value="attention">{tr('sev.attention')}</option>
            <option value="danger">{tr('sev.danger')}</option>
          </select></label>
      )}
      <label>{tr('form.description')}<input value={desc} onChange={(e) => setDesc(e.target.value)} /></label>
      {s.err && <p className="error" role="alert">{s.err}</p>}
      <div className="sheet-actions">
        <button className="btn ghost" onClick={cancel}>{tr('form.cancel')}</button>
        <button className="btn primary" onClick={save}>{tr('form.save')}</button>
      </div>
    </div>
  );
}
