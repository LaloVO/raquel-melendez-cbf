import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from '@/components/ui/popover';
import { ChevronDown, X, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Filters {
  priceRange: [number, number];
  types: string[];
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number | null;
  areaRange: [number, number];
  amenities: number[];
  verticalId: number | null;
  segmentId: number | null;
  subsegmentId: number | null;
}

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  resultCount: number;
}

export const PROPERTY_TYPES = [
  { id: 'casa', label: 'Casa' },
  { id: 'departamento', label: 'Departamento' },
  { id: 'terreno', label: 'Terreno' },
  { id: 'oficina', label: 'Oficina' },
  { id: 'local', label: 'Local comercial' },
  { id: 'bodega', label: 'Bodega' },
  { id: 'loft', label: 'Loft' },
  { id: 'lote', label: 'Lote' },
  { id: 'nave', label: 'Nave comercial' },
  { id: 'hotel', label: 'Hotel' },
  { id: 'hospital', label: 'Hospital' },
];

export const DEFAULT_FILTERS: Filters = {
  priceRange: [0, 500_000_000],
  types: [],
  bedrooms: null,
  bathrooms: null,
  parking: null,
  areaRange: [0, 100_000],
  amenities: [],
  verticalId: null,
  segmentId: null,
  subsegmentId: null,
};

export const VERTICALS = [
  { id: 1, nombre: "Residencial", icon: "home" },
  { id: 2, nombre: "Comercial", icon: "store" },
  { id: 3, nombre: "Oficinas", icon: "building-2" },
  { id: 4, nombre: "Industrial", icon: "factory" },
  { id: 5, nombre: "Hospitalidad", icon: "hotel" },
  { id: 6, nombre: "Salud", icon: "heart-pulse" },
  { id: 7, nombre: "Terrenos / Suelo", icon: "map" },
  { id: 8, nombre: "Proyectos Especializados", icon: "cpu" }
];

export const SEGMENTS: Record<number, { id: number, nombre: string }[]> = {
  1: [
    { id: 1, nombre: "Interés Social / Popular" },
    { id: 2, nombre: "Económico" },
    { id: 3, nombre: "Medio / Tradicional" },
    { id: 4, nombre: "Residencial" },
    { id: 5, nombre: "Residencial PLUS" },
    { id: 6, nombre: "Lujo / Ultra-Lujo" }
  ],
  2: [
    { id: 7, nombre: "Comercio a Pie de Calle" },
    { id: 8, nombre: "Centros Comerciales" },
    { id: 9, nombre: "Plazas de Conveniencia" },
    { id: 10, nombre: "Restaurantes y F&B" }
  ],
  3: [
    { id: 11, nombre: "Clase A+ / A" },
    { id: 12, nombre: "Clase B" },
    { id: 13, nombre: "Clase C" },
    { id: 14, nombre: "Coworking / Flex" }
  ],
  4: [
    { id: 15, nombre: "Clase A (AMPIP)" },
    { id: 16, nombre: "Clase B" },
    { id: 17, nombre: "Clase C" }
  ],
  5: [
    { id: 18, nombre: "5 Estrellas" },
    { id: 19, nombre: "4 Estrellas" },
    { id: 20, nombre: "3 Estrellas" },
    { id: 21, nombre: "Sin Categoría / Alternativo" }
  ],
  6: [
    { id: 22, nombre: "Atención Primaria" },
    { id: 23, nombre: "Atención Ambulatoria" },
    { id: 24, nombre: "Hospitalización" },
    { id: 25, nombre: "Cuidado Especializado" }
  ],
  7: [
    { id: 26, nombre: "Suelo Urbano" },
    { id: 27, nombre: "Suelo de Expansión" },
    { id: 28, nombre: "Suelo Agrícola" },
    { id: 29, nombre: "Rural de Nicho / Ecoturístico" }
  ],
  8: [
    { id: 30, nombre: "Usos Mixtos" },
    { id: 31, nombre: "Infraestructura Tecnológica" },
    { id: 32, nombre: "Educativo / Institucional" }
  ]
};

export const SUBSEGMENTS: Record<number, { id: number, nombre: string }[]> = {
  1: [
    { id: 1, nombre: "Vivienda Progresiva" },
    { id: 2, nombre: "Unidad Habitacional" }
  ],
  2: [
    { id: 3, nombre: "Casa en Serie" },
    { id: 4, nombre: "Departamento Económico" }
  ],
  3: [
    { id: 5, nombre: "Casa en Fraccionamiento" },
    { id: 6, nombre: "Departamento Medio" },
    { id: 7, nombre: "Townhouse Medio" }
  ],
  4: [
    { id: 8, nombre: "Casa en Coto Privado" },
    { id: 9, nombre: "Departamento Premium" },
    { id: 10, nombre: "Townhouse Residencial" }
  ],
  5: [
    { id: 11, nombre: "Casa de Autor" },
    { id: 12, nombre: "Penthouse PLUS" },
    { id: 13, nombre: "Garden House PLUS" }
  ],
  6: [
    { id: 14, nombre: "Mansión" },
    { id: 15, nombre: "Villa de Lujo" },
    { id: 16, nombre: "Penthouse Ultra-Lujo" }
  ],
  7: [
    { id: 17, nombre: "Local en Corredor Comercial" },
    { id: 18, nombre: "Local en Colonia" }
  ],
  8: [
    { id: 19, nombre: "Mall / Centro Comercial" },
    { id: 20, nombre: "Lifestyle Center" },
    { id: 21, nombre: "Power Center" }
  ],
  9: [
    { id: 22, nombre: "Strip Mall" },
    { id: 23, nombre: "Plaza de Barrio" }
  ],
  10: [
    { id: 24, nombre: "Restaurante Full Service" },
    { id: 25, nombre: "Dark Kitchen" },
    { id: 26, nombre: "Food Hall" }
  ],
  11: [
    { id: 27, nombre: "Torre Corporativa A+" },
    { id: 28, nombre: "Edificio Clase A" }
  ],
  12: [
    { id: 29, nombre: "Edificio Clase B" }
  ],
  13: [
    { id: 30, nombre: "Edificio Clase C" }
  ],
  14: [
    { id: 31, nombre: "Coworking Compartido" },
    { id: 32, nombre: "Oficina Privada Flex" }
  ],
  15: [
    { id: 33, nombre: "Nave Logística Clase A" },
    { id: 34, nombre: "Nave de Manufactura Clase A" },
    { id: 35, nombre: "Cold Storage" },
    { id: 36, nombre: "Parque Industrial Certificado" }
  ],
  16: [
    { id: 37, nombre: "Nave Logística Clase B" },
    { id: 38, nombre: "Nave de Manufactura Clase B" }
  ],
  17: [
    { id: 39, nombre: "Bodega Clase C" },
    { id: 40, nombre: "Nave Clase C" }
  ],
  18: [
    { id: 41, nombre: "Gran Hotel Urbano" },
    { id: 42, nombre: "Resort de Playa 5*" }
  ],
  19: [
    { id: 43, nombre: "Hotel Business 4*" }
  ],
  20: [
    { id: 44, nombre: "Hotel Estándar 3*" }
  ],
  21: [
    { id: 45, nombre: "Boutique Hotel" },
    { id: 46, nombre: "Glamping / Eco-Lodge" },
    { id: 47, nombre: "Hostal" }
  ],
  22: [
    { id: 48, nombre: "Consultorio General" },
    { id: 49, nombre: "Consultorio de Especialidad" }
  ],
  23: [
    { id: 50, nombre: "Clínica Ambulatoria" },
    { id: 51, nombre: "Centro de Diagnóstico" }
  ],
  24: [
    { id: 52, nombre: "Hospital General" },
    { id: 53, nombre: "Hospital de Alta Especialidad" }
  ],
  25: [
    { id: 54, nombre: "Residencia de Adultos Mayores" },
    { id: 55, nombre: "Memory Care" }
  ],
  26: [
    { id: 56, nombre: "Lote Residencial Urbano" },
    { id: 57, nombre: "Lote Comercial Urbano" },
    { id: 58, nombre: "Lote Industrial Urbano" }
  ],
  27: [
    { id: 59, nombre: "Macrolote para Desarrollo" }
  ],
  28: [
    { id: 60, nombre: "Tierra de Riego" },
    { id: 61, nombre: "Tierra de Temporal" }
  ],
  29: [
    { id: 62, nombre: "Hacienda / Casco" },
    { id: 63, nombre: "Viñedo / Quinta" },
    { id: 64, nombre: "Cenote / Isla" }
  ],
  30: [
    { id: 65, nombre: "Proyecto Vertical Mixto" },
    { id: 66, nombre: "Distrito Urbano Planeado" }
  ],
  31: [
    { id: 67, nombre: "Data Center Tier I" },
    { id: 68, nombre: "Data Center Tier II" },
    { id: 69, nombre: "Data Center Tier III" },
    { id: 70, nombre: "Data Center Tier IV" }
  ],
  32: [
    { id: 71, nombre: "Campus Educativo" }
  ]
};

export const AMENIDADES_OPTS = [
  { id: 1, label: 'Gimnasio' },
  { id: 2, label: 'Alberca al aire libre' },
  { id: 3, label: 'Alberca techada' },
  { id: 4, label: 'Spa / Sauna / Vapor' },
  { id: 5, label: 'Jacuzzi' },
  { id: 6, label: 'Yoga room' },
  { id: 7, label: 'Salón de eventos' },
  { id: 8, label: 'Rooftop / Terraza' },
  { id: 9, label: 'Sala de estar' },
  { id: 10, label: 'Área de asadores / BBQ' },
  { id: 11, label: 'Bar / Lounge' },
  { id: 12, label: 'Kids club' },
  { id: 13, label: 'Teens club' },
  { id: 14, label: 'Canchas de pádel' },
  { id: 15, label: 'Cancha de tenis' },
  { id: 16, label: 'Área deportiva' },
  { id: 17, label: 'Pista de jogging' },
  { id: 18, label: 'Coworking' },
  { id: 19, label: 'Business center' },
  { id: 20, label: 'Sala de juntas' },
  { id: 21, label: 'Elevador' },
  { id: 22, label: 'Estacionamiento de visitantes' },
  { id: 23, label: 'Vigilancia 24 hrs' },
  { id: 24, label: 'Control de acceso' },
  { id: 25, label: 'Concierge' },
  { id: 26, label: 'Lavandería' },
  { id: 27, label: 'Bodega / Storage' },
  { id: 28, label: 'Áreas verdes / Jardines' },
  { id: 29, label: 'Roof garden' },
  { id: 30, label: 'Zona de mascotas (Pet-friendly)' },
  { id: 31, label: 'Huerto urbano' },
  { id: 32, label: 'Cine / Sala multimedia' },
  { id: 33, label: 'Salón de juegos' },
  { id: 34, label: 'Biblioteca' },
  { id: 35, label: 'Andenes de carga' },
  { id: 36, label: 'Patio de maniobras' },
  { id: 37, label: 'Planta de tratamiento' },
  { id: 38, label: 'Subestación eléctrica' },
  { id: 39, label: 'Báscula industrial' }
];

export const AMENIDADES_POR_VERTICAL: Record<number, number[]> = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33],
  2: [7, 8, 11, 19, 20, 21, 22, 23, 24, 25, 26, 27, 34],
  3: [1, 6, 7, 8, 11, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 32, 34],
  4: [22, 23, 24, 27, 35, 36, 37, 38, 39],
  5: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 21, 22, 23, 24, 25, 26, 32],
  6: [16, 21, 22, 23, 24],
  7: [22, 23, 27, 28],
  8: [18, 19, 20, 21, 23, 24],
};

const VERTICALES_CON_RECAMARAS = new Set([1, 5]);
const VERTICALES_CON_BANIOS = new Set([1, 2, 5, 6]);
const VERTICALES_CON_ESTACIONAMIENTOS = new Set([1, 2, 3, 5]);

const formatPrice = (v: number) => {
  if (v === 0) return '$0';
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(0)}M`;
  return `$${(v / 1_000).toFixed(0)}K`;
};

const chip =
  'flex items-center gap-1.5 px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 select-none border border-transparent cursor-pointer shrink-0';

const chipActive = 'bg-[#B76E4D] text-white shadow-sm';
const chipInactive = 'text-[#6E6259] bg-white/40 border-white/20 hover:bg-white/80 hover:text-[#B76E4D]';

const popoverClass =
  'bg-white/95 backdrop-blur-xl border border-white/45 shadow-elegant rounded-none';

const inputClass =
  'w-full bg-[#FAF7F2] border border-[#E9DDCF] rounded-none px-3 py-2 text-xs outline-none focus:border-[#B76E4D] text-[#2E251E] font-medium';

const stepBtn = (active: boolean) =>
  cn(
    'px-2.5 py-1 text-[10px] uppercase tracking-widest border transition-colors font-bold rounded-none',
    active
      ? 'bg-[#B76E4D] text-white border-[#B76E4D]'
      : 'border-[#E9DDCF] text-[#6E6259] hover:border-[#B76E4D] hover:text-[#B76E4D]'
  );

const stepBtnSquare = (active: boolean) =>
  cn(
    'w-8 h-8 rounded-none text-xs border transition-colors flex items-center justify-center font-bold',
    active
      ? 'bg-[#B76E4D] text-white border-[#B76E4D]'
      : 'border-[#E9DDCF] text-[#6E6259] hover:border-[#B76E4D] hover:text-[#B76E4D]'
  );

const PropertyFilters = ({ filters, onFiltersChange, resultCount }: PropertyFiltersProps) => {
  const priceActive =
    filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
    filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1];
  const typesActive = filters.types.length > 0;
  const bedsActive = filters.bedrooms !== null;
  const bathsActive = filters.bathrooms !== null;
  const parkingActive = filters.parking !== null;
  const areaActive =
    filters.areaRange[0] !== DEFAULT_FILTERS.areaRange[0] ||
    filters.areaRange[1] !== DEFAULT_FILTERS.areaRange[1];
  const amenitiesActive = filters.amenities.length > 0;
  const taxonomyActive =
    filters.verticalId !== null ||
    filters.segmentId !== null ||
    filters.subsegmentId !== null;

  const moreFiltersActive =
    bedsActive ||
    bathsActive ||
    parkingActive ||
    areaActive ||
    amenitiesActive ||
    taxonomyActive;

  const activeFilterCount = [
    priceActive,
    typesActive,
    bedsActive,
    bathsActive,
    parkingActive,
    areaActive,
    amenitiesActive,
    taxonomyActive,
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;

  const typeLabel = typesActive
    ? filters.types.map((t) => PROPERTY_TYPES.find((x) => x.id === t)?.label).join(', ')
    : 'Tipo';

  const selectedVertical = VERTICALS.find(v => v.id === filters.verticalId);
  const segmentsForVertical = filters.verticalId ? SEGMENTS[filters.verticalId] || [] : [];
  const subsegmentsForSegment = filters.segmentId ? SUBSEGMENTS[filters.segmentId] || [] : [];

  const visibleAmenities = filters.verticalId
    ? AMENIDADES_OPTS.filter(a => AMENIDADES_POR_VERTICAL[filters.verticalId!]?.includes(a.id))
    : AMENIDADES_OPTS;

  const showRecamaras = !filters.verticalId || VERTICALES_CON_RECAMARAS.has(filters.verticalId);
  const showBanios = !filters.verticalId || VERTICALES_CON_BANIOS.has(filters.verticalId);
  const showEstacionamientos = !filters.verticalId || VERTICALES_CON_ESTACIONAMIENTOS.has(filters.verticalId);

  return (
    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-3 py-2 shadow-elegant w-fit max-w-full overflow-x-auto scrollbar-none">
      {/* Precio */}
      <Popover>
        <PopoverTrigger asChild>
          <button className={cn(chip, priceActive ? chipActive : chipInactive)}>
            {priceActive
              ? `${formatPrice(filters.priceRange[0])} – ${formatPrice(filters.priceRange[1])}`
              : 'Precio'}
            <ChevronDown className="w-3 h-3 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-72 p-5', popoverClass)} align="start">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-4">Rango de Precio</p>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-[9px] text-[#6E6259] uppercase block mb-1 font-bold">Mínimo</label>
              <input
                type="number"
                value={filters.priceRange[0] === 0 ? '' : filters.priceRange[0]}
                placeholder="Ej. 500,000"
                onChange={(e) => {
                  const minVal = e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value, 10));
                  onFiltersChange({ ...filters, priceRange: [minVal, filters.priceRange[1]] });
                }}
                className={inputClass}
              />
            </div>
            <span className="text-[#6E6259] self-end mb-2">—</span>
            <div className="flex-1">
              <label className="text-[9px] text-[#6E6259] uppercase block mb-1 font-bold">Máximo</label>
              <input
                type="number"
                value={filters.priceRange[1] === 500_000_000 ? '' : filters.priceRange[1]}
                placeholder="Ej. 5,000,000"
                onChange={(e) => {
                  const maxVal = e.target.value === '' ? 500_000_000 : Math.max(0, parseInt(e.target.value, 10));
                  onFiltersChange({ ...filters, priceRange: [filters.priceRange[0], maxVal] });
                }}
                className={inputClass}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="w-px h-5 bg-white/30 shrink-0" />

      {/* Tipo */}
      <Popover>
        <PopoverTrigger asChild>
          <button className={cn(chip, typesActive ? chipActive : chipInactive)}>
            <span className="truncate max-w-[120px]">{typeLabel}</span>
            <ChevronDown className="w-3 h-3 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-56 p-4 max-h-80 overflow-y-auto', popoverClass)} align="start">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-3">Tipo de Inmueble</p>
          <div className="space-y-1">
            {PROPERTY_TYPES.map((t) => {
              const active = filters.types.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    const newTypes = active
                      ? filters.types.filter((x) => x !== t.id)
                      : [...filters.types, t.id];
                    onFiltersChange({ ...filters, types: newTypes });
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2 text-xs uppercase tracking-widest transition-colors font-medium border border-transparent',
                    active
                      ? 'bg-[#B76E4D] text-white font-semibold'
                      : 'text-[#6E6259] hover:bg-[#FAF7F2] hover:text-[#B76E4D]'
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      <div className="w-px h-5 bg-white/30 shrink-0" />

      {/* Filtros avanzados */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              chip,
              moreFiltersActive ? chipActive : 'text-[#6E6259] bg-white/40 border-white/20 hover:bg-white/80 hover:text-[#B76E4D]'
            )}
          >
            <Filter className="w-3 h-3 shrink-0" />
            <span>Filtros Avanzados</span>
            {activeFilterCount > 0 && (
              <span className="bg-white text-[#B76E4D] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                {activeFilterCount}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-80 p-5 space-y-4 max-h-[75vh] overflow-y-auto', popoverClass)} align="start">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E9DDCF]">
            <Filter className="w-4 h-4 text-[#B76E4D]" />
            <span className="font-bold text-xs uppercase tracking-widest text-[#2E251E]">Filtros de búsqueda</span>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-2">Vertical Inmobiliaria</p>
            <select
              value={filters.verticalId || ''}
              onChange={(e) => {
                const nextVal = e.target.value ? Number(e.target.value) : null;
                onFiltersChange({
                  ...filters,
                  verticalId: nextVal,
                  segmentId: null,
                  subsegmentId: null,
                  amenities: [],
                });
              }}
              className={inputClass}
            >
              <option value="">Todas las Verticales</option>
              {VERTICALS.map(v => (
                <option key={v.id} value={v.id}>{v.nombre}</option>
              ))}
            </select>
          </div>

          {filters.verticalId && segmentsForVertical.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-2">Segmento / Nivel</p>
              <select
                value={filters.segmentId || ''}
                onChange={(e) => {
                  const nextVal = e.target.value ? Number(e.target.value) : null;
                  onFiltersChange({ ...filters, segmentId: nextVal, subsegmentId: null });
                }}
                className={inputClass}
              >
                <option value="">Todos los Segmentos</option>
                {segmentsForVertical.map(s => (
                  <option key={s.id} value={s.id}>{s.nombre}</option>
                ))}
              </select>
            </div>
          )}

          {filters.segmentId && subsegmentsForSegment.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-2">Tipo específico</p>
              <select
                value={filters.subsegmentId || ''}
                onChange={(e) => {
                  const nextVal = e.target.value ? Number(e.target.value) : null;
                  onFiltersChange({ ...filters, subsegmentId: nextVal });
                }}
                className={inputClass}
              >
                <option value="">Todos los tipos específicos</option>
                {subsegmentsForSegment.map(ss => (
                  <option key={ss.id} value={ss.id}>{ss.nombre}</option>
                ))}
              </select>
            </div>
          )}

          <div className="border-t border-[#E9DDCF] pt-3" />

          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-2">Superficie (m²)</p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-[9px] text-[#6E6259] uppercase block mb-1 font-bold">Mínima</label>
                <input
                  type="number"
                  value={filters.areaRange[0] === 0 ? '' : filters.areaRange[0]}
                  placeholder="Ej. 50"
                  onChange={(e) => {
                    const minVal = e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value, 10));
                    onFiltersChange({ ...filters, areaRange: [minVal, filters.areaRange[1]] });
                  }}
                  className={inputClass}
                />
              </div>
              <span className="text-[#6E6259] self-end mb-2">—</span>
              <div className="flex-1">
                <label className="text-[9px] text-[#6E6259] uppercase block mb-1 font-bold">Máxima</label>
                <input
                  type="number"
                  value={filters.areaRange[1] === 100_000 ? '' : filters.areaRange[1]}
                  placeholder="Ej. 5,000"
                  onChange={(e) => {
                    const maxVal = e.target.value === '' ? 100_000 : Math.max(0, parseInt(e.target.value, 10));
                    onFiltersChange({ ...filters, areaRange: [filters.areaRange[0], maxVal] });
                  }}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {showRecamaras && (
            <div className="border-t border-[#E9DDCF] pt-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-2">Recámaras</p>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => onFiltersChange({ ...filters, bedrooms: null })} className={stepBtn(filters.bedrooms === null)}>
                  Todas
                </button>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => onFiltersChange({ ...filters, bedrooms: n })} className={stepBtnSquare(filters.bedrooms === n)}>
                    {n}+
                  </button>
                ))}
              </div>
            </div>
          )}

          {showBanios && (
            <div className="border-t border-[#E9DDCF] pt-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-2">Baños</p>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => onFiltersChange({ ...filters, bathrooms: null })} className={stepBtn(filters.bathrooms === null)}>
                  Todos
                </button>
                {[1, 2, 3, 4].map((n) => (
                  <button key={n} onClick={() => onFiltersChange({ ...filters, bathrooms: n })} className={stepBtnSquare(filters.bathrooms === n)}>
                    {n}+
                  </button>
                ))}
              </div>
            </div>
          )}

          {showEstacionamientos && (
            <div className="border-t border-[#E9DDCF] pt-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-2">Estacionamientos</p>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => onFiltersChange({ ...filters, parking: null })} className={stepBtn(filters.parking === null)}>
                  Todos
                </button>
                {[1, 2, 3].map((n) => (
                  <button key={n} onClick={() => onFiltersChange({ ...filters, parking: n })} className={stepBtnSquare(filters.parking === n)}>
                    {n}+
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-[#E9DDCF] pt-3">
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-2.5">
              Amenidades {selectedVertical ? `(${selectedVertical.nombre})` : ''}
            </p>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 max-h-48 overflow-y-auto pr-1">
              {visibleAmenities.map((a) => {
                const active = filters.amenities.includes(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => {
                      const next = active
                        ? filters.amenities.filter((x) => x !== a.id)
                        : [...filters.amenities, a.id];
                      onFiltersChange({ ...filters, amenities: next });
                    }}
                    className={cn(
                      'flex items-center gap-1.5 px-2 py-1.5 border text-[9px] font-sans font-bold uppercase tracking-wider rounded-none transition-all text-left bg-transparent',
                      active
                        ? 'border-[#B76E4D] text-[#B76E4D] bg-[#B76E4D]/5'
                        : 'border-[#E9DDCF] text-[#6E6259] hover:border-[#B76E4D] hover:text-[#B76E4D]'
                    )}
                  >
                    <span>{active ? '✓' : '+'}</span>
                    <span className="truncate">{a.label}</span>
                  </button>
                );
              })}
            </div>
            {!filters.verticalId && (
              <p className="text-[9px] text-[#6E6259] text-center mt-2 italic">
                Tip: Selecciona una Vertical arriba para ver amenidades exclusivas de ese tipo.
              </p>
            )}
          </div>

          <div className="flex gap-2 border-t border-[#E9DDCF] pt-3.5">
            <button
              onClick={() => onFiltersChange(DEFAULT_FILTERS)}
              className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest bg-[#FAF7F2] hover:bg-[#E9DDCF] text-[#6E6259] rounded-none transition-colors"
            >
              Limpiar
            </button>
            <PopoverClose asChild>
              <button
                className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest bg-[#B76E4D] hover:bg-[#B76E4D]/90 text-white rounded-none transition-colors shadow-sm"
              >
                Aplicar
              </button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>

      {hasActiveFilters && (
        <>
          <div className="w-px h-5 bg-white/30 shrink-0" />
          <button
            onClick={() => onFiltersChange(DEFAULT_FILTERS)}
            className="p-2 bg-white/40 hover:bg-white/80 border border-white/20 text-[#6E6259] hover:text-[#B76E4D] transition-colors duration-300 rounded-full"
            title="Limpiar filtros"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </>
      )}

      <div className="w-px h-5 bg-white/30 shrink-0" />
      <span className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] px-2 whitespace-nowrap shrink-0">
        {resultCount} {resultCount === 1 ? 'Propiedad' : 'Propiedades'}
      </span>
    </div>
  );
};

export default PropertyFilters;
