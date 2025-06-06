import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import brandService from '../services/brandService';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await brandService.getAll();
        console.log('Brand ricevuti:', data); // Log per debug
        setBrands(data);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento dei brand:', err);
        setError('Si è verificato un errore nel caricamento dei brand. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

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

  return (
    <div className="bg-secondary-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] overflow-hidden bg-gradient-to-b from-primary-950 to-secondary-950">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center pt-16 sm:pt-20 md:pt-24 lg:pt-28">
          <div className="container-custom text-center px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-2 sm:mb-3 md:mb-4">
                <span className="text-gradient">Brand</span> Italiani
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-secondary-300 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8">
                Scopri i leggendari marchi italiani che hanno fatto la storia dell'automobile e che continuano a ispirare le nostre creazioni.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="container-custom px-4 sm:px-6 md:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-10 sm:py-12 md:py-16">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 sm:py-12 md:py-16">
              <p className="text-red-500 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors text-xs sm:text-sm md:text-base"
              >
                Riprova
              </button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {brands.map((brand) => (
                <motion.div key={brand._id} variants={itemVariants}>
                  <Link 
                    to={`/brands/${brand._id}`}
                    className="block bg-secondary-900/50 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 h-full"
                  >
                    <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center text-center h-full">
                      {brand.logo && (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-3 sm:mb-4 md:mb-6 flex items-center justify-center">
                          <img 
                            src={brand.logo} 
                            alt={`${brand.nome} logo`} 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-xl sm:text-2xl font-heading font-bold mb-1 sm:mb-2">{brand.nome}</h3>
                      <p className="text-xs sm:text-sm md:text-base text-secondary-400 mb-2 sm:mb-3 md:mb-4">
                        {brand.fondazione && `Fondato nel ${brand.fondazione}`}
                        {brand.fondazione && brand.sede && ` • `}
                        {brand.sede && `${brand.sede}`}
                      </p>
                      <div className="mt-auto pt-2 sm:pt-3 md:pt-4">
                        <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 border border-primary text-primary rounded-full text-xs sm:text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                          Scopri di più
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Brands;