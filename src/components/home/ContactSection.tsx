import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, ClipboardList, ArrowRight } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contacto" ref={sectionRef} className="py-24 bg-[#FAF7F2] scroll-mt-20">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Info Block */}
        <div className="lg:col-span-5 text-[#6E6259]">
          <span className="text-[#B76E4D] text-xs uppercase tracking-[0.25em] font-semibold block mb-4">
            Encuentra tu Inmueble
          </span>
          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-tight font-light mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Encuentra la
            <br />
            <span className="italic font-semibold text-[#B76E4D]">propiedad ideal</span>
            <br />
            para tu futuro.
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#6E6259]/75 font-light leading-relaxed text-justify mb-10">
            Si estás buscando un inmueble específico en México o en el extranjero, cuéntanos tu visión. Nuestro equipo se encargará de buscar, evaluar y presentarte opciones exclusivas que se alineen perfectamente con tu patrimonio, estilo de vida y objetivos de inversión.
          </p>

          {/* Contact details */}
          <div className="flex flex-col gap-6 font-sans text-xs sm:text-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/85 border border-white/40 backdrop-blur-md flex items-center justify-center text-[#B76E4D] shadow-sm rounded-full">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-[#6E6259]/50 font-light">Envíame un correo</span>
                <a href="mailto:contacto@raquelmelendrez.com" className="font-medium hover:text-[#B76E4D] transition-colors">
                  contacto@raquelmelendrez.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/85 border border-white/40 backdrop-blur-md flex items-center justify-center text-[#B76E4D] shadow-sm rounded-full">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-[#6E6259]/50 font-light">Ubicación</span>
                <span className="font-medium">
                  Cd. De los Deportes, Benito Juárez, Ciudad de México.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Redesigned High-End CTA Card */}
        <div
          className={`lg:col-span-7 w-full bg-white/45 backdrop-blur-xl border border-white/30 p-8 md:p-12 shadow-elegant rounded-3xl flex flex-col justify-between items-start gap-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="w-12 h-12 bg-[#FAF7F2] border border-[#E9DDCF]/40 flex items-center justify-center rounded-2xl">
            <ClipboardList className="w-6 h-6 text-[#B76E4D]" />
          </div>

          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#6E6259] font-light mb-4">
              Solicita inmueble
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#6E6259]/75 font-light leading-relaxed text-justify mb-6">
              Inicia tu proceso completando nuestro formulario de requerimientos en línea. Analizaremos tus especificaciones de ubicación, presupuesto y tipología para presentarte una selección curada de propiedades exclusivas.
            </p>
          </div>

          <button
            onClick={() => navigate('/solicita-inmueble')}
            className="group w-full md:w-auto px-8 py-4 bg-[#B76E4D] text-[#FAF7F2] font-sans uppercase text-[10px] tracking-[0.25em] font-semibold rounded-full hover:bg-[#6E6259] transition-all duration-500 shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <span>Comenzar Solicitud</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
