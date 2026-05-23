import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { X, Bed, Bath, Square } from 'lucide-react';

export interface MapProperty {
  id: string;
  title: string;
  location: string;
  area: string;
  price: string;
  priceValue: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  type: string;
  coordinates: { lat: number; lng: number };
}

interface PropertyMapProps {
  properties: MapProperty[];
  mapboxToken: string;
  searchQuery?: string;
  centerCoordinates?: { lat: number; lng: number };
}

const PropertyMap = ({
  properties,
  mapboxToken,
  searchQuery,
  centerCoordinates,
}: PropertyMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const boundsFitRef = useRef(false);
  const [selected, setSelected] = useState<MapProperty | null>(null);
  const initialCenterRef = useRef(centerCoordinates);

  useEffect(() => {
    if (!containerRef.current || !mapboxToken) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    boundsFitRef.current = false;

    const initialCenter = initialCenterRef.current
      ? ([initialCenterRef.current.lng, initialCenterRef.current.lat] as [number, number])
      : ([-99.1332, 19.4326] as [number, number]);

    const initialZoom = initialCenterRef.current ? 13 : 11;

    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: initialCenter,
      zoom: initialZoom,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

    // Fly to user's location unless properties have already set bounds OR search coordinates exist
    if (navigator.geolocation && !initialCenterRef.current && !searchQuery) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!boundsFitRef.current) {
            map.flyTo({
              center: [pos.coords.longitude, pos.coords.latitude],
              zoom: 12,
              duration: 1200,
            });
          }
        },
        () => {} // denied or unavailable — stay at default
      );
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mapboxToken, searchQuery]);

  // Fly to centerCoordinates if they change after initialization
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !centerCoordinates) return;

    boundsFitRef.current = true;

    const flyToCoordinates = () => {
      map.flyTo({
        center: [centerCoordinates.lng, centerCoordinates.lat],
        zoom: 13,
        duration: 1500,
      });
    };

    if (map.loaded()) {
      flyToCoordinates();
    } else {
      map.once('load', flyToCoordinates);
    }
  }, [centerCoordinates]);

  // Fallback: Geocode searchQuery if centerCoordinates is NOT provided but searchQuery exists
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapboxToken || !searchQuery?.trim() || centerCoordinates) return;

    const geocodeAndFly = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            searchQuery
          )}.json?access_token=${mapboxToken}&limit=1&country=mx,us`
        );
        if (!response.ok) return;
        const data = await response.json();
        if (data?.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          boundsFitRef.current = true;
          map.flyTo({
            center: [lng, lat],
            zoom: 13,
            duration: 1500,
          });
        }
      } catch (error) {
        console.error('Error geocoding fallback in PropertyMap:', error);
      }
    };

    if (map.loaded()) {
      geocodeAndFly();
    } else {
      map.once('load', geocodeAndFly);
    }
  }, [searchQuery, centerCoordinates, mapboxToken]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const renderMarkers = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      properties.forEach((prop) => {
        const el = document.createElement('button');
        Object.assign(el.style, {
          background: 'transparent',
          border: 'none',
          padding: '0',
          cursor: 'pointer',
        });

        const inner = document.createElement('span');
        inner.textContent = prop.price;
        Object.assign(inner.style, {
          display: 'block',
          background: '#6E6259', // Gris topo
          color: '#FAF7F2',      // Beige claro
          padding: '5px 12px',
          borderRadius: '0px',   // Minimalista recto
          fontSize: '11px',
          fontWeight: '600',
          border: '1px solid #FAF7F2',
          boxShadow: '0 4px 12px rgba(110,98,89,0.15)',
          transition: 'transform 0.15s, background 0.15s',
          whiteSpace: 'nowrap',
          transformOrigin: 'center',
        });
        el.appendChild(inner);

        el.addEventListener('mouseenter', () => {
          inner.style.transform = 'scale(1.08)';
          inner.style.background = '#B76E4D'; // Terracota
        });
        el.addEventListener('mouseleave', () => {
          inner.style.transform = 'scale(1)';
          inner.style.background = '#6E6259'; // Gris topo
        });
        el.addEventListener('click', () => setSelected(prop));

        const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([prop.coordinates.lng, prop.coordinates.lat])
          .addTo(map);
        markersRef.current.push(marker);
      });

      if (properties.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        properties.forEach((p) =>
          bounds.extend([p.coordinates.lng, p.coordinates.lat])
        );
        boundsFitRef.current = true;
        map.fitBounds(bounds, { padding: 80, maxZoom: 14, duration: 800 });
      } else if (properties.length === 1) {
        boundsFitRef.current = true;
        map.flyTo({
          center: [properties[0].coordinates.lng, properties[0].coordinates.lat],
          zoom: 13,
        });
      }
    };

    if (map.loaded()) {
      renderMarkers();
    } else {
      map.once('load', renderMarkers);
    }
  }, [properties]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {selected && (
        <div className="absolute bottom-6 left-4 w-72 z-20 animate-fade-in">
          <div className="bg-white/85 backdrop-blur-xl border border-white/40 rounded-none shadow-elegant overflow-hidden text-[#6E6259]">
            <div className="relative bg-[#E9DDCF]/10">
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-36 object-cover"
                />
              ) : (
                <div className="w-full h-36 bg-[#E9DDCF]/20" />
              )}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 p-1.5 bg-[#6E6259]/80 text-[#FAF7F2] hover:bg-[#B76E4D] transition-colors rounded-none"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                <span className="text-white font-sans font-bold text-sm">{selected.price}</span>
              </div>
            </div>
            <div className="p-4 bg-white/45">
              <p className="font-serif text-base mb-1 line-clamp-1 font-medium">{selected.title}</p>
              <p className="text-[11px] text-[#6E6259]/60 font-light mb-3 truncate">{selected.area}</p>
              <div className="flex gap-3 text-[10px] text-[#6E6259]/65 font-medium border-t border-[#E9DDCF]/30 pt-2.5">
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[#B76E4D]" /> {selected.bedrooms} Rec.
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-[#B76E4D]" /> {selected.bathrooms} Baños
                </span>
                <span className="flex items-center gap-1">
                  <Square className="w-3.5 h-3.5 text-[#B76E4D]" /> {selected.sqm}m²
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!mapboxToken && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
          <p className="text-sm text-muted-foreground">Configurando mapa…</p>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;
