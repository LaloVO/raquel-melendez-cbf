import { Link } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';

const Footer = () => {
  const { site, user } = useSiteUser();

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.substring(2);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-[#2E251E] text-[#FAF7F2] py-20 px-6 md:px-12 border-t border-[#4A3F35]">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="font-serif text-xl tracking-[0.2em] uppercase text-white font-semibold"
          >
            {site?.site_name ? site.site_name : 'Raquel Meléndrez'}
            <span className="text-[#B76E4D]">.</span>
          </Link>
          <p className="font-sans text-[13px] text-[#FAF7F2]/60 font-light leading-relaxed max-w-[240px]">
            Asesoría inmobiliaria estratégica internacional. Tomando decisiones inteligentes para tu patrimonio en México y EE.UU.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="font-serif text-sm uppercase tracking-[0.15em] text-[#B76E4D] font-medium mb-6">
            Navegación
          </h4>
          <ul className="flex flex-col gap-3 font-sans text-xs uppercase tracking-widest text-[#FAF7F2]/75">
            <li>
              <button onClick={() => handleNavClick('/#mision')} className="hover:text-white transition-colors">
                Misión
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('/#vision')} className="hover:text-white transition-colors">
                Visión
              </button>
            </li>
            <li>
              <Link to="/mapa" className="hover:text-white transition-colors">
                Inmuebles
              </Link>
            </li>
            <li>
              <button onClick={() => handleNavClick('/masaroca')} className="hover:text-white transition-colors">
                Masaroca
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('/#cursos')} className="hover:text-white transition-colors">
                Cursos
              </button>
            </li>
          </ul>
        </div>

        {/* Presence Column */}
        <div>
          <h4 className="font-serif text-sm uppercase tracking-[0.15em] text-[#B76E4D] font-medium mb-6">
            Presencia
          </h4>
          <div className="flex flex-col gap-4 font-sans text-xs text-[#FAF7F2]/70 leading-relaxed font-light">
            <div>
              <span className="block font-medium uppercase tracking-wider text-[#FAF7F2]">México</span>
              <span className="block text-[#FAF7F2]/50 text-[11px]">Ciudad de México, Monterrey, Riviera Maya</span>
            </div>
            <div>
              <span className="block font-medium uppercase tracking-wider text-[#FAF7F2]">EE.UU.</span>
              <span className="block text-[#FAF7F2]/50 text-[11px]">Miami, San Antonio, The Woodlands</span>
            </div>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-serif text-sm uppercase tracking-[0.15em] text-[#B76E4D] font-medium mb-6">
            Contacto
          </h4>
          <div className="flex flex-col gap-3 font-sans text-xs text-[#FAF7F2]/70 font-light">
            <p>
              <span className="block text-[10px] uppercase tracking-widest text-[#FAF7F2]/45 mb-0.5">Email</span>
              <a href={`mailto:${user?.email_usuario ?? 'contacto@raquelmelendrez.com'}`} className="hover:text-[#B76E4D] transition-colors">
                {user?.email_usuario ?? 'contacto@raquelmelendrez.com'}
              </a>
            </p>
            {user?.telefono_usuario && (
              <p>
                <span className="block text-[10px] uppercase tracking-widest text-[#FAF7F2]/45 mb-0.5">Teléfono</span>
                <a href={`tel:${user.telefono_usuario}`} className="hover:text-[#B76E4D] transition-colors">
                  {user.telefono_usuario}
                </a>
              </p>
            )}
            <p>
              <span className="block text-[10px] uppercase tracking-widest text-[#FAF7F2]/45 mb-0.5">Ubicación principal</span>
              <span className="text-[#FAF7F2]/60">Lomas de Chapultepec, CDMX</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto border-t border-[#4A3F35]/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-[#FAF7F2]/40 font-sans">
        <p>© {new Date().getFullYear()} Raquel Meléndrez Inmobiliaria. Todos los derechos reservados.</p>
        <p className="font-light">
          Miembro de{' '}
          <a href="https://homepty.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#B76E4D] font-semibold text-[#FAF7F2]/60 transition-colors">
            homepty
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
