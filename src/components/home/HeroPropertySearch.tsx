import { Search, MapPin, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';

// Buscador de propiedades del hero (lógica original de HeroSection, reubicada sin cambios).
const HeroPropertySearch = () => {
  const navigate = useNavigate();
  const { site } = useSiteUser();

  const mapboxToken = (site?.platform_config?.mapbox_token || import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '').trim();

  const [transactionType, setTransactionType] = useState<'1' | '2'>('1'); // 1 = Venta, 2 = Renta
  const [propertyType, setPropertyType] = useState<string>('');
  const [locationText, setLocationText] = useState<string>('');

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; name: string } | null>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!locationText.trim() || !mapboxToken) {
      setSuggestions([]);
      return;
    }

    if (selectedCoords && locationText === selectedCoords.name) {
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            locationText
          )}.json?access_token=${mapboxToken}&limit=5&types=neighborhood,locality,place,address&country=mx,us&proximity=-99.1332,19.4326`
        );
        if (response.ok) {
          const data = await response.json();
          let features = data.features || [];

          const queryLower = locationText.toLowerCase();
          const looksLikeUS = queryLower.includes('usa') ||
                              queryLower.includes('eeuu') ||
                              queryLower.includes('ee.uu') ||
                              queryLower.includes('estados unidos') ||
                              queryLower.includes('united states') ||
                              queryLower.includes('miami') ||
                              queryLower.includes('texas') ||
                              queryLower.includes('dallas') ||
                              queryLower.includes('houston') ||
                              queryLower.includes('austin') ||
                              queryLower.includes('san antonio') ||
                              queryLower.includes('mcallen');

          if (!looksLikeUS) {
            features = [...features].sort((a: any, b: any) => {
              const isAMexico = a.place_name?.toLowerCase().includes('méxico') ||
                                a.place_name?.toLowerCase().includes('mexico') ||
                                a.context?.some((c: any) => c.short_code?.toLowerCase() === 'mx' || c.text?.toLowerCase() === 'méxico' || c.text?.toLowerCase() === 'mexico');

              const isBMexico = b.place_name?.toLowerCase().includes('méxico') ||
                                b.place_name?.toLowerCase().includes('mexico') ||
                                b.context?.some((c: any) => c.short_code?.toLowerCase() === 'mx' || c.text?.toLowerCase() === 'méxico' || c.text?.toLowerCase() === 'mexico');

              if (isAMexico && !isBMexico) return -1;
              if (!isAMexico && isBMexico) return 1;
              return 0;
            });
          }

          setSuggestions(features);
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
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 p-2 md:p-3 rounded-3xl md:rounded-full flex flex-col md:flex-row gap-3 md:gap-2 items-center shadow-elegant"
    >
      <div className="w-full md:w-auto shrink-0 flex p-1 bg-black/20 border border-white/10 rounded-full">
        <button
          type="button"
          onClick={() => setTransactionType('1')}
          className={`flex-1 md:flex-none px-5 py-2 text-[10px] uppercase tracking-widest font-sans rounded-full transition-all font-semibold whitespace-nowrap ${
            transactionType === '1' ? 'bg-[#B76E4D] text-white shadow-sm' : 'text-white/60 hover:text-white'
          }`}
        >
          Comprar
        </button>
        <button
          type="button"
          onClick={() => setTransactionType('2')}
          className={`flex-1 md:flex-none px-5 py-2 text-[10px] uppercase tracking-widest font-sans rounded-full transition-all font-semibold whitespace-nowrap ${
            transactionType === '2' ? 'bg-[#B76E4D] text-white shadow-sm' : 'text-white/60 hover:text-white'
          }`}
        >
          Rentar
        </button>
      </div>

      <div className="hidden md:block w-px h-6 bg-white/20" />

      <div className="relative flex-1 w-full flex items-center px-4 py-2">
        <MapPin className="w-4 h-4 text-[#B76E4D] mr-3 shrink-0" />
        <input
          type="text"
          placeholder="¿Qué colonia buscas? (ej. Polanco, Lomas...)"
          aria-label="Colonia o ciudad"
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
          className="bg-transparent w-full outline-none text-white placeholder-white font-sans text-xs md:text-sm"
        />

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

      <div className="hidden md:block w-px h-6 bg-white/20" />

      <div className="w-full md:w-52 flex items-center px-4 py-2">
        <Home className="w-4 h-4 text-[#B76E4D] mr-3 shrink-0" />
        <select
          value={propertyType}
          aria-label="Tipo de propiedad"
          onChange={(e) => setPropertyType(e.target.value)}
          className="bg-transparent w-full outline-none text-white placeholder-white/45 font-sans text-xs md:text-sm appearance-none cursor-pointer"
        >
          <option value="" className="bg-[#2E251E] text-white">Cualquier tipo</option>
          <option value="casa" className="bg-[#2E251E] text-white">Residencias</option>
          <option value="departamento" className="bg-[#2E251E] text-white">Departamentos</option>
          <option value="penthouse" className="bg-[#2E251E] text-white">Penthouses</option>
          <option value="terreno" className="bg-[#2E251E] text-white">Terrenos</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-6 py-3.5 md:py-3 bg-[#B76E4D] text-white hover:bg-[#FAF7F2] hover:text-[#2E251E] transition-all duration-300 rounded-full font-sans uppercase text-[10px] tracking-[0.25em] font-semibold flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
      >
        <Search className="w-3.5 h-3.5" />
        Buscar
      </button>
    </form>
  );
};

export default HeroPropertySearch;
