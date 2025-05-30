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

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    const index = name === 'minPrice' ? 0 : 1;
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
    <div className="bg-secondary-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden bg-gradient-to-b from-primary-950 to-secondary-950">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4">
                <span className="text-gradient">Restomods</span> Collection
              </h1>
              <p className="text-xl text-secondary-300 max-w-3xl mx-auto mb-8">
                Esplora la nostra collezione di restomods italiani, dove l'eleganza del design classico incontra la tecnologia moderna.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filtri e Risultati */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="primary"
              >
                Riprova
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar con filtri */}
              <div className="lg:col-span-1">
                <motion.div 
                  className="bg-secondary-900/50 p-6 rounded-lg sticky top-24"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-heading font-bold mb-6">Filtri</h2>
                  
                  {/* Ricerca */}
                  <div className="mb-6">
                    <label htmlFor="search" className="block text-sm font-medium text-secondary-400 mb-2">Ricerca</label>
                    <input
                      type="text"
                      id="search"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                      placeholder="Cerca per nome o marca..."
                      className="w-full bg-secondary-800 border border-secondary-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  {/* Filtro per Brand */}
                  <div className="mb-6">
                    <label htmlFor="brand" className="block text-sm font-medium text-secondary-400 mb-2">Marca</label>
                    <select
                      id="brand"
                      name="brand"
                      value={filters.brand}
                      onChange={handleFilterChange}
                      className="w-full bg-secondary-800 border border-secondary-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">Tutte le marche</option>
                      {brands.map((brand, index) => (
                        <option key={index} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Filtro per Stato */}
                  <div className="mb-6">
                    <label htmlFor="status" className="block text-sm font-medium text-secondary-400 mb-2">Stato</label>
                    <select
                      id="status"
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      className="w-full bg-secondary-800 border border-secondary-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">Tutti gli stati</option>
                      <option value="available">Disponibile</option>
                      <option value="reserved">Riservato</option>
                      <option value="sold">Venduto</option>
                    </select>
                  </div>
                  
                  {/* Filtro per Prezzo */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-secondary-400 mb-2">Prezzo</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="minPrice" className="block text-xs text-secondary-500 mb-1">Min</label>
                        <input
                          type="number"
                          id="minPrice"
                          name="minPrice"
                          value={filters.priceRange[0]}
                          onChange={handlePriceRangeChange}
                          min="0"
                          max={filters.priceRange[1]}
                          className="w-full bg-secondary-800 border border-secondary-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="maxPrice" className="block text-xs text-secondary-500 mb-1">Max</label>
                        <input
                          type="number"
                          id="maxPrice"
                          name="maxPrice"
                          value={filters.priceRange[1]}
                          onChange={handlePriceRangeChange}
                          min={filters.priceRange[0]}
                          max={maxPrice}
                          className="w-full bg-secondary-800 border border-secondary-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-secondary-400">
                      <span>Range: {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}</span>
                    </div>
                  </div>
                  
                  {/* Pulsante Reset */}
                  <Button 
                    onClick={resetFilters} 
                    variant="outline"
                    className="w-full"
                  >
                    Resetta Filtri
                  </Button>
                </motion.div>
              </div>
              
              {/* Griglia Risultati */}
              <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-heading font-bold">
                    {filteredRestomods.length} {filteredRestomods.length === 1 ? 'Risultato' : 'Risultati'}
                  </h2>
                </div>
                
                {filteredRestomods.length === 0 ? (
                  <div className="text-center py-16 bg-secondary-900/30 rounded-lg">
                    <p className="text-secondary-400 mb-4">Nessun restomod corrisponde ai filtri selezionati.</p>
                    <Button onClick={resetFilters} variant="primary">Resetta Filtri</Button>
                  </div>
                ) : (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredRestomods.map((restomod) => (
                      <motion.div key={restomod._id} variants={itemVariants}>
                        <Card
                          image={restomod.immagini && restomod.immagini.length > 0 ? restomod.immagini[0].url : '/placeholder-image.jpg'}
                          title={restomod.nome}
                          subtitle={`${restomod.costruttore.nome} | ${restomod.anno}`}
                          description={restomod.descrizione ? restomod.descrizione.substring(0, 100) + '...' : ''}
                          price={restomod.prezzo}
                          badge={restomod.stato === 'sold' ? 'Venduto' : restomod.stato === 'reserved' ? 'Riservato' : null}
                          link={`/restomods/${restomod._id}`}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Restomods;