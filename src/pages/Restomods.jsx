import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import restomodService from '../services/restomodService';

const Restomods = () => {
  const [restomods, setRestomods] = useState([]);
  const [filteredRestomods, setFilteredRestomods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    brand: 'all',
    status: 'all',
    priceRange: [0, 1000000]
  });
  const [brands, setBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000000);

  useEffect(() => {
    const getRestomods = async () => {
      try {
        setLoading(true);
        const data = await restomodService.getAll();
        console.log('Restomods ricevuti:', data); // Log per debug
        setRestomods(data);
        setFilteredRestomods(data);
        
        // Estrai i brand unici
        const uniqueBrands = [...new Set(data.map(item => item.costruttore.nome))];
        setBrands(uniqueBrands);
        
        // Trova il prezzo massimo
        const highestPrice = Math.max(...data.map(item => item.prezzo), 1000000);
        setMaxPrice(highestPrice);
        setFilters(prev => ({ ...prev, priceRange: [0, highestPrice] }));
        
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento dei restomods:', err);
        setError('Si è verificato un errore nel caricamento dei restomods. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    getRestomods();
  }, []);

  useEffect(() => {
    // Filtra i restomods in base ai filtri selezionati
    const applyFilters = () => {
      let result = [...restomods];
      
      // Filtro per ricerca testuale
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(item => 
          item.nome.toLowerCase().includes(searchLower) || 
          item.costruttore.nome.toLowerCase().includes(searchLower) ||
          (item.descrizione && item.descrizione.toLowerCase().includes(searchLower))
        );
      }
      
      // Filtro per brand
      if (filters.brand !== 'all') {
        result = result.filter(item => item.costruttore.nome === filters.brand);
      }
      
      // Filtro per stato
      if (filters.status !== 'all') {
        result = result.filter(item => item.stato === filters.status);
      }
      
      // Filtro per prezzo
      result = result.filter(item => 
        item.prezzo >= filters.priceRange[0] && item.prezzo <= filters.priceRange[1]
      );
      
      setFilteredRestomods(result);
    };
    
    applyFilters();
  }, [filters, restomods]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = Number(value);
    setFilters(prev => ({
      ...prev,
      priceRange: newRange
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      brand: 'all',
      status: 'all',
      priceRange: [0, maxPrice]
    });
  };

  // Varianti per le animazioni
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Formatta il prezzo in euro
  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-secondary-950 min-h-screen pt-16 sm:pt-18 md:pt-20">
      {/* Hero Section */}
      <section className="section-padding py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="container-custom px-4 sm:px-6 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6"><span className="text-gradient">Restomods</span> Collection</h1>
            <p className="text-secondary-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8">Scopri la nostra collezione di auto classiche restaurate con tecnologia moderna. Ogni restomod è un pezzo unico che combina il fascino del design vintage con prestazioni all'avanguardia.</p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="section-padding pt-0">
        <div className="container-custom px-4 sm:px-6 md:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-10 sm:py-16 md:py-20">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 sm:py-16 md:py-20">
              <p className="text-red-500 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">({error})</p>
              <Button onClick={fetchRestomods} variant="primary" className="text-xs sm:text-sm md:text-base py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5">Riprova</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {/* Mobile Filters - Accordion */}
              <div className="lg:hidden w-full mb-4 sm:mb-6">
                <details className="bg-secondary-900/80 rounded-md sm:rounded-lg overflow-hidden">
                  <summary className="p-3 sm:p-4 flex justify-between items-center cursor-pointer">
                    <h2 className="text-base sm:text-lg font-bold text-white">Filtri</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-3 sm:p-4 pt-0 sm:pt-0 space-y-3 sm:space-y-4 border-t border-secondary-800">
                    {/* Search */}
                    <div>
                      <label htmlFor="search-mobile" className="block text-xs sm:text-sm font-medium text-secondary-300 mb-1 sm:mb-2">Cerca</label>
                      <input
                        type="text"
                        id="search-mobile"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Nome o caratteristiche..."
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-secondary-800 border border-secondary-700 rounded sm:rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-xs sm:text-sm text-white"
                      />
                    </div>
                    
                    {/* Filters in 2-column grid on small screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Brand Filter */}
                      <div>
                        <label htmlFor="brand-mobile" className="block text-xs sm:text-sm font-medium text-secondary-300 mb-1 sm:mb-2">Marca</label>
                        <select
                          id="brand-mobile"
                          name="brand"
                          value={filters.brand}
                          onChange={handleFilterChange}
                          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-secondary-800 border border-secondary-700 rounded sm:rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-xs sm:text-sm text-white"
                        >
                          <option value="all">Tutte le marche</option>
                          {brands.map((brand, index) => (
                            <option key={index} value={brand}>{brand}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Status Filter */}
                      <div>
                        <label htmlFor="status-mobile" className="block text-xs sm:text-sm font-medium text-secondary-300 mb-1 sm:mb-2">Stato</label>
                        <select
                          id="status-mobile"
                          name="status"
                          value={filters.status}
                          onChange={handleFilterChange}
                          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-secondary-800 border border-secondary-700 rounded sm:rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-xs sm:text-sm text-white"
                        >
                          <option value="all">Tutti gli stati</option>
                          <option value="available">Disponibile</option>
                          <option value="reserved">Riservato</option>
                          <option value="sold">Venduto</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Price Range */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-secondary-300 mb-1 sm:mb-2">Prezzo (€)</label>
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm text-secondary-400">{formatPrice(filters.priceRange[0])}</span>
                        <span className="text-xs sm:text-sm text-secondary-400">{formatPrice(filters.priceRange[1])}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="10000"
                        value={filters.priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                        className="w-full h-1.5 sm:h-2 bg-secondary-700 rounded-lg appearance-none cursor-pointer mb-1.5 sm:mb-2"
                      />
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="10000"
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                        className="w-full h-1.5 sm:h-2 bg-secondary-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    {/* Reset Filters */}
                    <Button onClick={resetFilters} variant="outline" className="w-full text-xs sm:text-sm py-1.5 sm:py-2">
                      Resetta Filtri
                    </Button>
                  </div>
                </details>
              </div>
              
              {/* Desktop Filters */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="bg-secondary-900/80 p-4 sm:p-5 md:p-6 rounded-md sm:rounded-lg sticky top-24">
                  <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 text-white">Filtri</h2>
                  <div className="space-y-4 sm:space-y-5">
                    {/* Search */}
                    <div>
                      <label htmlFor="search-desktop" className="block text-sm font-medium text-secondary-300 mb-1 sm:mb-2">Cerca</label>
                      <input
                        type="text"
                        id="search-desktop"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        placeholder="Nome o caratteristiche..."
                        className="w-full px-3 py-2 bg-secondary-800 border border-secondary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-white"
                      />
                    </div>
                    
                    {/* Brand Filter */}
                    <div>
                      <label htmlFor="brand-desktop" className="block text-sm font-medium text-secondary-300 mb-1 sm:mb-2">Marca</label>
                      <select
                        id="brand-desktop"
                        name="brand"
                        value={filters.brand}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 bg-secondary-800 border border-secondary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-white"
                      >
                        <option value="all">Tutte le marche</option>
                        {brands.map((brand, index) => (
                          <option key={index} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Status Filter */}
                    <div>
                      <label htmlFor="status-desktop" className="block text-sm font-medium text-secondary-300 mb-1 sm:mb-2">Stato</label>
                      <select
                        id="status-desktop"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 bg-secondary-800 border border-secondary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-white"
                      >
                        <option value="all">Tutti gli stati</option>
                        <option value="available">Disponibile</option>
                        <option value="reserved">Riservato</option>
                        <option value="sold">Venduto</option>
                      </select>
                    </div>
                    
                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-secondary-300 mb-1 sm:mb-2">Prezzo (€)</label>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-secondary-400">{formatPrice(filters.priceRange[0])}</span>
                        <span className="text-sm text-secondary-400">{formatPrice(filters.priceRange[1])}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="10000"
                        value={filters.priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary-700 rounded-lg appearance-none cursor-pointer mb-2"
                      />
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="10000"
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                        className="w-full h-2 bg-secondary-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    {/* Reset Filters */}
                    <Button onClick={resetFilters} variant="outline" className="w-full text-sm py-2">
                      Resetta Filtri
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 lg:col-span-3">
                
                {/* Results Grid */}
                <div>
                  <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-white">
                      {filteredRestomods.length} {filteredRestomods.length === 1 ? 'Risultato' : 'Risultati'}
                    </h2>
                  </div>
                  
                  {filteredRestomods.length === 0 ? (
                    <div className="bg-secondary-900/80 rounded-md sm:rounded-lg p-5 sm:p-6 md:p-8 text-center">
                      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Nessun restomod trovato</h3>
                      <p className="text-secondary-300 text-sm sm:text-base mb-4 sm:mb-5 md:mb-6">Prova a modificare i filtri per trovare ciò che stai cercando.</p>
                      <Button onClick={resetFilters} variant="primary" className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base">
                        Resetta Filtri
                      </Button>
                    </div>
                  ) : (
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
                    >
                      {filteredRestomods.map((restomod) => (
                        <motion.div key={restomod._id || restomod.id} variants={itemVariants}>
                          <Card
                            image={restomod.immagini && restomod.immagini.length > 0 ? restomod.immagini[0].url : '/images/placeholder.jpg'}
                            title={restomod.nome}
                            subtitle={restomod.costruttore?.nome ? `${restomod.costruttore.nome} | ${restomod.anno}` : 'Marca non specificata'}
                            description={restomod.descrizione ? restomod.descrizione.substring(0, 100) + '...' : ''}
                            price={restomod.prezzo}
                            badge={restomod.stato === 'sold' ? 'Venduto' : restomod.stato === 'reserved' ? 'Riservato' : null}
                            link={`/restomods/${restomod._id || restomod.id}`}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Restomods;