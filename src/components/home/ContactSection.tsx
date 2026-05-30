import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, ingresa al menos tu nombre y correo electrónico.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Mock API submission matching existing template style
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensaje Enviado",
        description: `Gracias ${name}, Raquel Meléndrez se pondrá en contacto contigo a la brevedad.`,
      });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1200);
  };

  const inputClass = "w-full bg-white/50 border border-white/40 px-5 py-3 text-xs sm:text-sm text-[#6E6259] outline-none placeholder-[#6E6259]/40 focus:border-[#B76E4D] focus:bg-white/95 transition-all duration-300 rounded-full shadow-sm";
  const textareaClass = "w-full bg-white/50 border border-white/40 px-5 py-3 text-xs sm:text-sm text-[#6E6259] outline-none placeholder-[#6E6259]/40 focus:border-[#B76E4D] focus:bg-white/95 transition-all duration-300 rounded-2xl shadow-sm resize-none";

  return (
    <section id="contacto" ref={sectionRef} className="py-24 bg-[#FAF7F2] scroll-mt-20">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Column: Direct Info Card */}
        <div className="lg:col-span-5 text-[#6E6259]">
          <span className="text-[#B76E4D] text-xs uppercase tracking-[0.25em] font-semibold block mb-4">
            Agendar Asesoría
          </span>
          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-tight font-light mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Iniciemos una
            <br />
            <span className="italic font-semibold text-[#B76E4D]">conversación</span>
            <br />
            estratégica.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6E6259]/75 font-light leading-relaxed mb-10">
            Completa el formulario para coordinar una asesoría personalizada. Conoceré tus objetivos, presupuesto y visión de inversión para ayudarte a encontrar oportunidades alineadas con tu patrimonio y futuro.
          </p>

          {/* Quick contact list - Rounded Icons */}
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

        {/* Right Column: Quiet Minimal Form (Liquidglass + rounded-3xl styling) */}
        <div
          className={`lg:col-span-7 w-full bg-white/45 backdrop-blur-xl border border-white/30 p-8 md:p-10 shadow-elegant rounded-3xl transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-name" className="text-[9px] uppercase tracking-widest font-sans font-bold text-[#6E6259]/70 ml-2">
                Nombre Completo *
              </label>
              <input
                id="form-name"
                type="text"
                placeholder="Ej. Alejandro Ruiz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-email" className="text-[9px] uppercase tracking-widest font-sans font-bold text-[#6E6259]/70 ml-2">
                  Correo Electrónico *
                </label>
                <input
                  id="form-email"
                  type="email"
                  placeholder="Ej. alex@aurum.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              {/* Phone Input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="form-phone" className="text-[9px] uppercase tracking-widest font-sans font-bold text-[#6E6259]/70 ml-2">
                  Teléfono / WhatsApp
                </label>
                <input
                  id="form-phone"
                  type="tel"
                  placeholder="Ej. +52 55 1234 5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="form-message" className="text-[9px] uppercase tracking-widest font-sans font-bold text-[#6E6259]/70 ml-2">
                Mensaje
              </label>
              <textarea
                id="form-message"
                rows={4}
                placeholder="Cuéntame sobre tus objetivos de inversión o la propiedad que estás buscando…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={textareaClass}
              />
            </div>

            {/* Quiet terracotta contrast submit button - Pill shape */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 bg-[#B76E4D] text-white hover:bg-[#6E6259] disabled:bg-[#B76E4D]/60 transition-all duration-300 font-sans uppercase text-[10px] tracking-[0.25em] font-semibold rounded-full flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? 'Agendando...' : 'Agendar asesoría'}
            </button>

            <p className="text-center font-sans text-[10px] text-[#6E6259]/60 mt-2 leading-relaxed font-light">
              Cada conversación comienza entendiendo tu visión y objetivos a largo plazo.
            </p>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
