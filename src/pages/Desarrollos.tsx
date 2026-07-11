import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, CalendarCheck, ArrowUpRight, Building2, Layers } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDesarrollos } from '@/hooks/useDesarrollos';
import { useSiteUser } from '@/hooks/useSiteUser';
import { formatPrice } from '@/lib/cbf';
import { cn } from '@/lib/utils';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop';

function formatFechaEntrega(iso: string | null | undefined): string | null {
  if (!iso) return null;
  return new Date(`${iso}T00:00:00`).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
}

const Desarrollos = () => {
  const { user } = useSiteUser();
  const { desarrollos, isLoading } = useDesarrollos();

  return (
    <>
      <Helmet>
        <title>Desarrollos | {user?.nombre_usuario ?? 'Raquel Meléndrez Inmobiliaria'}</title>
        <meta
          name="description"
          content="Conoce los desarrollos y preventas curadas por Raquel Meléndrez en México y EE.UU."
        />
      </Helmet>

      <Navbar />

      <main className="pt-28 min-h-screen bg-[#FAF7F2] pb-24">
        <div className="px-6 md:px-12 max-w-[90rem] mx-auto">

          {/* Editorial header */}
          <div className="mb-16 max-w-2xl">
            <span className="text-[#B76E4D] text-[10px] uppercase tracking-[0.25em] font-sans font-bold block mb-4">
              Portafolio de Preventas
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#6E6259] font-light leading-[1.05]">
              Desarrollos
              <br />
              <span className="italic text-[#B76E4D]">en construcción</span>
            </h1>
            <p className="font-sans text-sm text-[#6E6259]/70 font-light mt-6 leading-relaxed">
              Una selección curada de proyectos inmobiliarios en preventa, acompañados desde el
              primer trazo hasta la entrega de llaves.
            </p>
          </div>

          {/* Loading skeletons */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-3xl overflow-hidden bg-white/40 border border-white/30 animate-pulse">
                  <div className="aspect-[16/10] bg-[#E9DDCF]/40" />
                  <div className="p-7 space-y-3">
                    <div className="h-2.5 bg-[#E9DDCF]/50 rounded-full w-1/3" />
                    <div className="h-5 bg-[#E9DDCF]/50 rounded-full w-2/3" />
                    <div className="h-3 bg-[#E9DDCF]/50 rounded-full w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && desarrollos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-28 gap-6 text-center border border-dashed border-[#E9DDCF] bg-white/30">
              <div className="w-16 h-16 rounded-full bg-white border border-[#E9DDCF] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#B76E4D]" />
              </div>
              <p className="font-serif text-2xl text-[#6E6259] font-light max-w-sm">
                Nuevos desarrollos en curaduría
              </p>
              <p className="font-sans text-xs text-[#6E6259]/60 max-w-xs">
                Muy pronto encontrarás aquí las preventas exclusivas seleccionadas por Raquel Meléndrez.
              </p>
              <Link
                to="/mapa"
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 border border-[#B76E4D] text-[#B76E4D] text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#B76E4D] hover:text-white transition-colors duration-300"
              >
                Ver catálogo disponible
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Bento grid of developments */}
          {!isLoading && desarrollos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {desarrollos.map((dev, i) => {
                const imagen = dev.imagenes_propiedades?.[0]?.image_url ?? FALLBACK_IMG;
                const verticals = dev.development_verticals ?? [];
                const entrega = formatFechaEntrega(dev.fecha_entrega);
                const featured = i === 0;

                return (
                  <Link
                    key={dev.id}
                    to={`/properties/${dev.id}`}
                    className={cn(
                      'group relative overflow-hidden bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl shadow-card hover:shadow-elegant hover:bg-white/70 transition-all duration-500 block',
                      featured ? 'md:col-span-6' : 'md:col-span-3'
                    )}
                  >
                    <div className={cn('grid', featured ? 'md:grid-cols-2' : 'grid-cols-1')}>
                      <div className={cn('relative overflow-hidden', featured ? 'aspect-[16/10] md:aspect-auto md:h-full' : 'aspect-[16/10]')}>
                        <img
                          src={imagen}
                          alt={dev.nombre}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG; }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
                        {dev.tipo && (
                          <span className="absolute top-4 left-4 bg-white/85 backdrop-blur-md text-[#6E6259] text-[9px] uppercase tracking-widest font-sans font-bold px-3 py-1.5 rounded-full border border-white/40">
                            {dev.tipo}
                          </span>
                        )}
                      </div>

                      <div className="p-7 md:p-8 flex flex-col justify-center gap-4">
                        {verticals.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            {verticals.slice(0, 2).map((v) => (
                              <span
                                key={v}
                                className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-sans font-bold text-[#B76E4D] bg-[#B76E4D]/10 border border-[#B76E4D]/20 px-2.5 py-1 rounded-full"
                              >
                                <Layers className="w-2.5 h-2.5" />
                                {v}
                              </span>
                            ))}
                          </div>
                        )}

                        <h2
                          className={cn(
                            'font-serif text-[#6E6259] leading-snug group-hover:text-[#B76E4D] transition-colors duration-300',
                            featured ? 'text-3xl md:text-4xl' : 'text-xl'
                          )}
                        >
                          {dev.nombre}
                        </h2>

                        {dev.descripcion && (
                          <p className="text-xs sm:text-sm text-[#6E6259]/65 font-sans font-light leading-relaxed line-clamp-2">
                            {dev.descripcion}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 pt-1 border-t border-[#E9DDCF]/40 mt-1">
                          {(dev.ciudad_nombre || dev.estado_nombre) && (
                            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#6E6259]/55 font-sans pt-3">
                              <MapPin className="w-3.5 h-3.5 text-[#B76E4D]" />
                              {dev.ciudad_nombre ?? dev.estado_nombre}
                            </span>
                          )}
                          {entrega && (
                            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#6E6259]/55 font-sans pt-3">
                              <CalendarCheck className="w-3.5 h-3.5 text-[#B76E4D]" />
                              Entrega {entrega}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div>
                            {dev.fromPrice != null ? (
                              <p className="font-sans font-bold text-[#B76E4D] text-base">
                                Desde {formatPrice(dev.fromPrice)}
                              </p>
                            ) : (
                              <p className="font-sans text-xs text-[#6E6259]/50 uppercase tracking-widest">Precio a consultar</p>
                            )}
                            {dev.unitCount > 0 && (
                              <p className="text-[10px] text-[#6E6259]/50 font-sans mt-0.5">
                                {dev.unitCount} {dev.unitCount === 1 ? 'unidad disponible' : 'unidades disponibles'}
                              </p>
                            )}
                          </div>
                          <span className="flex items-center gap-1 text-[#B76E4D] text-[10px] uppercase tracking-widest font-sans font-bold group-hover:gap-2 transition-all duration-300 shrink-0">
                            Ver
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Desarrollos;
