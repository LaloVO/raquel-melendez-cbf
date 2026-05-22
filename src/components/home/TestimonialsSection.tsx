import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "La asesoría de Raquel fue clave para expandir nuestro portafolio a Estados Unidos. Su entendimiento del mercado en Miami y la CDMX nos dio absoluta confianza.",
    author: "Alejandro Ruiz",
    role: "CEO de Inversiones Aurum",
    location: "Lomas de Chapultepec, CDMX / Miami, FL"
  },
  {
    id: '2',
    quote: "Espectacular nivel de profesionalismo. Encontró una residencia fuera del mercado que superaba nuestras expectativas en menos de dos semanas. Totalmente recomendada.",
    author: "Sofía & Roberto Beck",
    role: "Inversionistas Privados",
    location: "Valle de Bravo, EdoMex"
  },
  {
    id: '3',
    quote: "El acompañamiento integral, incluyendo la asesoría de diseño con acabados Masaroca, transformó por completo nuestra decisión de compra. Un servicio de guante blanco.",
    author: "Dra. Natalia Valenzuela",
    role: "Coleccionista de Arte",
    location: "Polanco, CDMX"
  }
];

const TestimonialsSection = () => {
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

  return (
    <section id="testimonios" ref={sectionRef} className="py-24 bg-[#FAF7F2] border-b border-border/20">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#B76E4D] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
            Casos de Éxito
          </span>
          <h2
            className={`font-serif text-3xl md:text-4xl text-[#6E6259] font-light transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            La voz de quienes confían
          </h2>
          <div className="w-12 h-[1px] bg-[#B76E4D] mx-auto mt-6" />
        </div>

        {/* 3-Column Premium testimonial grid - Rounded Glassmorphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-stretch">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white/40 backdrop-blur-md border border-white/50 p-8 rounded-2xl flex flex-col justify-between hover:bg-white/80 hover:shadow-elegant transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col gap-6">
                <Quote className="w-6 h-6 text-[#B76E4D]/35 shrink-0" />
                <p className="font-serif text-sm sm:text-base text-[#6E6259] font-light leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-8 border-t border-[#E9DDCF]/35 pt-4">
                <span className="block font-sans font-semibold text-xs text-[#6E6259] uppercase tracking-wider">
                  {item.author}
                </span>
                <span className="block font-sans text-[10px] text-[#6E6259]/60 uppercase tracking-widest mt-0.5">
                  {item.role}
                </span>
                <span className="block font-sans text-[9px] text-[#B76E4D] tracking-widest uppercase mt-2 font-medium">
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
