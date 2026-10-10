import { useEffect, useState } from 'react';
import type { CommunityVote, Hazard, Language, LayerPrefs, PointOfInterest, RouteWaypoint, SavedRoute } from './types';
import { KEYS, load, save } from './lib/storage';
import { seedHazards, seedPoints } from './data/seed';

export type PickMode = null | 'point' | 'hazard' | 'route';
export type MenuView = 'main' | 'settings' | 'profile' | 'routes' | 'markers';

export interface UiState {
  lang: Language; points: PointOfInterest[]; hazards: Hazard[];
  routes: SavedRoute[]; layers: LayerPrefs;
  votes: Record<string, CommunityVote>;
  menuOpen: boolean; menuView: MenuView; tideOpen: boolean;
  pick: PickMode; picked: { lat: number; lng: number } | null;
  draftRoute: RouteWaypoint[]; focusRouteId: string | null;
  editingPoint: string | null; editingHz: string | null;
  confirmDel: { kind: 'point' | 'hz' | 'route'; id: string } | null;
  err: string; toast: string; gpsDemo: boolean;
  gps: { lat: number; lng: number; speedKts: number | null; live: boolean } | null;
}

export function useWondaState() {
  const [lang, setLang] = useState<Language>(() => load<Language>(KEYS.lang, 'pt'));
  const [points, setPoints] = useState<PointOfInterest[]>(() => load(KEYS.points, seedPoints));
  const [hazards, setHazards] = useState<Hazard[]>(() => load(KEYS.hazards, seedHazards));
  const [routes, setRoutes] = useState<SavedRoute[]>(() => load(KEYS.routes, []));
  const [layers, setLayers] = useState<LayerPrefs>(() => load(KEYS.layers, { points: true, hazards: true, routes: true }));
  const [votes, setVotes] = useState<Record<string, CommunityVote>>(() => load(KEYS.votes, {}));
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<MenuView>('main');
  const [tideOpen, setTideOpen] = useState(false);
  const [pick, setPick] = useState<PickMode>(null);
  const [picked, setPicked] = useState<{ lat: number; lng: number } | null>(null);
  const [draftRoute, setDraftRoute] = useState<RouteWaypoint[]>([]);
  const [focusRouteId, setFocusRouteId] = useState<string | null>(null);
  const [editingPoint, setEditingPoint] = useState<string | null>(null);
  const [editingHz, setEditingHz] = useState<string | null>(null);
  const [confirmDel, setConfirmDel] = useState<UiState['confirmDel']>(null);
  const [err, setErr] = useState('');
  const [toast, setToast] = useState('');
  const [gpsDemo, setGpsDemo] = useState<boolean>(() => load(KEYS.gpsDemo, true));
  const [gps, setGps] = useState<UiState['gps']>(null);

  useEffect(() => { save(KEYS.points, points); }, [points]);
  useEffect(() => { save(KEYS.hazards, hazards); }, [hazards]);
  useEffect(() => { save(KEYS.routes, routes); }, [routes]);
  useEffect(() => { save(KEYS.layers, layers); }, [layers]);
  useEffect(() => { save(KEYS.votes, votes); }, [votes]);
  useEffect(() => { save(KEYS.gpsDemo, gpsDemo); }, [gpsDemo]);
  useEffect(() => {
    save(KEYS.lang, lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  return {
    lang, setLang, points, setPoints, hazards, setHazards, routes, setRoutes,
    layers, setLayers, votes, setVotes, menuOpen, setMenuOpen, menuView, setMenuView,
    tideOpen, setTideOpen, pick, setPick, picked, setPicked, draftRoute, setDraftRoute,
    focusRouteId, setFocusRouteId, editingPoint, setEditingPoint, editingHz, setEditingHz,
    confirmDel, setConfirmDel, err, setErr, toast, setToast, gpsDemo, setGpsDemo, gps, setGps,
  };
}

export type Wonda = ReturnType<typeof useWondaState>;
