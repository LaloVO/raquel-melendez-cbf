import { useEffect, useRef, useState } from 'react';

const AboutMeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleContactScroll = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="sobre-mi" ref={sectionRef} className="py-24 md:py-32 bg-[#E9DDCF]/10 border-b border-border/20">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Portrait - Soft rounded-3xl corners */}
        <div
          className={`lg:col-span-5 order-2 lg:order-1 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative aspect-square md:aspect-[4/5] lg:aspect-[4/5] overflow-hidden shadow-elegant border border-white/40 bg-white/20 rounded-3xl">
            <img
              src="/raquel.jpeg"
              alt="Raquel Meléndrez"
              className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-1000 scale-[1.01]"
              loading="lazy"
            />
            {/* Elegant framing border */}
            <div className="absolute inset-4 border border-white/30 rounded-[20px] pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Bio Content */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-[#6E6259]">
          <span
            className={`text-[#B76E4D] text-xs uppercase tracking-[0.25em] font-semibold block mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Sobre Mí · Fundadora
          </span>
          
          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-5xl leading-tight font-light mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Te ayudo a tomar
            <br />
            <span className="italic font-semibold text-[#B76E4D]">decisiones inteligentes</span>
            <br />
            inmobiliarias.
          </h2>

          <div className="flex flex-col gap-6 font-sans text-sm sm:text-base font-light text-[#6E6259]/80 leading-relaxed">
            <p
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Hola, soy <strong>Raquel Meléndrez</strong>. Creo firmemente que adquirir una propiedad de alta gama no se trata únicamente de "comprar metros cuadrados" o encontrar un espacio estético. Se trata de una decisión de inversión estratégica que debe alinear el resguardo de tu capital, la plusvalía futura y tu visión de vida.
            </p>
            <p
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Con más de una década de experiencia y presencia consolidada tanto en la <strong>Ciudad de México</strong> como en <strong>Estados Unidos (Miami & Texas)</strong>, acompaño a inversionistas sofisticados y a familias exigentes a navegar el mercado boutique. Mi misión es entregarte absoluta claridad, datos predictivos rigurosos y una curaduría de propiedades inigualable.
            </p>
            <p
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Además de la asesoría financiera tradicional, integro un enfoque único en el diseño y los acabados artesanales a través de <strong>Masaroca</strong>, asegurando que cada propiedad sea tanto un activo rentable como una obra de arte habitable.
            </p>
          </div>

          {/* Quick contact / conversation trigger - Pill button */}
          <div
            className={`mt-10 flex flex-col sm:flex-row gap-6 sm:items-center transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={handleContactScroll}
              className="px-8 py-3.5 bg-[#B76E4D] text-[#FAF7F2] font-sans uppercase text-[10px] tracking-[0.25em] font-semibold rounded-full hover:bg-[#6E6259] transition-colors duration-500 shadow-md"
            >
              Hablemos hoy
            </button>
            <div className="flex flex-col font-sans text-xs">
              <span className="text-[#6E6259]/65 font-light">Asesoría directa</span>
              <span className="font-semibold text-[#6E6259] tracking-wider mt-0.5">Raquel Meléndrez</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutMeSection;
