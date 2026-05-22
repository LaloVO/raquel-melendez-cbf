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
      <Link to={`/properties/${property.id}`} className="group block bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={image} alt={property.nombre} className="w-full h-full object-cover image-zoom" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-sans font-medium rounded-full">
              {badge}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-luxury-white font-sans font-medium text-lg">
              {formatPrice(property.precio)}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors mb-1 truncate">
            {property.nombre}
          </h3>
          <p className="font-sans text-sm text-muted-foreground mb-3 truncate">{location}</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            {property.habitaciones != null && (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5" />
                {property.habitaciones}
              </span>
            )}
            {property.banios != null && (
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5" />
                {property.banios}
              </span>
            )}
            {property.area != null && (
              <span className="flex items-center gap-1">
                <Square className="w-3.5 h-3.5" />
                {property.area}m²
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/properties/${property.id}`} className="min-w-[85vw] md:min-w-[40vw] group cursor-pointer snap-center block">
      <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg">
        <img src={image} alt={property.nombre} className="w-full h-full object-cover image-zoom" />
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 bg-primary text-primary-foreground text-xs font-sans font-medium rounded-full">
            {badge}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif text-2xl text-foreground mb-1 group-hover:text-primary transition-colors">
            {property.nombre}
          </h3>
          <p className="font-sans text-sm text-muted-foreground">
            {location}{property.area ? ` • ${property.area}m²` : ''}
          </p>
        </div>
        <span className="font-sans font-medium text-lg whitespace-nowrap ml-4">
          {formatPrice(property.precio)}
        </span>
      </div>
    </Link>
  );
};

export default PropertyCard;
