import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Map as MapIcon, List } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PropertyFilters, {
  Filters,
  DEFAULT_FILTERS,
  SEGMENTS,
  SUBSEGMENTS,
  AMENIDADES_OPTS,
} from '@/components/map/PropertyFilters';
import PropertyMap from '@/components/map/PropertyMap';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useSiteUser } from '@/hooks/useSiteUser';
import { cn } from '@/lib/utils';

interface ExtendedFilters extends Filters {
  action: number | null; // 1 = Venta, 2 = Renta
  search: string;        // Search term (Colonia, Nombre)
}

const EXTENDED_DEFAULT_FILTERS: ExtendedFilters = {
  ...DEFAULT_FILTERS,
  action: null,
  search: '',
};

// Best-effort mapping from a property's raw "tipo" string to a Vertical id,
// so the taxonomy filter (which the CBF property model doesn't natively carry)
// can still narrow results meaningfully.
const VERTICAL_ID_BY_TIPO: Record<string, number> = {
  casa: 1,
  departamento: 1,
  loft: 1,
  penthouse: 1,
  studio: 1,
  villa: 1,
  local: 2,
  'local comercial': 2,
  'plaza comercial': 2,
  restaurante: 2,
  oficina: 3,
  consultorio: 3,
  bodega: 4,
  nave: 4,
  'nave comercial': 4,
  'nave industrial': 4,
  'parque industrial': 4,
  hotel: 5,
  hotelero: 5,
  motel: 5,
  glamping: 5,
  hostal: 5,
  hospital: 6,
  clínica: 6,
  'residencia geriátrica': 6,
  lote: 7,
  terreno: 7,
  rancho: 7,
  hacienda: 7,
  finca: 7,
};

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<ExtendedFilters>(EXTENDED_DEFAULT_FILTERS);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');
  const { properties, isLoading } = useProperties({ limit: 100 });
  const { site } = useSiteUser();

  const mapboxToken = (site?.platform_config?.mapbox_token || import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '').trim();

  const centerCoordinates = useMemo(() => {
    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');
    if (latParam && lngParam) {
      const lat = parseFloat(latParam);
      const lng = parseFloat(lngParam);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
    return undefined;
  }, [searchParams]);

  // Synchronize Hero Section parameters on mount/param change
  useEffect(() => {
    const actionParam = searchParams.get('action');
    const typeParam = searchParams.get('type');
    const searchParam = searchParams.get('search');

    setFilters({
      ...EXTENDED_DEFAULT_FILTERS,
      types: typeParam ? [typeParam] : [],
      action: actionParam ? parseInt(actionParam) : null,
      search: searchParam ?? '',
    });
  }, [searchParams]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      // Price filter
      if (filters.priceRange[0] > 0 && p.precio < filters.priceRange[0]) return false;
      if (filters.priceRange[1] < 500_000_000 && p.precio > filters.priceRange[1]) return false;

      // Type filter
      if (filters.types.length > 0) {
        const tipo = (p.tipo ?? '').toLowerCase();
        if (!filters.types.some((t) => tipo.includes(t))) return false;
      }

      // Vertical taxonomy filter (best-effort, mapped from tipo since the
      // CBF property model doesn't carry an explicit vertical id)
      if (filters.verticalId !== null) {
        const verticalOfProp = VERTICAL_ID_BY_TIPO[(p.tipo ?? '').toLowerCase()] || null;
        if (verticalOfProp !== filters.verticalId) return false;
      }

      // Segment taxonomy filter (best-effort keyword/price-bracket match)
      if (filters.segmentId !== null) {
        if (filters.verticalId === 1) {
          const price = p.precio;
          if (filters.segmentId === 1 && price > 687_000) return false;
          if (filters.segmentId === 2 && (price < 400_000 || price > 1_200_000)) return false;
          if (filters.segmentId === 3 && (price < 1_200_000 || price > 2_500_000)) return false;
          if (filters.segmentId === 4 && (price < 2_500_000 || price > 5_100_000)) return false;
          if (filters.segmentId === 5 && (price < 5_100_000 || price > 15_000_000)) return false;
          if (filters.segmentId === 6 && price < 15_000_000) return false;
        } else {
          const segmentObj = Object.values(SEGMENTS).flat().find((s) => s.id === filters.segmentId);
          if (segmentObj) {
            const keywords = segmentObj.nombre.toLowerCase().split(/[ /]/).filter((w) => w.length > 3);
            const text = ((p.nombre ?? '') + ' ' + (p.descripcion ?? '') + ' ' + (p.tipo ?? '')).toLowerCase();
            const matchesSegment = keywords.some((kw) => text.includes(kw));
            if (!matchesSegment) return false;
          }
        }
      }

      // Subsegment taxonomy filter (best-effort keyword match)
      if (filters.subsegmentId !== null) {
        const subsegmentObj = Object.values(SUBSEGMENTS).flat().find((ss) => ss.id === filters.subsegmentId);
        if (subsegmentObj) {
          const subsegmentName = subsegmentObj.nombre.toLowerCase();
          const text = ((p.nombre ?? '') + ' ' + (p.descripcion ?? '') + ' ' + (p.tipo ?? '')).toLowerCase();
          let keywords = [subsegmentName];
          if (subsegmentName === 'casa en condominio' || subsegmentName === 'casa en coto privado') {
            keywords.push('condominio', 'coto', 'privada');
          } else if (subsegmentName === 'loft') {
            keywords.push('loft');
          } else if (subsegmentName === 'penthouse plus' || subsegmentName === 'penthouse ultra-lujo') {
            keywords.push('penthouse', 'ph');
          } else if (subsegmentName === 'glamping / eco-lodge') {
            keywords.push('glamping', 'cabana', 'eco');
          }
          const matchesSubsegment = keywords.some((kw) => text.includes(kw));
          if (!matchesSubsegment) return false;
        }
      }

      // Amenities filter (best-effort keyword match against text fields)
      if (filters.amenities.length > 0) {
        const desc = ((p.descripcion ?? '') + ' ' + p.nombre + ' ' + (p.caracteristicas ?? '')).toLowerCase();
        const allMatched = filters.amenities.every((amenityId) => {
          const amenityName = AMENIDADES_OPTS.find((a) => a.id === amenityId)?.label.toLowerCase();
          if (!amenityName) return false;
          let keywords = [amenityName];
          if (amenityName === 'alberca al aire libre' || amenityName === 'alberca techada') {
            keywords.push('alberca', 'piscina');
          } else if (amenityName === 'vigilancia 24 hrs' || amenityName === 'control de acceso') {
            keywords.push('vigilancia', 'seguridad', 'acceso', 'caseta');
          } else if (amenityName === 'estacionamiento de visitantes') {
            keywords.push('visitas', 'estacionamiento de visitas', 'cajon visitas');
          } else if (amenityName === 'bodega / storage') {
            keywords.push('bodega', 'storage');
          } else if (amenityName === 'rooftop / terraza') {
            keywords.push('rooftop', 'terraza', 'roof');
          } else if (amenityName === 'áreas verdes / jardines') {
            keywords.push('jardin', 'jardines', 'verde', 'green');
          } else if (amenityName === 'zona de mascotas (pet-friendly)') {
            keywords.push('mascotas', 'pet', 'perros');
          }
          return keywords.some((kw) => desc.includes(kw));
        });
        if (!allMatched) return false;
      }

      // Bedrooms / Bathrooms / Parking filters
      if (filters.bedrooms !== null && (p.habitaciones ?? 0) < filters.bedrooms) return false;
      if (filters.bathrooms !== null && (p.banios ?? 0) < filters.bathrooms) return false;
      if (filters.parking !== null && (p.estacionamientos ?? 0) < filters.parking) return false;

      // Area range filter
      if (filters.areaRange[0] > 0 && (p.area ?? 0) < filters.areaRange[0]) return false;
      if (filters.areaRange[1] < 100_000 && (p.area ?? 0) > filters.areaRange[1]) return false;

      // Transaction Action filter (1 = Venta, 2 = Renta)
      if (filters.action !== null && p.id_tipo_accion !== filters.action) return false;

      // Query text filter (Colonia, Nombre, Dirección)
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const nombre = (p.nombre ?? '').toLowerCase();
        const colonia = (p.colonia ?? '').toLowerCase();
        const direccion = (p.direccion ?? '').toLowerCase();
        if (!nombre.includes(query) && !colonia.includes(query) && !direccion.includes(query)) return false;
      }

      return true;
    });
  }, [properties, filters]);

  const mapProperties = useMemo(
    () =>
      filtered
        .filter((p) => p.latitud != null && p.longitud != null)
        .map((p) => ({
          id: p.id,
          title: p.nombre,
          location: p.colonia ?? '',
          area: p.colonia ?? '',
          price: new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits: 0,
          }).format(p.precio),
          priceValue: p.precio,
          image: p.imagenes_propiedades?.[0]?.image_url ?? '',
          bedrooms: p.habitaciones ?? 0,
          bathrooms: p.banios ?? 0,
          sqm: p.area ?? 0,
          type: (p.tipo ?? 'casa') as 'casa' | 'departamento' | 'penthouse' | 'terreno',
          coordinates: { lat: p.latitud!, lng: p.longitud! },
        })),
    [filtered]
  );

  return (
    <>
      <Helmet>
        <title>Explorar Propiedades | Raquel Meléndrez Inmobiliaria</title>
        <meta
          name="description"
          content="Explora nuestro catálogo exclusivo de propiedades residenciales en venta y renta en México y EE.UU."
        />
      </Helmet>

      <Navbar />

      <main className="pt-20 h-screen flex overflow-hidden bg-[#FAF7F2] relative">

        {/* Map column */}
        <div
          className={cn(
            'relative flex-1 min-w-0 bg-[#E9DDCF]/10 h-full',
            mobileView === 'map' ? 'flex' : 'hidden lg:flex'
          )}
        >
          <div className="absolute top-4 left-4 z-10 max-w-[92vw]">
            <PropertyFilters
              filters={filters}
              onFiltersChange={(f) => setFilters({ ...filters, ...f })}
              resultCount={filtered.length}
            />
          </div>
          <PropertyMap
            properties={mapProperties}
            mapboxToken={mapboxToken}
            searchQuery={filters.search}
            centerCoordinates={centerCoordinates}
          />
        </div>

        {/* Property list sidebar - Styled in beautiful liquidglass */}
        <aside
          className={cn(
            'flex-col w-full lg:w-96 border-l border-white/20 bg-white/45 backdrop-blur-xl shrink-0 shadow-elegant z-10 h-full',
            mobileView === 'list' ? 'flex' : 'hidden lg:flex'
          )}
        >
          <div className="px-6 py-5 border-b border-white/20 bg-white/10">
            <span className="text-[#B76E4D] text-[10px] uppercase tracking-widest font-bold block mb-1">
              Catálogo Curado
            </span>
            <h1 className="font-serif text-2xl text-[#6E6259] font-normal">Propiedades</h1>
            <p className="text-xs text-[#6E6259]/60 font-light mt-1">
              {isLoading ? 'Cargando catálogo…' : `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent pb-28 lg:pb-4">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} variant="compact" />
            ))}

            {!isLoading && filtered.length === 0 && (
              <div className="text-center py-20 px-4">
                <p className="font-serif text-lg text-[#6E6259]/80 font-normal">Sin resultados</p>
                <p className="text-xs text-[#6E6259]/60 font-light mt-2 max-w-[200px] mx-auto">
                  No hemos encontrado propiedades que coincidan con tu búsqueda. Intenta ajustar los filtros.
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile/tablet floating Toggle Map/List control — never covers >30% of viewport */}
        <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center bg-white/90 backdrop-blur-xl border border-white/40 rounded-full p-1 shadow-elegant">
          <button
            onClick={() => setMobileView('map')}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-colors duration-300',
              mobileView === 'map' ? 'bg-[#B76E4D] text-white' : 'text-[#6E6259]'
            )}
          >
            <MapIcon className="w-3.5 h-3.5" />
            Mapa
          </button>
          <button
            onClick={() => setMobileView('list')}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-colors duration-300',
              mobileView === 'list' ? 'bg-[#B76E4D] text-white' : 'text-[#6E6259]'
            )}
          >
            <List className="w-3.5 h-3.5" />
            Lista ({filtered.length})
          </button>
        </div>
      </main>
    </>
  );
};

export default MapPage;
