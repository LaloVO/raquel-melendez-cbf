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
            className={`font-serif text-2xl sm:text-3xl md:text-4xl leading-snug font-light mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Creo que una buena inversión comienza con una <span className="italic font-semibold text-[#B76E4D]">decisión bien analizada</span>.
            <br />
            <span className="text-base sm:text-lg md:text-xl font-sans font-light text-[#6E6259]/80 block mt-4 leading-relaxed text-justify">
              Por eso acompaño a cada cliente desde una perspectiva estratégica, entendiendo sus objetivos, su patrimonio y la visión que tiene para su futuro.
            </span>
          </h2>

          <div className="flex flex-col gap-6 font-sans text-base sm:text-lg md:text-xl font-light text-[#6E6259]/80 leading-relaxed text-justify">
            <p
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Más que vender propiedades, mi propósito es ayudarte a tomar decisiones inmobiliarias con claridad, confianza y visión a largo plazo.
            </p>
            <p
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Además, integro una visión innovadora del diseño y la construcción a través de <strong>Masaroca</strong>, una tecnología de alto desempeño que combina funcionalidad estructural, posibilidades creativas y valor estético para transformar la manera en que concebimos los espacios.
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
              hablemos hoy
            </button>
            <div className="flex flex-col font-sans text-xs">
              <span className="font-semibold text-[#6E6259] tracking-wider">Raquel Meléndrez</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutMeSection;
