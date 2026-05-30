import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';

interface CountryConfig {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  cities: string[];
  stats: { label: string; value: string }[];
  searchQuery: string;
}

const countries: CountryConfig[] = [
  {
    id: 'mx',
    name: 'México',
    subtitle: 'Un mercado lleno de oportunidades para construir patrimonio con visión a largo plazo.',
    description: 'Desde desarrollos con alta plusvalía hasta propiedades con valor arquitectónico y potencial de inversión, acompaño a cada cliente a identificar oportunidades alineadas con sus objetivos, estilo de vida y estrategia patrimonial.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    cities: ['Ciudad de México (Lomas & Polanco)', 'Monterrey (San Pedro)', 'Riviera Maya (Tulum & Cancún)'],
    stats: [
      { label: 'Plusvalía Anual Promedio', value: '+8.4%' },
      { label: 'Proyectos en Portafolio', value: '45+' }
    ],
    searchQuery: 'colonia=lomas&colonia=polanco'
  },
  {
    id: 'ext',
    name: 'Extranjero',
    subtitle: 'Invertir en el extranjero representa una oportunidad para diversificar patrimonio, acceder a mercados estratégicos y construir valor con una visión global.',
    description: 'Acompaño a cada cliente a explorar oportunidades inmobiliarias en el extranjero con claridad, análisis y una asesoría cercana enfocada en decisiones patrimoniales inteligentes y sostenibles a largo plazo.',
    image: '', // No se usa directamente porque renderizamos el grid
    cities: ['Europa (España - Madrid)', 'Estados Unidos (Florida)', 'Medio Oriente (Dubai)', 'El Caribe & Latinoamérica'],
    stats: [
      { label: 'Destinos Clave', value: '6 Regiones' },
      { label: 'Asesoría Global', value: 'Multidivisa' }
    ],
    searchQuery: ''
  }
];

const destinations = [
  {
    name: 'España',
    region: 'Madrid',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=400&auto=format&fit=crop',
    message: 'Hola Raquel, me interesa invertir en España (Madrid).'
  },
  {
    name: 'USA',
    region: 'Florida',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400&auto=format&fit=crop',
    message: 'Hola Raquel, me interesa invertir en Estados Unidos (Florida).'
  },
  {
    name: 'Dubai',
    region: 'EAU',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400&auto=format&fit=crop',
    message: 'Hola Raquel, me interesa invertir en Dubai.'
  },
  {
    name: 'Rep. Dominicana',
    region: 'Punta Cana',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop',
    message: 'Hola Raquel, me interesa invertir en República Dominicana.'
  },
  {
    name: 'Panamá',
    region: 'Panamá',
    image: 'https://images.unsplash.com/photo-1533550604246-85544851b492?q=80&w=400&auto=format&fit=crop',
    message: 'Hola Raquel, me interesa invertir en Panamá.'
  },
  {
    name: 'Colombia',
    region: 'Cartagena',
    image: 'https://images.unsplash.com/photo-1583996260525-141a77455b6c?q=80&w=400&auto=format&fit=crop',
    message: 'Hola Raquel, me interesa invertir en Colombia.'
  }
];

const CountriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useSiteUser();

  const whatsappNumber = user?.telefono_usuario?.replace(/\D/g, '') || '525512345678';

  const getWhatsappUrl = (msg: string) => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleExploreCountry = (query: string) => {
    navigate(`/mapa?${query}`);
  };

  return (
    <section id="paises" ref={sectionRef} className="py-24 bg-[#E9DDCF]/20 border-b border-border/20">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-[#B76E4D] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
              Presencia Internacional
            </span>
            <h2
              className={`font-serif text-3xl md:text-5xl text-[#6E6259] font-light transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              México & Extranjero
            </h2>
          </div>
          <p className="font-sans text-sm text-[#6E6259]/70 max-w-xl font-light leading-relaxed">
            Acompañando inversiones y decisiones patrimoniales en México y el extranjero, con una visión estratégica, cercana y enfocada en oportunidades de valor a largo plazo.
          </p>
        </div>

        {/* 2-Column interactive country list - Rounded-3xl Liquidglass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-stretch">
          {countries.map((country, index) => (
            <div
              key={country.id}
              className={`group flex flex-col bg-white/40 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-elegant transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {country.id === 'ext' ? (
                /* Custom Destination Grid for Extranjero */
                <div className="relative aspect-[16/9] bg-[#FAF7F2] p-3 grid grid-cols-3 gap-2 overflow-hidden border-b border-white/20">
                  {destinations.map((dest) => (
                    <a
                      key={dest.name}
                      href={getWhatsappUrl(dest.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/item relative overflow-hidden bg-[#FAF7F2] border border-[#E9DDCF]/35 shadow-sm rounded-2xl flex flex-col hover:border-[#B76E4D]/60 transition-all duration-300"
                    >
                      <div className="relative flex-1 overflow-hidden">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/15 group-hover/item:bg-black/5 transition-colors" />
                      </div>
                      <div className="bg-[#FAF7F2]/95 backdrop-blur-sm py-1.5 px-1 text-center border-t border-[#E9DDCF]/20">
                        <span className="block font-sans text-[8px] sm:text-[9px] uppercase tracking-wider font-bold text-[#6E6259] group-hover/item:text-[#B76E4D] transition-colors truncate">
                          {dest.name}
                        </span>
                        <span className="block font-serif italic text-[7px] sm:text-[8px] text-[#6E6259]/65 truncate leading-none mt-0.5">
                          {dest.region}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                /* Standard Cover Image for México */
                <div className="relative aspect-[16/9] overflow-hidden bg-[#E9DDCF]/10 border-b border-white/20">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E251E]/60 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-serif text-2xl md:text-3xl text-white font-medium drop-shadow-sm">
                      {country.name}
                    </h3>
                  </div>
                </div>
              )}

              {/* Text Description */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="block font-serif italic text-sm text-[#B76E4D] mb-3">
                    {country.subtitle}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#6E6259]/75 font-light leading-relaxed mb-6">
                    {country.description}
                  </p>

                  {/* Regional highlights */}
                  <div className="mb-6">
                    <span className="block text-[10px] uppercase tracking-widest font-sans font-bold text-[#6E6259] mb-3">
                      {country.id === 'ext' ? 'Regiones Destacadas' : 'Regiones Clave'}
                    </span>
                    <ul className="flex flex-col gap-2 font-sans text-xs text-[#6E6259]/80 font-light">
                      {country.cities.map((city, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#B76E4D]" />
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 border-t border-[#E9DDCF]/30 pt-6 mb-8">
                    {country.stats.map((stat, idx) => (
                      <div key={idx}>
                        <span className="block text-xl md:text-2xl font-serif text-[#B76E4D] font-normal">
                          {stat.value}
                        </span>
                        <span className="block text-[9px] uppercase tracking-widest text-[#6E6259]/60 font-light mt-0.5">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversion Trigger */}
                {country.id === 'ext' ? (
                  <a
                    href={getWhatsappUrl('Hola Raquel, me interesa explorar oportunidades de inversión en el extranjero.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#B76E4D] hover:bg-[#6E6259] text-white rounded-full transition-all duration-300 font-sans uppercase text-[10px] tracking-[0.25em] font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
                  >
                    Quiero Invertir en el Extranjero
                  </a>
                ) : (
                  <button
                    onClick={() => handleExploreCountry(country.searchQuery)}
                    className="w-full py-3.5 border border-[#B76E4D] text-[#B76E4D] hover:bg-[#B76E4D] hover:text-white rounded-full transition-all duration-300 font-sans uppercase text-[10px] tracking-[0.25em] font-semibold"
                  >
                    Explorar Propiedades
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;
