import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    subtitle: 'El Corazón del Lujo Orgánico',
    description: 'Desde residencias icónicas en Lomas de Chapultepec y Polanco, hasta desarrollos sustentables premium en la Riviera Maya y Monterrey. México ofrece retornos estables y una plusvalía incomparable en el sector residencial de lujo.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    cities: ['Ciudad de México (Lomas & Polanco)', 'Monterrey (San Pedro)', 'Riviera Maya (Tulum & Cancún)'],
    stats: [
      { label: 'Plusvalía Anual Promedio', value: '+8.4%' },
      { label: 'Proyectos en Portafolio', value: '45+' }
    ],
    searchQuery: 'colonia=lomas&colonia=polanco'
  },
  {
    id: 'us',
    name: 'Estados Unidos',
    subtitle: 'Estabilidad Financiera & Retorno en USD',
    description: 'Inversiones estratégicas en Florida y Texas. Propiedades exclusivas en Miami, residencias premium en San Antonio y residencias familiares de alta gama en The Woodlands. Perfecto para la diversificación y protección patrimonial.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop',
    cities: ['Miami (Brickell & Coral Gables)', 'San Antonio (Stone Oak)', 'The Woodlands, Houston'],
    stats: [
      { label: 'Rentabilidad Neta Rentas', value: '6.2% USD' },
      { label: 'Preventas Clave', value: '18+' }
    ],
    searchQuery: 'colonia=miami&colonia=houston'
  }
];

const CountriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

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
              EE.UU. & México
            </h2>
          </div>
          <p className="font-sans text-sm text-[#6E6259]/70 max-w-md font-light leading-relaxed">
            Una firma inmobiliaria global. Conectamos inversiones inteligentes entre las economías más fuertes de Norteamérica.
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
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#E9DDCF]/10">
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
                      Regiones Clave
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

                {/* Direct search trigger - Pill button */}
                <button
                  onClick={() => handleExploreCountry(country.searchQuery)}
                  className="w-full py-3.5 border border-[#B76E4D] text-[#B76E4D] hover:bg-[#B76E4D] hover:text-white rounded-full transition-all duration-300 font-sans uppercase text-[10px] tracking-[0.25em] font-semibold"
                >
                  Explorar Propiedades
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;
