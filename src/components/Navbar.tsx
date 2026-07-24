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
    { href: '/#mision', label: 'Misión y Visión' },
    { href: '/mapa', label: 'Inmuebles' },
    { href: '/desarrollos', label: 'Desarrollos' },
    { href: '/masaroca', label: 'Masaroca' },
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
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'top-3 md:top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-[85rem] bg-white/30 backdrop-blur-xl border border-white/30 shadow-elegant rounded-full px-4 py-2.5 md:px-8'
            : isMapPage
            ? 'top-0 left-0 w-full bg-[#FAF7F2]/80 backdrop-blur-md border-b border-[#E9DDCF]/40 px-4 py-4 md:px-12'
            : 'top-0 left-0 w-full bg-transparent px-4 py-5 md:px-12'
        }`}
      >
        <div className="w-full flex justify-between items-center gap-2">
          {/* Brand Logo */}
          <Link
            to="/"
            className="font-serif text-[16px] sm:text-[18px] md:text-[22.5px] tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] uppercase text-black hover:text-[#B76E4D] transition-colors duration-300 font-semibold flex items-center gap-0.5 truncate min-w-0"
          >
            <span className="truncate">{site?.site_name ? site.site_name : 'Raquel Meléndrez'}</span>
            <span className="text-[#B76E4D] shrink-0">.</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 text-[12.5px] uppercase tracking-[0.25em] font-sans font-medium text-black">
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
                onClick={() => handleNavClick('/vender-propiedad')}
                className={`px-5 py-2 bg-[#B76E4D] text-white font-sans uppercase text-[11.25px] tracking-[0.2em] font-semibold hover:bg-black transition-colors duration-300 shadow-sm ${
                  isScrolled ? 'rounded-full' : 'rounded-none'
                }`}
              >
                Vender mi Propiedad
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-black hover:text-[#B76E4D] transition-colors focus:outline-none shrink-0 z-50 p-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-[24px] h-[24px]" /> : <Menu className="w-[24px] h-[24px]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu Overlay - Outside nav tag for true viewport positioning */}
      <div
        className={`fixed inset-0 bg-[#FAF7F2] z-[100] md:hidden flex flex-col justify-center items-center gap-8 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-black hover:text-[#B76E4D] transition-colors p-2"
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-serif text-[28px] text-black hover:text-[#B76E4D] transition-colors duration-300 tracking-wider"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('/vender-propiedad')}
            className="mt-4 px-8 py-3 bg-[#B76E4D] text-white font-sans uppercase text-[14px] tracking-[0.2em] rounded-full hover:bg-black transition-colors duration-300"
          >
            Vender mi Propiedad
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
