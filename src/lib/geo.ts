// Cálculo geográfico: Haversine. Distância GEOMÉTRICA apenas.

export function haversineKm(
  aLat: number, aLng: number,
  bLat: number, bLng: number,
): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const s1 = Math.sin(dLat / 2);
  const s2 = Math.sin(dLng / 2);
  const aa =
    s1 * s1 +
    Math.cos((aLat * Math.PI) / 180) *
      Math.cos((bLat * Math.PI) / 180) *
      s2 * s2;
  return 2 * R * Math.asin(Math.sqrt(aa));
}

export function routeDistanceKm(pts: { lat: number; lng: number }[]): number {
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    total += haversineKm(pts[i - 1].lat, pts[i - 1].lng, pts[i].lat, pts[i].lng);
  }
  return total;
}

export const kmToNm = (km: number) => km / 1.852;

export function validLat(v: number): boolean {
  return Number.isFinite(v) && v >= -90 && v <= 90;
}
export function validLng(v: number): boolean {
  return Number.isFinite(v) && v >= -180 && v <= 180;
}
