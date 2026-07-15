import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MessageCircle, Calculator, Check, Shield, Droplet, Award, ChevronDown, Sparkles } from 'lucide-react';
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
    name: 'Blanco',
    hex: '#F4F1EA',
    description: 'Tono que refleja la luz natural aportando calidez y amplitud.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gris',
    name: 'Gris',
    hex: '#D1CFC9',
    description: 'Estética contemporánea que emula la sobriedad del concreto expuesto.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop'
  }
];

interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqItems: FaqItem[] = [
  {
    question: '¿Qué es MasaRoca?',
    answer: 'MasaRoca es una tecnología mexicana de microconcretos de alta resistencia diseñada para construir, reparar e impermeabilizar utilizando un mismo sistema. Sus productos destacan por su impermeabilidad, resistencia mecánica, facilidad de aplicación y gran versatilidad para aplicaciones estructurales, industriales, arquitectónicas y artísticas.'
  },
  {
    question: '¿Qué hace diferente a MasaRoca de un mortero tradicional?',
    answer: (
      <div>
        <p className="mb-3">A diferencia de los morteros convencionales, MasaRoca fue desarrollada para reducir procesos constructivos y ofrecer características que normalmente requieren varios productos diferentes.</p>
        <p className="mb-2 font-semibold">Entre sus principales ventajas destacan:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Impermeabilidad.</li>
          <li>Alta resistencia mecánica.</li>
          <li>No presenta contracción.</li>
          <li>Reduce o elimina agrietamientos.</li>
          <li>Permite modelar superficies.</li>
          <li>Disminuye tiempos de construcción.</li>
          <li>Puede sustituir varios materiales en una sola aplicación.</li>
        </ul>
      </div>
    )
  },
  {
    question: '¿Para qué sirve MasaRoca?',
    answer: (
      <div>
        <p className="mb-2">Puede utilizarse para:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Reparaciones estructurales.</li>
          <li>Impermeabilización.</li>
          <li>Construcción.</li>
          <li>Rescate de elementos de concreto.</li>
          <li>Recubrimientos.</li>
          <li>Afinado de losas.</li>
          <li>Obras industriales.</li>
          <li>Arte y escultura.</li>
          <li>Remodelaciones.</li>
          <li>Restauración de estructuras.</li>
        </ul>
      </div>
    )
  },
  {
    question: '¿Qué productos ofrece MasaRoca?',
    answer: (
      <div>
        <p className="mb-2">Actualmente la tecnología contempla productos como:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>TG3 Micro Concreto Rescate Estructural.</li>
          <li>Composite Impermeabilizante para concreto.</li>
          <li>Micro Concreto Fraguado Express.</li>
          <li>Afinador de Losa.</li>
          <li>Resanador NC3.</li>
        </ul>
      </div>
    )
  },
  {
    question: '¿Necesita aditivos especiales?',
    answer: 'No. Los productos están diseñados para mezclarse únicamente con agua, simplificando la preparación y reduciendo errores durante la aplicación.'
  },
  {
    question: '¿Se puede aplicar sobre concreto existente?',
    answer: 'Sí. Fue desarrollado precisamente para reparación, reforzamiento y rehabilitación de elementos de concreto existentes, ofreciendo una alta adherencia al sustrato.'
  },
  {
    question: '¿Es impermeable?',
    answer: 'Sí. Una de las principales características de la tecnología MasaRoca es impedir el paso del agua y otros líquidos contaminantes, ayudando a proteger las estructuras y aumentar su durabilidad.'
  },
  {
    question: '¿Se agrieta al secar?',
    answer: 'No. La tecnología desarrollada por MasaRoca, no presenta contracción, por lo que reduce significativamente la formación de grietas y elimina juntas frías en muchas aplicaciones.'
  },
  {
    question: '¿Qué tan resistente es?',
    answer: (
      <div>
        <p className="mb-2">Los materiales fueron formulados para ofrecer altas resistencias frente a:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Compresión.</li>
          <li>Tensión.</li>
          <li>Flexión.</li>
          <li>Abrasión.</li>
          <li>Impacto.</li>
          <li>Intemperie.</li>
          <li>Rayos UV.</li>
          <li>Agua.</li>
          <li>Fuego.</li>
          <li>Diversas sustancias químicas.</li>
        </ul>
      </div>
    )
  },
  {
    question: '¿Puede utilizarse en exteriores?',
    answer: 'Sí. Está diseñado para resistir condiciones climáticas severas y exposición permanente al exterior.'
  },
  {
    question: '¿También sirve para impermeabilizar?',
    answer: 'Sí. Existen soluciones específicas dentro de la línea MasaRoca enfocadas en impermeabilización, además de que el propio microconcreto incorpora propiedades impermeables.'
  },
  {
    question: '¿Se necesita cimbra?',
    answer: 'En muchas aplicaciones puede reducirse considerablemente o incluso eliminarse el uso de cimbra gracias a su capacidad de mantener la forma durante la aplicación.'
  },
  {
    question: '¿Se puede modelar o esculpir?',
    answer: 'Sí. Una de las características más distintivas de MasaRoca es su capacidad para modelar piedra y crear acabados con color y textura sin necesidad de moldes complejos. Por ello también se utiliza en arte y escultura.'
  },
  {
    question: '¿Reduce tiempos de obra?',
    answer: 'Sí. Al eliminar procesos, disminuir materiales y facilitar la aplicación, permite ejecutar trabajos en menos tiempo y con menor mano de obra.'
  },
  {
    question: '¿Qué mantenimiento requiere?',
    answer: 'Una vez correctamente aplicado, el sistema está diseñado para ofrecer una alta durabilidad y reducir la necesidad de mantenimientos frecuentes gracias a su resistencia e impermeabilidad.'
  },
  {
    question: '¿Quién puede utilizar MasaRoca?',
    answer: (
      <div>
        <p className="mb-2">Está dirigido a:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Constructoras.</li>
          <li>Arquitectos.</li>
          <li>Ingenieros.</li>
          <li>Contratistas.</li>
          <li>Empresas de mantenimiento.</li>
          <li>Impermeabilizadores.</li>
          <li>Escultores.</li>
          <li>Artistas.</li>
          <li>Propietarios que desean reparar o impermeabilizar sus inmuebles.</li>
        </ul>
      </div>
    )
  },
  {
    question: '¿Venden únicamente grandes volúmenes?',
    answer: 'No. Se pueden atender desde quien necesita un solo bulto hasta proyectos de gran escala.'
  },
  {
    question: '¿Brindan asesoría técnica?',
    answer: 'Sí. MasaRoca ofrece asesoría técnica para ayudar a seleccionar el producto adecuado y acompañar al cliente durante su proyecto.'
  },
  {
    question: '¿La fórmula de MasaRoca es exclusiva?',
    answer: 'Sí. “La fórmula ORIGINAL solamente la tiene MasaRoca", destacando el carácter propio y exclusivo de su tecnología.'
  }
];

const MasarocaPage = () => {
  const { user } = useSiteUser();
  const whatsappNumber = '525582016475';

  // Form State
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [m2, setM2] = useState<number | string>(30);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colorOptions[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getWhatsappOrderUrl = () => {
    const message = `Hola Raquel, me interesa realizar una solicitud sobre MasaRoca:\n\n` +
      `- Proyecto: ${projectDescription || 'No especificado'}\n` +
      `- Área del Proyecto: ${m2 ? `${m2} m²` : 'No especificada'}\n` +
      `- Tono: ${selectedColor.name}\n\n` +
      `Me gustaría recibir más información y asesoría para mi proyecto.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <Helmet>
        <title>MasaRoca | Pedidos y Cómputo Digital | Raquel Meléndrez</title>
        <meta
          name="description"
          content="Calcula y solicita tu MasaRoca de manera digital. Revestimiento mexicano de alto desempeño para aplicaciones arquitectónicas e interiores."
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
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light leading-none mb-3">
              Masaroca
            </h1>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl italic font-semibold text-[#B76E4D]">
              Construcción, Mantenimiento, Rescate estructural y Arte
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
                Elige tu Tono
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
                        <span className="font-sans font-bold text-[13px] uppercase tracking-wider truncate">
                          {option.name}
                        </span>
                        {selectedColor.id === option.id && <Check className="w-3.5 h-3.5 text-[#B76E4D] ml-auto shrink-0" />}
                      </div>
                      <p className="font-sans text-[13px] text-[#6E6259]/70 font-light mt-1.5 leading-snug line-clamp-2 text-justify">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-[#E9DDCF]/45 rounded-xl flex items-center justify-center shrink-0 text-[#B76E4D]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-[#6E6259] text-[13.5px]">Resistencia Mecánica</h4>
                    <p className="text-[#6E6259]/70 font-light mt-1 leading-relaxed text-justify text-[14px]">
                      Microconcreto de alta resistencia mecánica diseñado para aplicaciones estructurales, industriales y arquitectónicas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-[#E9DDCF]/45 rounded-xl flex items-center justify-center shrink-0 text-[#B76E4D]">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-[#6E6259] text-[13.5px]">Impermeabilidad</h4>
                    <p className="text-[#6E6259]/70 font-light mt-1 leading-relaxed text-justify text-[14px]">
                      Barrera selladora absoluta que impide el paso de la humedad y salitre hacia las estructuras.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-[#E9DDCF]/45 rounded-xl flex items-center justify-center shrink-0 text-[#B76E4D]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-[#6E6259] text-[13.5px]">Estabilidad Dimensional</h4>
                    <p className="text-[#6E6259]/70 font-light mt-1 leading-relaxed text-justify text-[14px]">
                      Fórmula avanzada que no presenta contracción, reduciendo o eliminando agrietamientos en la superficie.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-[#E9DDCF]/45 rounded-xl flex items-center justify-center shrink-0 text-[#B76E4D]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-[#6E6259] text-[13.5px]">Gran Versatilidad</h4>
                    <p className="text-[#6E6259]/70 font-light mt-1 leading-relaxed text-justify text-[14px]">
                      Sustituye múltiples materiales en una sola aplicación y permite el modelado libre de superficies.
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
              Cotizador & Pedido
            </h2>

            {/* Input Proyecto */}
            <div className="flex flex-col gap-2 mb-6">
              <label htmlFor="input-project" className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#6E6259]/70 ml-2">
                Cuéntame de tu proyecto
              </label>
              <textarea
                id="input-project"
                rows={4}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Ej. Quiero recubrir los muros de mi sala con acabado liso..."
                className="w-full bg-white/60 border border-[#E9DDCF] px-5 py-3.5 font-sans text-sm text-[#6E6259] outline-none placeholder-[#6E6259]/40 focus:border-[#B76E4D] focus:bg-white transition-all rounded-2xl shadow-sm resize-none"
              />
            </div>

            {/* Input Área (m2) */}
            <div className="flex flex-col gap-2 mb-6">
              <label htmlFor="input-m2" className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#6E6259]/70 ml-2">
                Área Total (m2)
              </label>
              <input
                id="input-m2"
                type="number"
                min={1}
                max={5000}
                value={m2}
                onChange={(e) => setM2(e.target.value)}
                className="w-full bg-white/60 border border-[#E9DDCF] px-5 py-3.5 font-sans font-bold text-lg text-[#6E6259] outline-none placeholder-[#6E6259]/40 focus:border-[#B76E4D] focus:bg-white transition-all rounded-full shadow-sm"
              />
            </div>

            {/* Summary display */}
            <div className="bg-[#FAF7F2]/90 border border-[#E9DDCF]/45 rounded-2xl p-5 mb-8 flex flex-col gap-3 font-sans text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#6E6259]/70 font-light">Tono Seleccionado</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-black/10 shadow-sm shrink-0" style={{ backgroundColor: selectedColor.hex }} />
                  <span className="font-bold text-[#6E6259]">{selectedColor.name}</span>
                </div>
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
              Enviar Solicitud
            </a>

            <p className="text-center font-sans text-[10px] uppercase tracking-widest text-[#B76E4D] mt-4 leading-relaxed font-semibold">
              Envío directo de fábrica a toda la República Mexicana. Soporte técnico incluido.
            </p>
          </div>

        </section>

        {/* FAQ Section */}
        <section className="px-6 md:px-12 max-w-4xl mx-auto pb-24 border-t border-[#E9DDCF]/35 pt-16">
          <div className="text-center mb-12">
            <span className="text-[#B76E4D] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">
              Preguntas Frecuentes
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#6E6259]">
              Tecnología MasaRoca
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`bg-white/45 backdrop-blur-md border rounded-3xl transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'border-[#B76E4D] bg-white/70 shadow-sm' 
                      : 'border-[#E9DDCF]/40 hover:border-[#B76E4D]/40 hover:bg-white/60'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-[#6E6259]"
                  >
                    <span className="font-serif font-medium text-base md:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#B76E4D] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className="transition-all duration-300 ease-in-out overflow-hidden"
                    style={{ maxHeight: isOpen ? '1000px' : '0px' }}
                  >
                    <div className="px-6 py-5 text-sm font-sans font-light leading-relaxed text-[#6E6259]/85 border-t border-[#E9DDCF]/20 text-justify">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default MasarocaPage;
