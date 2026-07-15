import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useEffect, useRef, useState } from 'react';

const SkeletonCard = () => (
  <div className="w-[380px] shrink-0 animate-pulse snap-center bg-white/40 backdrop-blur-md border border-white/30 p-4 rounded-3xl">
    <div className="aspect-[4/3] mb-6 bg-[#E9DDCF]/40 rounded-2xl" />
    <div className="h-6 bg-[#E9DDCF]/40 rounded w-3/4 mb-2" />
    <div className="h-4 bg-[#E9DDCF]/40 rounded w-1/2" />
  </div>
);

const PropertiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { properties, isLoading } = useProperties({ limit: 6 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="inmuebles" ref={sectionRef} className="py-24 bg-[#FAF7F2] scroll-mt-20 border-b border-border/20">
      <div className="px-6 md:px-12 mb-16 flex flex-col sm:flex-row justify-between items-start sm:items-end max-w-[90rem] mx-auto gap-4">
        <div>
          <span className="text-[#B76E4D] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
            Catálogo Exclusivo
          </span>
          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-5xl text-[#6E6259] font-light transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Propiedades Destacadas
          </h2>
        </div>
        <Link
          to="/mapa"
          className={`text-xs uppercase tracking-[0.2em] font-semibold text-[#B76E4D] border-b border-[#B76E4D] pb-1 hover:text-[#6E6259] hover:border-[#6E6259] transition-all duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Ver Inventario Completo
        </Link>
      </div>

      {/* Horizontal horizontal sliding list with beige-soft background and gorgeous cards */}
      <div className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-12 snap-x hide-scrollbar max-w-[95rem] mx-auto">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : properties.map((property, index) => (
              <div
                key={property.id}
                className={`transition-all duration-1000 snap-center ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
      </div>

      <div className="px-6 md:hidden mt-8 text-center">
        <Link
          to="/mapa"
          className="inline-block text-xs uppercase tracking-[0.2em] font-bold text-[#B76E4D] border-b border-[#B76E4D] pb-1 hover:text-[#6E6259] hover:border-[#6E6259] transition-colors"
        >
          Ver Inventario Completo
        </Link>
      </div>
    </section>
  );
};

export default PropertiesSection;
