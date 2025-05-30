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
                <span className="text-gradient">Brand</span> Italiani
              </h1>
              <p className="text-xl text-secondary-300 max-w-3xl mx-auto mb-8">
                Scopri i leggendari marchi italiani che hanno fatto la storia dell'automobile e che continuano a ispirare le nostre creazioni.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                Riprova
              </button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                    <div className="p-8 flex flex-col items-center text-center h-full">
                      {brand.logo && (
                        <div className="w-32 h-32 mb-6 flex items-center justify-center">
                          <img 
                            src={brand.logo} 
                            alt={`${brand.nome} logo`} 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-2xl font-heading font-bold mb-2">{brand.nome}</h3>
                      <p className="text-secondary-400 mb-4">
                        {brand.fondazione && `Fondato nel ${brand.fondazione}`}
                        {brand.fondazione && brand.sede && ` • `}
                        {brand.sede && `${brand.sede}`}
                      </p>
                      <div className="mt-auto pt-4">
                        <span className="inline-block px-4 py-2 border border-primary text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors">
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