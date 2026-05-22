import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Filters {
  priceRange: [number, number];
  types: string[];
  bedrooms: number | null;
}

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  resultCount: number;
}

const PROPERTY_TYPES = [
  { id: 'casa', label: 'Casa' },
  { id: 'departamento', label: 'Departamento' },
  { id: 'penthouse', label: 'Penthouse' },
  { id: 'terreno', label: 'Terreno' },
];

export const DEFAULT_FILTERS: Filters = {
  priceRange: [0, 500_000_000],
  types: [],
  bedrooms: null,
};

const formatPrice = (v: number) => {
  if (v === 0) return '$0';
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(0)}M`;
  return `$${(v / 1_000).toFixed(0)}K`;
};

const chip =
  'flex items-center gap-1.5 px-3 py-2 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 select-none border border-transparent cursor-pointer';

const PropertyFilters = ({ filters, onFiltersChange, resultCount }: PropertyFiltersProps) => {
  const priceActive =
    filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
    filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1];
  const typesActive = filters.types.length > 0;
  const bedsActive = filters.bedrooms !== null;
  const anyActive = priceActive || typesActive || bedsActive;

  const typeLabel = typesActive
    ? filters.types.map((t) => PROPERTY_TYPES.find((x) => x.id === t)?.label).join(', ')
    : 'Tipo';

  return (
    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-3 py-2 shadow-elegant w-fit max-w-full overflow-x-auto">
      {/* Precio */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              chip,
              priceActive
                ? 'bg-[#B76E4D] text-white shadow-sm'
                : 'text-[#6E6259] bg-white/40 border-white/20 hover:bg-white/80 hover:text-[#B76E4D]'
            )}
          >
            {priceActive
              ? `${formatPrice(filters.priceRange[0])} – ${formatPrice(filters.priceRange[1])}`
              : 'Precio'}
            <ChevronDown className="w-3 h-3 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-5 bg-white/95 backdrop-blur-xl border border-white/45 shadow-elegant rounded-none" align="start">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-4">Rango de Precio</p>
          <Slider
            value={[filters.priceRange[0], filters.priceRange[1]]}
            max={500_000_000}
            min={0}
            step={1_000_000}
            onValueChange={(v) =>
              onFiltersChange({ ...filters, priceRange: [v[0], v[1]] as [number, number] })
            }
            className="mb-4"
          />
          <div className="flex justify-between text-xs font-semibold font-sans text-[#B76E4D]">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </PopoverContent>
      </Popover>

      <div className="w-px h-5 bg-white/30 shrink-0" />

      {/* Tipo */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              chip,
              typesActive
                ? 'bg-[#B76E4D] text-white shadow-sm'
                : 'text-[#6E6259] bg-white/40 border-white/20 hover:bg-white/80 hover:text-[#B76E4D]'
            )}
          >
            <span className="truncate max-w-[120px]">{typeLabel}</span>
            <ChevronDown className="w-3 h-3 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-4 bg-white/95 backdrop-blur-xl border border-white/45 shadow-elegant rounded-none" align="start">
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

      {/* Recámaras */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              chip,
              bedsActive
                ? 'bg-[#B76E4D] text-white shadow-sm'
                : 'text-[#6E6259] bg-white/40 border-white/20 hover:bg-white/80 hover:text-[#B76E4D]'
            )}
          >
            {bedsActive ? `${filters.bedrooms}+ Rec` : 'Recámaras'}
            <ChevronDown className="w-3 h-3 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-44 p-4 bg-white/95 backdrop-blur-xl border border-white/45 shadow-elegant rounded-none" align="start">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] mb-3">Recámaras Mínimas</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFiltersChange({ ...filters, bedrooms: null })}
              className={cn(
                'px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-colors font-semibold',
                filters.bedrooms === null
                  ? 'bg-[#B76E4D] text-white border-[#B76E4D]'
                  : 'border-border text-[#6E6259] hover:border-[#B76E4D] hover:text-[#B76E4D]'
              )}
            >
              Todas
            </button>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => onFiltersChange({ ...filters, bedrooms: n })}
                className={cn(
                  'w-8 h-8 rounded-none text-xs border transition-colors flex items-center justify-center font-bold',
                  filters.bedrooms === n
                    ? 'bg-[#B76E4D] text-white border-[#B76E4D]'
                    : 'border-border text-[#6E6259] hover:border-[#B76E4D] hover:text-[#B76E4D]'
                )}
              >
                {n}+
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {anyActive && (
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
      <span className="text-[10px] uppercase tracking-widest font-bold text-[#6E6259] px-2 whitespace-nowrap">
        {resultCount} {resultCount === 1 ? 'Propiedad' : 'Propiedades'}
      </span>
    </div>
  );
};

export default PropertyFilters;
