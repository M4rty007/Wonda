// Wonda — modelos de dados compartilhados.
// Campos de proveniência: sourceType / verificationStatus / sourceName / updatedAt.

export type SourceType = 'real' | 'demo';
export type VerificationStatus = 'verified' | 'unverified' | 'demo';
export type Language = 'pt' | 'en';

export interface PointOfInterest {
  id: string;
  name: string;
  category: PointCategory;
  description: string;
  lat: number;
  lng: number;
  sourceType: SourceType;
  sourceName?: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
}

export type PointCategory =
  | 'reference'
  | 'fishing'
  | 'access'
  | 'support'
  | 'other';

export interface Hazard {
  id: string;
  label: string;
  category: HazardCategory;
  description: string;
  lat: number;
  lng: number;
  severity: 'attention' | 'danger';
  sourceType: SourceType;
  sourceName?: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
}

export type HazardCategory =
  | 'obstacle'
  | 'shallow'
  | 'attention_area'
  | 'community_report';

export interface RouteWaypoint {
  lat: number;
  lng: number;
}

export interface SavedRoute {
  id: string;
  name: string;
  waypoints: RouteWaypoint[];
  /** Distância geométrica (linha reta entre waypoints), em km. NÃO é distância navegável. */
  distanceKm: number;
  sourceType: SourceType;
  verificationStatus: VerificationStatus;
  createdAt: string;
}

export interface TideSample {
  time: string; // ISO
  levelM: number;
}

export interface CommunityVote {
  up: number;
  down: number;
  mine: 'up' | 'down' | null;
}

export interface LayerPrefs {
  points: boolean;
  hazards: boolean;
  routes: boolean;
}
