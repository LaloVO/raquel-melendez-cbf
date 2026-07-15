import { useEffect, useRef, useState } from 'react';
import { Calendar, Award, Compass, BookOpen } from 'lucide-react';

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
    title: 'Mentalidad de Inversionista',
    description: 'Aprende a analizar oportunidades inmobiliarias con una visión estratégica, entendiendo plusvalía, riesgo, rentabilidad y toma de decisiones patrimoniales a largo plazo.',
    icon: Compass,
    duration: '4 módulos',
    focus: 'Online'
  },
  {
    id: '2',
    title: 'Diseño, Materiales y Espacios con Identidad',
    description: 'Explora cómo el diseño, las texturas, los materiales y la innovación constructiva pueden transformar la percepción, funcionalidad y valor de un espacio. Incluye visión aplicada de MasaRoca en acabados, diseño y construcción.',
    icon: Award,
    duration: '3 Semanas',
    focus: 'Diseño & Construcción'
  },
  {
    id: '3',
    title: 'Asesor Inmobiliario con Visión Estratégica',
    description: 'Conoce el paso a paso del ejercicio inmobiliario profesional: captación, análisis de mercado, prospección, atención al cliente, negociación, procesos legales y cierre de operaciones. Un programa pensado para formar asesores preparados, confiables y capaces de generar relaciones de valor en el sector.',
    icon: BookOpen,
    duration: '8 módulos',
    focus: 'Online'
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
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 bg-[#B76E4D] text-[#FAF7F2] text-[10px] uppercase tracking-[0.25em] font-semibold block mb-4 rounded-full">
            Próximamente
          </span>
          <h2
            className={`font-serif text-3xl md:text-4xl text-[#6E6259] font-light transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Academia Raquel Meléndrez
          </h2>
          <div className="w-12 h-[1px] bg-[#6E6259]/30 mt-6 mb-6" />
          
          <div className="font-sans text-base sm:text-lg md:text-xl text-[#6E6259]/75 font-light leading-relaxed flex flex-col gap-4 max-w-2xl text-justify">
            <p className="font-semibold text-[#6E6259]">
              Un espacio de formación enfocado en inversiones inteligentes, visión patrimonial y profesionalización estratégica dentro del sector inmobiliario.
            </p>
            <p>
              Próximamente abriremos nuevas convocatorias para programas, cursos y masterclasses diseñadas para inversionistas, asesores inmobiliarios y personas que buscan tomar decisiones financieras y patrimoniales con mayor claridad y estrategia.
            </p>
          </div>
        </div>

        {/* 3-Column coming soon placeholder cards - Expanded for luxury balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[85rem] mx-auto items-stretch">
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
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B76E4D]/5 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="w-10 h-10 bg-[#FAF7F2] border border-[#E9DDCF]/40 flex items-center justify-center mb-6 rounded-xl">
                    <Icon className="w-5 h-5 text-[#B76E4D]" />
                  </div>
                  <h3 className="font-serif text-[21px] text-[#6E6259] font-normal mb-4 leading-snug">
                    {course.title}
                  </h3>
                  <p className="font-sans text-[13px] sm:text-[15px] text-[#6E6259]/75 font-light leading-relaxed text-justify mb-6">
                    {course.description}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-[#E9DDCF]/30 pt-4 mt-6 text-[11px] uppercase tracking-wider font-sans font-semibold text-[#6E6259]/65">
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
