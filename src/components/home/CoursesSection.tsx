import { useEffect, useRef, useState } from 'react';
import { Calendar, Award, Compass } from 'lucide-react';

interface CoursePlaceholder {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration: string;
  focus: string;
}

const courses: CoursePlaceholder[] = [
  {
    id: '1',
    title: 'Inversión Patrimonial de Alto Nivel',
    description: 'Estrategias cuantitativas para diversificar e invertir en preventas exclusivas y mercados boutique de México y Estados Unidos de manera segura.',
    icon: Compass,
    duration: '4 Módulos',
    focus: 'Inversionistas & Propietarios'
  },
  {
    id: '2',
    title: 'El Arte de Habitar: Curation & Staging',
    description: 'Aprende a dotar a tus inmuebles de una identidad visual de lujo, curando el arte, los materiales y recubrimientos sofisticados para maximizar plusvalía.',
    icon: Award,
    duration: '3 Semanas',
    focus: 'Branding & Interiorismo'
  }
];

const CoursesSection = () => {
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
    <section id="cursos" ref={sectionRef} className="py-24 bg-[#E9DDCF]/10 border-b border-border/20 scroll-mt-20">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="px-3 py-1 bg-[#B76E4D] text-[#FAF7F2] text-[10px] uppercase tracking-[0.25em] font-semibold block mb-4">
            Próximamente
          </span>
          <h2
            className={`font-serif text-3xl md:text-4xl text-[#6E6259] font-light transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Academia & Cursos Premium
          </h2>
          <div className="w-12 h-[1px] bg-[#6E6259]/30 mt-6 mb-4" />
          <p className="font-sans text-xs sm:text-sm text-[#6E6259]/70 font-light leading-relaxed">
            Formación boutique de primer nivel. Próximamente abriremos convocatorias para nuestras masterclasses exclusivas en inversiones inmobiliarias y diseño escultural.
          </p>
        </div>

        {/* 2-Column coming soon placeholder cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className={`relative bg-white/45 backdrop-blur-xl border border-white/30 p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-elegant transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Floating blur decorative background element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B76E4D]/5 rounded-full blur-2xl" />

                <div>
                  <div className="w-10 h-10 bg-[#FAF7F2] border border-[#E9DDCF] flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-[#B76E4D]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#6E6259] font-normal mb-3">
                    {course.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#6E6259]/75 font-light leading-relaxed mb-6">
                    {course.description}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-[#E9DDCF]/30 pt-4 text-[10px] uppercase tracking-wider font-sans font-medium text-[#6E6259]/65">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B76E4D]" />
                    {course.duration}
                  </span>
                  <span className="text-[#B76E4D]">
                    {course.focus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
