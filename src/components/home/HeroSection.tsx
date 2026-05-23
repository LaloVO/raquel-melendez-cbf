import { Search, MapPin, Home, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const { site } = useSiteUser();

  const mapboxToken = (site?.platform_config?.mapbox_token || import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '').trim();

  // Search Filter State
  const [transactionType, setTransactionType] = useState<'1' | '2'>('1'); // 1 = Venta, 2 = Renta
  const [propertyType, setPropertyType] = useState<string>('');
  const [locationText, setLocationText] = useState<string>('');

  // Suggestions and Autocomplete State
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; name: string } | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to clicks outside to close suggestions dropdown
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Fetch suggestions with debounce as the user types
  useEffect(() => {
    if (!locationText.trim() || !mapboxToken) {
      setSuggestions([]);
      return;
    }

    // If the locationText matches the selected coordinates' name, don't query again
    if (selectedCoords && locationText === selectedCoords.name) {
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            locationText
          )}.json?access_token=${mapboxToken}&limit=5&types=neighborhood,locality,place,address&country=mx,us`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.features || []);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [locationText, mapboxToken, selectedCoords]);

  const handleSuggestionClick = (feature: any) => {
    const [lng, lat] = feature.center;
    const name = feature.place_name;
    setLocationText(name);
    setSelectedCoords({ lat, lng, name });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (transactionType) params.set('action', transactionType);
    if (propertyType) params.set('type', propertyType);
    if (locationText) params.set('search', locationText);
    
    if (selectedCoords) {
      params.set('lat', String(selectedCoords.lat));
      params.set('lng', String(selectedCoords.lng));
    } else if (locationText.trim() && mapboxToken) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            locationText
          )}.json?access_token=${mapboxToken}&limit=1&country=mx,us`
        );
        if (response.ok) {
          const data = await response.json();
          if (data?.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            params.set('lat', String(lat));
            params.set('lng', String(lng));
          }
        }
      } catch (error) {
        console.error('Error geocoding in HeroSection:', error);
      }
    }
    
    navigate(`/mapa?${params.toString()}`);
  };

  return (
    <header className="relative w-full h-screen overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-24">
      {/* 1. Full-screen cover background with subtle golden-hour parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-[120%] bg-cover bg-center transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2574&auto=format&fit=crop')`,
            transform: `translateY(${scrollY * 0.15}px) scale(1.02)`,
          }}
        />
        {/* 2. Soft Dark/Warm transparent overlay for exquisite readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/20" />
      </div>

      {/* 3. Main Content Container: Left-Aligned Editorial Focus */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col items-start mt-12 md:mt-20">
        
        {/* Small Brand Badge */}
        <span
          className={`text-[#B76E4D] text-[10px] sm:text-xs uppercase tracking-[0.4em] font-semibold block mb-6 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Ralque Meléndez · Inmobiliaria Boutique
        </span>

        {/* Big Large Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] text-[#FAF7F2] font-light max-w-4xl mb-12">
          <span
            className={`block transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            Encuentra una propiedad que
          </span>
          <span
            className={`block italic font-normal text-[#B76E4D] mt-2 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            sí haga sentido
          </span>
          <span
            className={`block transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            para tu futuro.
          </span>
        </h1>

        {/* 4. Sleek Horizontal Floating Pill Search Bar */}
        <form
          onSubmit={handleSearch}
          className={`w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 p-2 md:p-3 rounded-none md:rounded-full flex flex-col md:flex-row gap-3 md:gap-2 items-center transition-all duration-1000 delay-500 shadow-elegant ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {/* Action Selector (Pill style toggle inside bar) */}
          <div className="w-full md:w-auto shrink-0 flex p-1 bg-black/20 border border-white/10 rounded-full">
            <button
              type="button"
              onClick={() => setTransactionType('1')}
              className={`px-5 py-2 text-[10px] uppercase tracking-widest font-sans rounded-full transition-all font-semibold whitespace-nowrap ${
                transactionType === '1'
                  ? 'bg-[#B76E4D] text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Comprar
            </button>
            <button
              type="button"
              onClick={() => setTransactionType('2')}
              className={`px-5 py-2 text-[10px] uppercase tracking-widest font-sans rounded-full transition-all font-semibold whitespace-nowrap ${
                transactionType === '2'
                  ? 'bg-[#B76E4D] text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Rentar
            </button>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px h-6 bg-white/20" />

          {/* Location Search Field */}
          <div className="relative flex-1 w-full flex items-center px-4 py-2">
            <MapPin className="w-4 h-4 text-[#B76E4D] mr-3 shrink-0" />
            <input
              type="text"
              placeholder="¿Qué colonia buscas? (ej. Polanco, Lomas...)"
              value={locationText}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setLocationText(e.target.value);
                if (selectedCoords && e.target.value !== selectedCoords.name) {
                  setSelectedCoords(null);
                }
              }}
              onFocus={(e) => {
                e.stopPropagation();
                setShowSuggestions(true);
              }}
              className="bg-transparent w-full outline-none text-[#FAF7F2] placeholder-white/45 font-sans text-xs md:text-sm"
            />

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 right-0 top-full mt-3 bg-[#2E251E]/95 backdrop-blur-md border border-white/10 shadow-elegant z-50 max-h-60 overflow-y-auto rounded-md"
              >
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSuggestionClick(s)}
                    className="w-full text-left px-4 py-2.5 text-[11px] text-white/80 hover:bg-[#B76E4D] hover:text-white font-sans transition-colors border-b border-white/5 last:border-0"
                  >
                    {s.place_name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px h-6 bg-white/20" />

          {/* Property Type Dropdown */}
          <div className="w-full md:w-52 flex items-center px-4 py-2">
            <Home className="w-4 h-4 text-[#B76E4D] mr-3 shrink-0" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="bg-transparent w-full outline-none text-[#FAF7F2] placeholder-white/45 font-sans text-xs md:text-sm appearance-none cursor-pointer"
            >
              <option value="" className="bg-[#2E251E] text-white">Cualquier tipo</option>
              <option value="casa" className="bg-[#2E251E] text-white">Residencias</option>
              <option value="departamento" className="bg-[#2E251E] text-white">Departamentos</option>
              <option value="penthouse" className="bg-[#2E251E] text-white">Penthouses</option>
              <option value="terreno" className="bg-[#2E251E] text-white">Terrenos</option>
            </select>
          </div>

          {/* Compact Action Button inside Pill */}
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3.5 md:py-3 bg-[#B76E4D] text-white hover:bg-[#FAF7F2] hover:text-[#2E251E] transition-all duration-300 rounded-full font-sans uppercase text-[10px] tracking-[0.25em] font-semibold flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            Buscar
          </button>
        </form>

      </div>
    </header>
  );
};

export default HeroSection;
