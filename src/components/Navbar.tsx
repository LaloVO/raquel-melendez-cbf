import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { site } = useSiteUser();
  const isMapPage = location.pathname === '/mapa';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#mision', label: 'Misión' },
    { href: '/#vision', label: 'Visión' },
    { href: '/mapa', label: 'Inmuebles' },
    { href: '/#masaroca', label: 'Masaroca' },
    { href: '/#cursos', label: 'Cursos' },
    { href: '/#contacto', label: 'Contacto' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('/#')) {
      const targetId = href.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[85rem] bg-white/30 backdrop-blur-xl border border-white/30 shadow-elegant rounded-full px-8 py-2.5'
          : isMapPage
          ? 'top-0 left-0 w-full bg-[#FAF7F2]/80 backdrop-blur-md border-b border-[#E9DDCF]/40 px-6 py-4 md:px-12'
          : 'top-0 left-0 w-full bg-transparent px-6 py-5 md:px-12'
      }`}
    >
      <div className="w-full flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          className="font-serif text-base md:text-lg tracking-[0.25em] uppercase text-[#6E6259] hover:text-[#B76E4D] transition-colors duration-300 font-semibold flex items-center gap-1"
        >
          {site?.site_name ? site.site_name : 'Ralque Meléndez'}
          <span className="text-[#B76E4D]">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.25em] font-sans font-medium text-[#6E6259]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-[#B76E4D] transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B76E4D] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('/solicita-inmueble')}
              className={`px-5 py-2 bg-[#B76E4D] text-white font-sans uppercase text-[9px] tracking-[0.2em] font-semibold hover:bg-[#6E6259] transition-colors duration-300 shadow-sm ${
                isScrolled ? 'rounded-full' : 'rounded-none'
              }`}
            >
              Solicitar Inmueble
            </button>
            <button
              onClick={() => handleNavClick('/#contacto')}
              className="font-sans uppercase text-[9px] tracking-[0.2em] font-semibold text-[#6E6259] hover:text-[#B76E4D] transition-colors duration-300"
            >
              Agenda Cita
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#6E6259] hover:text-[#B76E4D] transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu with Glassmorphism */}
      <div
        className={`fixed inset-0 bg-[#FAF7F2]/95 backdrop-blur-xl z-40 md:hidden flex flex-col justify-center items-center gap-8 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-serif text-2xl text-[#6E6259] hover:text-[#B76E4D] transition-colors duration-300 tracking-wider"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('/solicita-inmueble')}
            className="mt-4 px-8 py-3 bg-[#B76E4D] text-white font-sans uppercase text-xs tracking-[0.2em] rounded-full hover:bg-[#6E6259] transition-colors duration-300"
          >
            Solicitar Inmueble
          </button>
          <button
            onClick={() => handleNavClick('/#contacto')}
            className="px-8 py-3 border border-[#6E6259]/30 text-[#6E6259] font-sans uppercase text-xs tracking-[0.2em] rounded-full hover:border-[#B76E4D] hover:text-[#B76E4D] transition-colors duration-300"
          >
            Agenda Cita
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
