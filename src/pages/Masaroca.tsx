import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MessageCircle, Calculator, Package, Check, Shield, Flame, Droplet, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSiteUser } from '@/hooks/useSiteUser';

interface ColorOption {
  id: string;
  name: string;
  hex: string;
  description: string;
  image: string;
}

const colorOptions: ColorOption[] = [
  {
    id: 'blanco',
    name: 'Blanco Arena',
    hex: '#F4F1EA',
    description: 'Tono marfil orgánico que refleja la luz natural aportando calidez y amplitud.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gris',
    name: 'Gris Cemento',
    hex: '#D1CFC9',
    description: 'Estética mineral contemporánea que emula la sobriedad del concreto expuesto.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'terracota',
    name: 'Terracota Mineral',
    hex: '#C58C73',
    description: 'Pigmento terroso natural que inyecta carácter, textura y calidez artesanal.',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'espresso',
    name: 'Tierra Espresso',
    hex: '#695E54',
    description: 'Profundidad mineral oscura para muros de acento que evocan elegancia y misterio.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
  }
];

const MasarocaPage = () => {
  const { user } = useSiteUser();
  const whatsappNumber = user?.telefono_usuario?.replace(/\D/g, '') || '525512345678';

  // Calculator State
  const [m2, setM2] = useState<number>(30);
  const [finish, setFinish] = useState<'smooth' | 'rustic'>('rustic');
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colorOptions[0]);

  // Derived calculations
  // Rustic covers 3 m2 per bag, Smooth covers 5 m2 per bag
  const coveragePerBag = finish === 'rustic' ? 3 : 5;
  const requiredBags = Math.max(1, Math.ceil(m2 / coveragePerBag));
  const estimatedPricePerBag = 980; // MXN
  const estimatedTotal = requiredBags * estimatedPricePerBag;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getWhatsappOrderUrl = () => {
    const finishLabel = finish === 'rustic' ? 'Rústico Escultural' : 'Liso Minimalista';
    const message = `Hola Raquel, me interesa realizar un pedido de MasaRoca:\n\n` +
      `- Área del Proyecto: ${m2} m²\n` +
      `- Acabado Seleccionado: ${finishLabel}\n` +
      `- Tono Mineral: ${selectedColor.name}\n` +
      `- Sacos Calculados: ${requiredBags} saco(s)\n\n` +
      `Me gustaría recibir una cotización formal y coordinar la logística de entrega.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <Helmet>
        <title>MasaRoca | Pedidos y Cómputo Digital | Raquel Meléndrez</title>
        <meta
          name="description"
          content="Calcula y solicita tu MasaRoca de manera digital. Revestimiento mineral mexicano de alto desempeño para aplicaciones arquitectónicas e interiores."
        />
      </Helmet>

      <Navbar />

      <main className="pt-24 min-h-screen bg-[#FAF7F2]">
        
        {/* Navigation Back */}
        <div className="px-6 md:px-12 py-4 max-w-[90rem] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-medium text-[#6E6259]/65 hover:text-[#B76E4D] transition-colors duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#B76E4D]" />
            Regresar al Inicio
          </Link>
        </div>

        {/* Hero Section - Editorial magazine style */}
        <section className="px-6 md:px-12 max-w-[90rem] mx-auto mb-16">
          <div className="max-w-4xl text-[#6E6259]">
            <span className="text-[#B76E4D] text-xs uppercase tracking-[0.25em] font-semibold block mb-4">
              Tecnología Mineral Mexicana
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6">
              MasaRoca: Escultura &
              <br />
              <span className="italic font-semibold text-[#B76E4D]">Desempeño Estructural</span>
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#6E6259]/75 font-light leading-relaxed max-w-2xl">
              Calcula y gestiona tu pedido digital de MasaRoca directamente desde nuestra plataforma. 
              Suministramos el material formulado con arenas seleccionadas y minerales de alta pureza 
              para transformar tus muros en obras habitables de alta durabilidad.
            </p>
          </div>
        </section>

        {/* Interactive Workspace Grid */}
        <section className="px-6 md:px-12 max-w-[90rem] mx-auto pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Product Selection & Colors */}
          <div className="lg:col-span-7 flex flex-col gap-10 text-[#6E6259]">
            
            {/* Step 1: Color Showcase cards */}
            <div>
              <h2 className="font-serif text-xl md:text-2xl font-normal mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#B76E4D]/10 text-[#B76E4D] text-xs font-bold rounded-full flex items-center justify-center font-sans">1</span>
                Elige tu Tono Mineral
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {colorOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedColor(option)}
                    className={`text-left p-4 bg-white/50 backdrop-blur-sm border rounded-2xl flex gap-4 transition-all duration-300 hover:bg-white/80 hover:shadow-sm ${
                      selectedColor.id === option.id
                        ? 'border-[#B76E4D] ring-1 ring-[#B76E4D]/35 bg-white/90 shadow-sm'
                        : 'border-[#E9DDCF]/40'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#E9DDCF]/10">
                      <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: option.hex }} />
                        <span className="font-sans font-bold text-xs uppercase tracking-wider truncate">
                          {option.name}
                        </span>
                        {selectedColor.id === option.id && <Check className="w-3.5 h-3.5 text-[#B76E4D] ml-auto shrink-0" />}
                      </div>
                      <p className="font-sans text-[11px] text-[#6E6259]/70 font-light mt-1.5 leading-snug line-clamp-2">
                        {option.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Technical attributes */}
            <div className="border-t border-[#E9DDCF]/35 pt-8">
              <h2 className="font-serif text-xl md:text-2xl font-normal mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-[#B76E4D]/10 text-[#B76E4D] text-xs font-bold rounded-full flex items-center justify-center font-sans">2</span>
                Atributos de Desempeño
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-xs">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-[#E9DDCF]/45 rounded-xl flex items-center justify-center shrink-0 text-[#B76E4D]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-[#6E6259]">Resistencia Estructural</h4>
                    <p className="text-[#6E6259]/70 font-light mt-1 leading-relaxed">
                      Soporta cargas mecánicas y físicas superiores al mortero convencional, actuando como elemento estabilizador.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-[#E9DDCF]/45 rounded-xl flex items-center justify-center shrink-0 text-[#B76E4D]">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-[#6E6259]">Ignífugo</h4>
                    <p className="text-[#6E6259]/70 font-light mt-1 leading-relaxed">
                      Material mineral no combustible que proporciona un escudo protector pasivo contra el fuego y altas temperaturas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-[#E9DDCF]/45 rounded-xl flex items-center justify-center shrink-0 text-[#B76E4D]">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-[#6E6259]">100% Impermeable</h4>
                    <p className="text-[#6E6259]/70 font-light mt-1 leading-relaxed">
                      Barrera selladora mineral absoluta que impide el paso de la humedad y salitre hacia las estructuras.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-[#E9DDCF]/45 rounded-xl flex items-center justify-center shrink-0 text-[#B76E4D]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-[#6E6259]">Modelado Libre</h4>
                    <p className="text-[#6E6259]/70 font-light mt-1 leading-relaxed">
                      Facilidad de esculpir manualmente sin cimbra o moldes rígidos. Ideal para relieves, curvas y texturas esculturales.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Digital Calculator Form */}
          <div className="lg:col-span-5 sticky top-28 w-full bg-white/45 backdrop-blur-xl border border-white/35 p-6 md:p-8 rounded-3xl shadow-elegant text-[#6E6259]">
            <h2 className="font-serif text-xl md:text-2xl font-normal mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#B76E4D]" />
              Cotizador & Pedido Digital
            </h2>

            {/* Input Área (m2) */}
            <div className="flex flex-col gap-2 mb-6">
              <label htmlFor="input-m2" className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#6E6259]/70 ml-2">
                Área Total a Cubrir (m²)
              </label>
              <input
                id="input-m2"
                type="number"
                min={1}
                max={5000}
                value={m2}
                onChange={(e) => setM2(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full bg-white/60 border border-[#E9DDCF] px-5 py-3.5 font-sans font-bold text-lg text-[#6E6259] outline-none placeholder-[#6E6259]/40 focus:border-[#B76E4D] focus:bg-white transition-all rounded-full shadow-sm"
              />
            </div>

            {/* Selector de Acabado */}
            <div className="flex flex-col gap-2 mb-8">
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#6E6259]/70 ml-2 mb-1">
                Tipo de Acabado & Rendimiento
              </span>
              <div className="grid grid-cols-2 gap-3 p-1 bg-black/5 border border-[#E9DDCF]/40 rounded-full">
                <button
                  type="button"
                  onClick={() => setFinish('rustic')}
                  className={`py-2.5 text-[10px] uppercase tracking-widest font-sans rounded-full transition-all font-bold whitespace-nowrap ${
                    finish === 'rustic'
                      ? 'bg-[#B76E4D] text-white shadow-sm'
                      : 'text-[#6E6259]/70 hover:text-[#6E6259]'
                  }`}
                >
                  Rústico / Textura
                </button>
                <button
                  type="button"
                  onClick={() => setFinish('smooth')}
                  className={`py-2.5 text-[10px] uppercase tracking-widest font-sans rounded-full transition-all font-bold whitespace-nowrap ${
                    finish === 'smooth'
                      ? 'bg-[#B76E4D] text-white shadow-sm'
                      : 'text-[#6E6259]/70 hover:text-[#6E6259]'
                  }`}
                >
                  Liso / Minimalista
                </button>
              </div>
              <p className="font-sans text-[10px] text-[#6E6259]/60 font-light mt-1.5 px-2">
                * El acabado rústico rinde aprox. **3 m²** por saco de 20kg. El acabado liso rinde aprox. **5 m²** por saco de 20kg.
              </p>
            </div>

            {/* Calculations display */}
            <div className="bg-[#FAF7F2]/90 border border-[#E9DDCF]/45 rounded-2xl p-5 mb-8 flex flex-col gap-4 font-sans text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-[#E9DDCF]/25">
                <span className="text-[#6E6259]/70 font-light">Tono Mineral</span>
                <span className="font-bold text-[#6E6259]">{selectedColor.name}</span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-[#E9DDCF]/25">
                <span className="text-[#6E6259]/70 font-light flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#B76E4D]" />
                  Sacos de MasaRoca Requeridos
                </span>
                <span className="font-bold text-lg text-[#6E6259]">{requiredBags} sacos</span>
              </div>

              <div className="flex justify-between items-end pt-1">
                <div>
                  <span className="block text-[#6E6259]/70 font-light">Estimado de Suministro</span>
                  <span className="block text-[9px] text-[#6E6259]/50 font-light mt-0.5">* No incluye envío ni aplicación</span>
                </div>
                <span className="font-bold text-2xl text-[#B76E4D] whitespace-nowrap">
                  ${estimatedTotal.toLocaleString('es-MX')} MXN
                </span>
              </div>
            </div>

            {/* Purchase CTA via WhatsApp */}
            <a
              href={getWhatsappOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-4 bg-[#B76E4D] hover:bg-[#6E6259] text-white font-sans uppercase text-[10px] tracking-[0.25em] font-semibold transition-all duration-300 rounded-full shadow-md hover:-translate-y-0.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Solicitar Pedido Digital
            </a>

            <p className="text-center font-sans text-[8px] uppercase tracking-widest text-[#6E6259]/50 mt-4 leading-relaxed font-light">
              Envío directo de fábrica a toda la República Mexicana. Soporte técnico incluido.
            </p>
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default MasarocaPage;
