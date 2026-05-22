import { Link } from 'react-router-dom';
import { Bed, Bath, Square } from 'lucide-react';
import { CBFProperty, formatPrice } from '@/lib/cbf';

interface PropertyCardProps {
  property: CBFProperty;
  variant?: 'default' | 'compact';
}

const PropertyCard = ({ property, variant = 'default' }: PropertyCardProps) => {
  const image = property.imagenes_propiedades?.[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.direccion].filter(Boolean).join(' • ') || '';

  if (variant === 'compact') {
    return (
      <Link
        to={`/properties/${property.id}`}
        className="group block bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden hover:bg-white/85 hover:shadow-elegant transition-all duration-500 shadow-sm"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#E9DDCF]/10">
          <img
            src={image}
            alt={property.nombre}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-60" />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-0.5 bg-[#B76E4D] text-white text-[9px] uppercase tracking-wider font-sans font-bold rounded-full">
              {badge}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <span className="text-[#FAF7F2] font-sans font-semibold text-sm drop-shadow-sm">
              {formatPrice(property.precio)}
            </span>
          </div>
        </div>
        <div className="p-4 bg-transparent">
          <h3 className="font-serif text-[#6E6259] text-sm group-hover:text-[#B76E4D] transition-colors mb-1 truncate font-medium">
            {property.nombre}
          </h3>
          <p className="font-sans text-[10px] text-[#6E6259]/60 mb-3 truncate font-light">{location}</p>
          <div className="flex gap-4 text-[9px] text-[#6E6259]/50 border-t border-[#E9DDCF]/25 pt-2.5">
            {property.habitaciones != null && (
              <span className="flex items-center gap-1">
                <Bed className="w-3 h-3 text-[#B76E4D]" />
                {property.habitaciones} Rec.
              </span>
            )}
            {property.banios != null && (
              <span className="flex items-center gap-1">
                <Bath className="w-3 h-3 text-[#B76E4D]" />
                {property.banios} Baños
              </span>
            )}
            {property.area != null && (
              <span className="flex items-center gap-1">
                <Square className="w-3 h-3 text-[#B76E4D]" />
                {property.area}m²
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/properties/${property.id}`}
      className="min-w-[85vw] sm:min-w-[45vw] md:min-w-[32vw] group cursor-pointer block bg-white/40 backdrop-blur-md border border-white/30 p-4 rounded-3xl shadow-card hover:shadow-elegant hover:bg-white/80 transition-all duration-500"
    >
      <div className="relative aspect-[4/3] mb-5 overflow-hidden bg-[#E9DDCF]/10 rounded-2xl">
        <img
          src={image}
          alt={property.nombre}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#B76E4D] text-white text-[9px] uppercase tracking-widest font-sans font-bold rounded-full">
            {badge}
          </span>
        </div>
      </div>
      <div className="px-1 pb-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="font-serif text-[#6E6259] text-lg sm:text-xl group-hover:text-[#B76E4D] transition-colors leading-snug truncate font-normal">
            {property.nombre}
          </h3>
          <span className="font-sans font-bold text-base sm:text-lg text-[#B76E4D] whitespace-nowrap">
            {formatPrice(property.precio)}
          </span>
        </div>
        
        <p className="font-sans text-xs text-[#6E6259]/65 mb-4 truncate font-light">
          {location}
        </p>

        <div className="flex gap-5 text-[10px] sm:text-xs text-[#6E6259]/60 border-t border-[#E9DDCF]/20 pt-3">
          {property.habitaciones != null && (
            <span className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#B76E4D] shrink-0" />
              {property.habitaciones} Rec.
            </span>
          )}
          {property.banios != null && (
            <span className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-[#B76E4D] shrink-0" />
              {property.banios} Baños
            </span>
          )}
          {property.area != null && (
            <span className="flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5 text-[#B76E4D] shrink-0" />
              {property.area} m²
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
