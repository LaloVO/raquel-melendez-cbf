import { ArrowLeft, ArrowRight, Map as MapIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import HeroPropertySearch from './HeroPropertySearch';
import { PATRIMONIO_PRODUCTS } from '@/features/patrimonio/products';

type Servicio = 'bienes-raices' | 'patrimonio';

const REAL_ESTATE_BG =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2574&auto=format&fit=crop';
const PATRIMONIO_BG =
  'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2574&auto=format&fit=crop';

// Palabra del titular que se enciende según el servicio elegido.
const ACCENT: Record<'inicio' | Servicio, string> = {
  inicio: 'patrimonio',
  'bienes-raices': 'construye',
  patrimonio: 'protege',
};

const SUBTITLE: Record<'inicio' | Servicio, string> = {
  inicio: 'Bienes raíces y estrategias patrimoniales para construir con visión y proteger lo que más te importa.',
  'bienes-raices': 'Compra, renta o invierte en propiedades en México y Estados Unidos con asesoría estratégica.',
  patrimonio: 'Vida, salud, ahorro y retiro: cuatro estrategias para que lo que construyes hoy siga en pie mañana.',
};

const SERVICES: { id: Servicio; title: string; body: string }[] = [
  {
    id: 'bienes-raices',
    title: 'Bienes raíces',
    body: 'Encuentra, compra o renta la propiedad que construye tu patrimonio.',
  },
  {
    id: 'patrimonio',
    title: 'Patrimonio',
    body: 'Protege lo que construyes con estrategias de vida, salud, ahorro y retiro.',
  },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const param = searchParams.get('servicio');
  const servicio: Servicio | null = param === 'bienes-raices' || param === 'patrimonio' ? param : null;
  const mode = servicio ?? 'inicio';

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const select = (next: Servicio | null) => {
    const params = new URLSearchParams(searchParams);
    if (next) params.set('servicio', next);
    else params.delete('servicio');
    setSearchParams(params);
  };

  const word = (text: string, key?: string) => {
    const active = key && ACCENT[mode] === key;
    return (
      <span
        className={`transition-colors duration-700 motion-reduce:transition-none ${key ? 'italic font-normal' : ''} ${
          active ? 'text-[#E3A587]' : 'text-[#FAF7F2]'
        }`}
      >
        {text}
      </span>
    );
  };

  const reveal = (delay: string) =>
    `transition-all duration-1000 ${delay} motion-reduce:transition-none ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`;

  return (
    <header className="relative w-full min-h-[100svh] flex flex-col justify-end md:justify-center px-6 md:px-12 lg:px-24 pt-28 pb-12 md:py-28">
      {/* Fondo: cambia de arquitectura a familia según el servicio */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 h-[120%] transition-transform duration-1000 ease-out motion-reduce:transform-none"
          style={{ transform: `translateY(${scrollY * 0.15}px) scale(1.02)` }}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 motion-reduce:transition-none ${
              mode === 'patrimonio' ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ backgroundImage: `url('${REAL_ESTATE_BG}')` }}
          />
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 motion-reduce:transition-none ${
              mode === 'patrimonio' ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${PATRIMONIO_BG}')` }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
      </div>

      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col items-start">
        <h1 className="font-serif text-[2.6rem] sm:text-6xl md:text-7xl xl:text-8xl leading-[1.05] font-light max-w-5xl">
          <span className={`block ${reveal('delay-200')}`}>
            {word('Diseña, ')}
            {word('construye', 'construye')}
          </span>
          <span className={`block ${reveal('delay-300')}`}>
            {word('y ')}
            {word('protege', 'protege')}
            {word(' tu ')}
            {word('patrimonio', 'patrimonio')}
            {word('.')}
          </span>
        </h1>

        <p
          key={`sub-${mode}`}
          className={`mt-6 max-w-2xl font-sans text-base sm:text-lg md:text-xl font-light leading-relaxed text-white/75 animate-fade-in motion-reduce:animate-none ${reveal('delay-500')}`}
        >
          {SUBTITLE[mode]}
        </p>

        <div key={`stage-${mode}`} className="mt-10 w-full animate-fade-in-up motion-reduce:animate-none">
          {mode === 'inicio' && (
            <div className="grid w-full max-w-4xl gap-4 md:grid-cols-2">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => select(s.id)}
                  className="group flex items-center justify-between gap-6 rounded-3xl border border-white/20 bg-black/25 p-6 text-left backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3A587] md:p-7"
                >
                  <span>
                    <span className="block font-serif text-3xl text-white md:text-4xl">{s.title}</span>
                    <span className="mt-2 block font-sans text-sm font-light leading-relaxed text-white/70">{s.body}</span>
                  </span>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#B76E4D] text-white transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </button>
              ))}
            </div>
          )}

          {mode === 'bienes-raices' && (
            <div className="flex flex-col gap-5">
              <HeroPropertySearch />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <button
                  type="button"
                  onClick={() => select(null)}
                  className="inline-flex min-h-[44px] items-center gap-2 font-sans text-xs text-white/70 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Cambiar servicio
                </button>
                <Link
                  to="/mapa"
                  className="inline-flex min-h-[44px] items-center gap-2 font-sans text-xs text-white/70 transition-colors hover:text-white"
                >
                  <MapIcon className="h-4 w-4" />
                  Ver todas en el mapa
                </Link>
                <Link
                  to="/vender-propiedad"
                  className="inline-flex min-h-[44px] items-center gap-2 font-sans text-xs text-white/70 transition-colors hover:text-white"
                >
                  Quiero vender mi propiedad
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {mode === 'patrimonio' && (
            <div className="flex flex-col gap-5">
              <div className="grid w-full max-w-5xl grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                {PATRIMONIO_PRODUCTS.map((p, i) => (
                  <Link
                    key={p.slug}
                    to={`/patrimonio/${p.slug}`}
                    style={{ animationDelay: `${i * 90}ms` }}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-white/20 bg-black/30 backdrop-blur-md opacity-0 animate-fade-in-up transition-colors duration-300 hover:border-white/60 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3A587] motion-reduce:animate-none motion-reduce:opacity-100"
                  >
                    <span className="relative block h-20 overflow-hidden sm:h-28">
                      <img
                        src={p.image.replace('w=2000', 'w=700')}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                      />
                    </span>
                    <span className="flex flex-1 items-end justify-between gap-3 p-4 md:p-5">
                      <span>
                        <span className="block font-serif text-2xl text-white md:text-3xl">{p.name}</span>
                        <span className="mt-1 block font-sans text-xs font-light leading-snug text-white/70 md:text-sm">{p.promise}</span>
                      </span>
                      <ArrowRight className="mb-1 hidden h-5 w-5 shrink-0 text-[#E3A587] transition-transform group-hover:translate-x-1 sm:block" />
                    </span>
                  </Link>
                ))}
              </div>
              <button
                type="button"
                onClick={() => select(null)}
                className="inline-flex min-h-[44px] w-fit items-center gap-2 font-sans text-xs text-white/70 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Cambiar servicio
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
