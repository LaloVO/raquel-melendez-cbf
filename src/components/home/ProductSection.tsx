import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Calculate interactive diagonal polygon coordinates based on hover state
  const leftPolygon = hoveredSide === 'left'
    ? 'polygon(0 0, 75% 0, 55% 100%, 0 100%)'
    : hoveredSide === 'right'
    ? 'polygon(0 0, 45% 0, 25% 100%, 0 100%)'
    : 'polygon(0 0, 60% 0, 40% 100%, 0 100%)';

  const rightPolygon = hoveredSide === 'left'
    ? 'polygon(75% 0, 100% 0, 100% 100%, 55% 100%)'
    : hoveredSide === 'right'
    ? 'polygon(45% 0, 100% 0, 100% 100%, 25% 100%)'
    : 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)';

  return (
    <section id="masaroca" ref={sectionRef} className="py-24 md:py-32 bg-[#FAF7F2] scroll-mt-20 border-b border-border/20">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Product Info */}
        <div className="lg:col-span-5 flex flex-col items-start text-[#6E6259]">
          <span
            className={`text-[#B76E4D] text-xs uppercase tracking-[0.25em] font-semibold block mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Innovación Constructiva Orgullosamente Mexicana
          </span>
          
          <h2
            className={`font-serif text-2xl sm:text-3xl md:text-4xl leading-tight font-light mb-8 hover:text-[#B76E4D]/80 transition-colors duration-300 cursor-pointer transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link to="/masaroca">
              Masaroca: Redefine la
              <br />
              <span className="italic font-semibold text-[#B76E4D]">forma de construir</span>
              <br />
              y crear espacios.
            </Link>
          </h2>

          <div className="flex flex-col gap-6 font-sans text-base sm:text-lg md:text-xl font-light text-[#6E6259]/80 leading-relaxed text-justify">
            <p
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <strong>Masaroca</strong> es Tecnología Mexicana de Alto Desempeño que combina resistencia estructural, impermeabilidad y libertad de modelado para aplicaciones arquitectónicas, constructivas y artísticas.
            </p>
            <p
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Su composición de alta resistencia permite moldearlo manualmente sin necesidad de moldes o cimbras, logrando soluciones constructivas duraderas, resistentes al fuego y a la humedad, mientras optimiza procesos, reduce tiempos de ejecución y disminuye costos.
            </p>
            <p
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Desde restauración arquitectónica y construcción estructural, hasta diseño, texturas y escultura, Masaroca combina innovación, funcionalidad y libertad creativa en un solo material.
            </p>
          </div>

          <div
            className={`mt-8 border-t border-[#E9DDCF] pt-8 w-full transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <ul className="flex flex-col gap-4 font-sans text-sm sm:text-base text-[#6E6259]/85 font-light">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#B76E4D] rounded-full mt-2 shrink-0" />
                <span>Tecnología de alto desempeño</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#B76E4D] rounded-full mt-2 shrink-0" />
                <span>Moldeable sin necesidad de moldes o cimbras</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#B76E4D] rounded-full mt-2 shrink-0" />
                <span>Alta resistencia estructural e impermeabilidad</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#B76E4D] rounded-full mt-2 shrink-0" />
                <span>Aplicaciones artesanales y acabados únicos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#B76E4D] rounded-full mt-2 shrink-0" />
                <span>Soluciones para construcción, restauración y diseño</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Mirror Split diagonal divided interactive images - Soft rounded-3xl container */}
        <div
          className={`lg:col-span-7 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative w-full h-[450px] md:h-[520px] bg-[#E9DDCF]/20 overflow-hidden shadow-elegant border border-white/40 rounded-3xl group">
            
            {/* Left/Top Side: Textured Finish */}
            <div
              onClick={() => navigate('/masaroca')}
              onMouseEnter={() => setHoveredSide('left')}
              onMouseLeave={() => setHoveredSide(null)}
              className="absolute inset-0 z-10 transition-all duration-700 ease-in-out cursor-pointer"
              style={{ clipPath: leftPolygon }}
            >
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
                alt="Masaroca Texturizado Rústico"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-[#2E251E]/10" />
              {/* Text Tag */}
              <div className="absolute bottom-8 left-8 text-white z-20 pointer-events-none">
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] bg-[#B76E4D] px-3 py-1 font-semibold rounded-full">
                  Textura Rústica
                </span>
                <h4 className="font-serif text-lg md:text-xl font-medium mt-3 drop-shadow-sm">
                  Texturizado Escultural
                </h4>
                <p className="font-sans text-[11px] text-[#FAF7F2]/80 mt-1 font-light tracking-wide">
                  Muros de acento con alma orgánica
                </p>
              </div>
            </div>

            {/* Right/Bottom Side: Smooth Elegant Finish */}
            <div
              onClick={() => navigate('/masaroca')}
              onMouseEnter={() => setHoveredSide('right')}
              onMouseLeave={() => setHoveredSide(null)}
              className="absolute inset-0 transition-all duration-700 ease-in-out cursor-pointer"
              style={{ clipPath: rightPolygon }}
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
                alt="Masaroca Acabado Liso"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#2E251E]/20" />
              {/* Text Tag */}
              <div className="absolute bottom-8 right-8 text-right text-white z-20 pointer-events-none">
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] bg-[#6E6259] px-3 py-1 font-semibold rounded-full">
                  Acabado Liso
                </span>
                <h4 className="font-serif text-lg md:text-xl font-medium mt-3 drop-shadow-sm">
                  Liso Minimalista
                </h4>
                <p className="font-sans text-[11px] text-[#FAF7F2]/80 mt-1 font-light tracking-wide">
                  Fachadas e interiores de microcemento
                </p>
              </div>
            </div>

            {/* Subtle Diagonal Divider Line */}
            <div
              className="absolute inset-0 pointer-events-none z-20 transition-all duration-700 ease-in-out"
              style={{
                background: 'linear-gradient(to right, transparent, transparent)', // dummy
              }}
            >
              {/* Invisible divider line overlay to highlight splitting */}
              <div
                className="absolute inset-y-0 w-[1px] bg-white/20 transition-all duration-700 ease-in-out"
                style={{
                  left: hoveredSide === 'left' ? '65%' : hoveredSide === 'right' ? '35%' : '50%',
                  transform: 'rotate(10deg) scaleY(1.5)',
                }}
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductSection;
