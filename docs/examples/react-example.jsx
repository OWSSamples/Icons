import React, { useState, useEffect } from 'react';

/**
 * Componente de icono Origon para React
 * Proporciona una interfaz simple para mostrar iconos desde el CDN
 */
const OrigonIcon = ({ 
  name, 
  size = 24, 
  style = 'regular', 
  className = '', 
  alt,
  ...props 
}) => {
  const [iconUrl, setIconUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateUrl = () => {
      try {
        const baseUrl = 'https://cdn.origonlabs.opendex.dev';
        const encodedName = encodeURIComponent(name);
        const fileName = `ic_origon_${name.toLowerCase().replace(/\s+/g, '_')}_${size}_${style}.svg`;
        const url = `${baseUrl}/icons/${encodedName}/SVG/${fileName}`;
        
        setIconUrl(url);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (name) {
      generateUrl();
    }
  }, [name, size, style]);

  if (loading) {
    return <div className={`origon-icon-loading ${className}`} style={{ width: size, height: size }} />;
  }

  if (error) {
    return <div className={`origon-icon-error ${className}`} style={{ width: size, height: size }}>❌</div>;
  }

  return (
    <img
      src={iconUrl}
      alt={alt || name}
      width={size}
      height={size}
      className={`origon-icon ${className}`}
      {...props}
    />
  );
};

/**
 * Hook personalizado para búsqueda de iconos
 */
export const useOrigonSearch = () => {
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSearch = async () => {
      try {
        // Cargar la API de búsqueda
        const script = document.createElement('script');
        script.src = 'https://cdn.origonlabs.opendex.dev/icon-search.js';
        script.onload = () => {
          setSearch(new window.OrigonIconSearch());
          setLoading(false);
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error cargando API de búsqueda:', error);
        setLoading(false);
      }
    };

    loadSearch();
  }, []);

  return { search, loading };
};

/**
 * Componente de búsqueda de iconos
 */
export const IconSearch = ({ onSelect, placeholder = "Buscar iconos..." }) => {
  const { search, loading } = useOrigonSearch();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (searchQuery) => {
    if (!search || !searchQuery.trim()) {
      setResults([]);
      return;
    }

    setSearching(true);
    try {
      const searchResults = await search.search(searchQuery, { limit: 20 });
      setResults(searchResults);
    } catch (error) {
      console.error('Error en búsqueda:', error);
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce la búsqueda
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleIconSelect = (icon) => {
    if (onSelect) {
      onSelect(icon);
    }
    setQuery('');
    setResults([]);
  };

  if (loading) {
    return <div>Cargando búsqueda de iconos...</div>;
  }

  return (
    <div className="origon-icon-search">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="origon-search-input"
      />
      
      {searching && <div>Buscando...</div>}
      
      {results.length > 0 && (
        <div className="origon-search-results">
          {results.map((icon, index) => (
            <div
              key={index}
              className="origon-search-result"
              onClick={() => handleIconSelect(icon)}
            >
              <OrigonIcon name={icon.name} size={20} style="regular" />
              <span>{icon.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Componente de galería de iconos
 */
export const IconGallery = ({ category, limit = 50 }) => {
  const { search, loading } = useOrigonSearch();
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const loadIcons = async () => {
      if (!search) return;

      try {
        let results;
        if (category) {
          results = await search.getByCategory(category);
        } else {
          // Cargar algunos iconos populares
          results = await search.search('', { limit });
        }
        setIcons(results);
      } catch (error) {
        console.error('Error cargando iconos:', error);
      }
    };

    loadIcons();
  }, [search, category, limit]);

  if (loading) {
    return <div>Cargando galería...</div>;
  }

  return (
    <div className="origon-icon-gallery">
      {icons.map((icon, index) => (
        <div key={index} className="origon-gallery-item">
          <OrigonIcon name={icon.name} size={32} style="regular" />
          <span className="origon-icon-name">{icon.name}</span>
        </div>
      ))}
    </div>
  );
};

/**
 * Componente de selector de iconos con preview
 */
export const IconPicker = ({ value, onChange, size = 24, style = 'regular' }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="origon-icon-picker">
      <div 
        className="origon-icon-preview"
        onClick={() => setShowPicker(!showPicker)}
      >
        {value ? (
          <OrigonIcon name={value} size={size} style={style} />
        ) : (
          <div className="origon-icon-placeholder">Seleccionar icono</div>
        )}
      </div>
      
      {showPicker && (
        <div className="origon-picker-modal">
          <IconSearch onSelect={(icon) => {
            onChange(icon.name);
            setShowPicker(false);
          }} />
        </div>
      )}
    </div>
  );
};

export default OrigonIcon;
