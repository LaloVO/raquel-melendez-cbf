import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PropertyFilters, { Filters } from '@/components/map/PropertyFilters';
import PropertyMap from '@/components/map/PropertyMap';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useSiteUser } from '@/hooks/useSiteUser';

const DEFAULT_FILTERS: Filters = {
  priceRange: [0, 500_000_000],
  types: [],
  bedrooms: null,
};

interface ExtendedFilters extends Filters {
  action: number | null; // 1 = Venta, 2 = Renta
  search: string;        // Search term (Colonia, Nombre)
}

const EXTENDED_DEFAULT_FILTERS: ExtendedFilters = {
  ...DEFAULT_FILTERS,
  action: null,
  search: '',
};

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<ExtendedFilters>(EXTENDED_DEFAULT_FILTERS);
  const { properties, isLoading } = useProperties({ limit: 100 });
  const { site } = useSiteUser();

  const mapboxToken = (site?.platform_config?.mapbox_token || import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '').trim();

  // Synchronize Hero Section parameters on mount/param change
  useEffect(() => {
    const actionParam = searchParams.get('action');
    const typeParam = searchParams.get('type');
    const searchParam = searchParams.get('search');

    setFilters({
      priceRange: [0, 500_000_000],
      types: typeParam ? [typeParam] : [],
      bedrooms: null,
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
      
      // Bedrooms filter
      if (filters.bedrooms !== null && (p.habitaciones ?? 0) < filters.bedrooms) return false;
      
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
        <title>Explorar Propiedades | Ralque Meléndez Inmobiliaria</title>
        <meta
          name="description"
          content="Explora nuestro catálogo exclusivo de propiedades residenciales en venta y renta en México y EE.UU."
        />
      </Helmet>

      <Navbar />

      <main className="pt-20 h-screen flex overflow-hidden bg-[#FAF7F2]">
        
        {/* Map column */}
        <div className="relative flex-1 min-w-0 bg-[#E9DDCF]/10">
          <div className="absolute top-4 left-4 z-10">
            <PropertyFilters
              filters={filters}
              onFiltersChange={(f) => setFilters({ ...filters, ...f })}
              resultCount={filtered.length}
            />
          </div>
          <PropertyMap properties={mapProperties} mapboxToken={mapboxToken} />
        </div>

        {/* Property list sidebar - Styled in beautiful liquidglass */}
        <aside className="hidden lg:flex flex-col w-96 border-l border-white/20 bg-white/45 backdrop-blur-xl shrink-0 shadow-elegant z-10">
          <div className="px-6 py-5 border-b border-white/20 bg-white/10">
            <span className="text-[#B76E4D] text-[10px] uppercase tracking-widest font-bold block mb-1">
              Catálogo Curado
            </span>
            <h1 className="font-serif text-2xl text-[#6E6259] font-normal">Propiedades</h1>
            <p className="text-xs text-[#6E6259]/60 font-light mt-1">
              {isLoading ? 'Cargando catálogo…' : `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
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
      </main>
    </>
  );
};

export default MapPage;
