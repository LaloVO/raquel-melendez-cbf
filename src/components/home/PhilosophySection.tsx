import { useEffect, useRef, useState } from 'react';

const PhilosophySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 px-6 md:px-12 bg-[#FAF7F2] border-b border-border/30">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Authoritative Text and Intro */}
        <div className="lg:col-span-4">
          <span
            className={`text-[#B76E4D] text-xs uppercase tracking-[0.25em] font-semibold block mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Nuestra Filosofía
          </span>
          <h2
            className={`font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[#6E6259] font-light mb-8 transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Decisiones
            <br />
            <span className="italic font-normal text-[#B76E4D]">inteligentes</span>
            <br />
            de inversión.
          </h2>
          <div
            className={`h-[1px] bg-[#E9DDCF] transition-all duration-1000 delay-300 ${
              isVisible ? 'w-full' : 'w-0'
            }`}
          />
          <div
            className={`font-sans text-xs sm:text-sm text-[#6E6259]/70 leading-relaxed font-light mt-8 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="font-semibold text-[#6E6259] mb-4">
              No vendemos propiedades.
              <br />
              <span className="font-normal text-[#6E6259]/80">Guiamos decisiones de inversión con visión estratégica y valor a largo plazo.</span>
            </p>
            <p>
              Porque detrás de cada inversión existe un proyecto de vida, un patrimonio y un futuro que merece construirse con inteligencia y confianza.
            </p>
          </div>
        </div>

        {/* Right Side: Misión & Visión Grid */}
        <div className="lg:col-span-8 flex flex-col gap-16 md:gap-20">
          
          {/* Misión Card */}
          <div
            id="mision"
            className={`scroll-mt-28 grid grid-cols-1 md:grid-cols-12 gap-6 items-start transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="md:col-span-3">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#B76E4D] bg-[#FAF7F2] border border-[#E9DDCF] px-3 py-1.5 inline-block">
                Misión
              </span>
            </div>
            <div className="md:col-span-9">
              <p className="font-serif text-xl sm:text-2xl text-[#6E6259] leading-relaxed font-light">
                Acompañar a cada cliente a tomar decisiones patrimoniales con <span className="font-semibold text-[#B76E4D]">claridad, estrategia y confianza</span>, creando inversiones con visión y valor a largo plazo.
              </p>
            </div>
          </div>

          <div className="h-[1px] bg-[#E9DDCF]/50 w-full" />

          {/* Visión Card */}
          <div
            id="vision"
            className={`scroll-mt-28 grid grid-cols-1 md:grid-cols-12 gap-6 items-start transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="md:col-span-3">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#6E6259] bg-[#E9DDCF] px-3 py-1.5 inline-block">
                Visión
              </span>
            </div>
            <div className="md:col-span-9">
              <p className="font-serif text-xl sm:text-2xl text-[#6E6259] leading-relaxed font-light">
                Convertirme en una referencia de confianza en el sector inmobiliario y de inversión, reconocida por transformar la manera en que las personas toman decisiones patrimoniales: con <span className="italic font-semibold text-[#B76E4D]">estrategia, visión</span> y un acompañamiento genuinamente humano.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
