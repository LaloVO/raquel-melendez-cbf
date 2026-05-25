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
          <p
            className={`font-sans text-xs sm:text-sm text-[#6E6259]/70 leading-relaxed font-light mt-8 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            En Raquel Meléndrez no vendemos metros cuadrados. Diseñamos futuros prósperos asesorándote estratégicamente para que tu patrimonio trabaje de manera inteligente.
          </p>
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
              <p className="font-serif text-xl sm:text-2xl text-[#6E6259] leading-relaxed font-light mb-4">
                Empoderar a inversionistas y familias a tomar <span className="font-semibold text-[#B76E4D]">decisiones patrimoniales seguras</span> y rentables en los mercados más dinámicos de México y EE.UU.
              </p>
              <p className="font-sans text-sm text-[#6E6259]/75 font-light leading-relaxed">
                A través de un análisis cuantitativo de plusvalía, acceso a preventas exclusivas fuera de mercado y una profunda comprensión humana de tus metas, garantizamos transacciones fluidas y estratégicas.
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
              <p className="font-serif text-xl sm:text-2xl text-[#6E6259] leading-relaxed font-light mb-4">
                Ser la firma boutique líder en asesoría patrimonial integral, uniendo de manera armoniosa el <span className="italic">lujo habitacional</span>, el arte del revestimiento Masaroca y las finanzas inteligentes.
              </p>
              <p className="font-sans text-sm text-[#6E6259]/75 font-light leading-relaxed">
                Visualizamos un ecosistema donde cada cliente adquiere no solo una residencia de primer nivel, sino una obra de arte viviente recubierta con acabados artesanales sofisticados, respaldada por un rendimiento sólido del capital.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
