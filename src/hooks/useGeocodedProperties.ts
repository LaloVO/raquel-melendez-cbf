import { useEffect, useState } from "react";
import { CBFProperty } from "@/lib/cbf";

// In-memory cache shared across the session so the same address string
// is never geocoded twice while the tab is open.
const geocodeCache = new Map<string, { lat: number; lng: number } | null>();

async function geocode(query: string, mapboxToken: string): Promise<{ lat: number; lng: number } | null> {
  if (geocodeCache.has(query)) return geocodeCache.get(query)!;
  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxToken}&limit=1&country=mx`
    );
    if (!res.ok) {
      geocodeCache.set(query, null);
      return null;
    }
    const data = await res.json();
    const feature = data.features?.[0];
    if (!feature) {
      geocodeCache.set(query, null);
      return null;
    }
    const [lng, lat] = feature.center;
    const result = { lat, lng };
    geocodeCache.set(query, result);
    return result;
  } catch {
    geocodeCache.set(query, null);
    return null;
  }
}

function addressQuery(p: CBFProperty): string | null {
  // Neighborhood-level only — never the street address, to match the
  // site's policy of not exposing exact property locations publicly.
  const parts = [p.colonia, p.ciudad_nombre, p.estado_nombre].filter(
    (v, i, arr): v is string => !!v && arr.indexOf(v) === i
  );
  if (parts.length === 0) return null;
  return `${parts.join(", ")}, México`;
}

/**
 * Fills in missing latitud/longitud on properties (approximate, neighborhood-level)
 * via Mapbox geocoding, so properties saved without coordinates still get a map marker.
 */
export function useGeocodedProperties<T extends CBFProperty>(properties: T[], mapboxToken: string): T[] {
  const [resolved, setResolved] = useState<Record<string, { lat: number; lng: number }>>({});

  const missing = properties.filter((p) => (p.latitud == null || p.longitud == null) && addressQuery(p));
  const missingKey = missing.map((p) => p.id).join(",");

  useEffect(() => {
    if (!mapboxToken || missing.length === 0) return;
    let cancelled = false;

    (async () => {
      const entries = await Promise.all(
        missing.map(async (p) => {
          const query = addressQuery(p);
          if (!query) return null;
          const coords = await geocode(query, mapboxToken);
          return coords ? ([String(p.id), coords] as const) : null;
        })
      );
      if (cancelled) return;
      const next: Record<string, { lat: number; lng: number }> = {};
      entries.forEach((e) => {
        if (e) next[e[0]] = e[1];
      });
      if (Object.keys(next).length > 0) {
        setResolved((prev) => ({ ...prev, ...next }));
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missingKey, mapboxToken]);

  return properties.map((p) => {
    if (p.latitud != null && p.longitud != null) return p;
    const coords = resolved[String(p.id)];
    if (!coords) return p;
    return { ...p, latitud: coords.lat, longitud: coords.lng };
  });
}
