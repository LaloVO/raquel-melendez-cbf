import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { site } = useSiteUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/mapa', label: 'Explorar Mapa' },
  ];

  const baseClasses = isHomePage && !isScrolled
    ? 'text-luxury-white mix-blend-difference'
    : 'text-foreground';

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 py-5 md:px-12 flex justify-between items-center transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-background/90 backdrop-blur-md shadow-sm'
          : ''
      }`}
    >
      <Link
        to="/"
        className={`font-serif text-2xl md:text-3xl italic tracking-tight z-50 transition-colors ${baseClasses}`}
      >
        {site?.site_name ?? 'Agencia.'}
      </Link>

      {/* Desktop Navigation */}
      <div className={`hidden md:flex gap-8 text-sm uppercase tracking-widest font-sans font-medium ${baseClasses}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden z-50 ${baseClasses}`}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-3xl text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
