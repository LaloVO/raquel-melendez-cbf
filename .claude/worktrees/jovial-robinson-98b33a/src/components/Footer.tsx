import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background pt-24 pb-12 px-6 md:px-12 border-t border-border">
      <div className="luxury-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <Link to="/" className="font-serif text-3xl italic mb-6 block">
              Agencia.
            </Link>
            <p className="font-sans text-sm text-muted-foreground max-w-xs">
              La intersección entre la arquitectura de lujo y la inteligencia artificial.
            </p>
          </div>

          <div className="flex gap-8 text-xs uppercase tracking-widest font-sans font-medium">
            <a href="#" className="hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contacto
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-[10px] text-muted-foreground uppercase tracking-wide flex flex-col sm:flex-row justify-between gap-4">
          <span>© 2025 Agencia Real Estate AI</span>
          <span>Privacy & Terms</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
