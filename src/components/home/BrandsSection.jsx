import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import brandService from '../../services/brandService';

const BrandsSection = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBrands = async () => {
      try {
        setLoading(true);
        const data = await brandService.getAll();
        console.log('Brands ricevuti:', data); // Log per debug
        setBrands(data);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento dei marchi:', err);
        setError('Si è verificato un errore nel caricamento dei marchi. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    getBrands();
  }, []);

  // Varianti per le animazioni
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-secondary-900">
      <div className="container-custom px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 sm:mb-5 md:mb-6 tracking-wide sm:tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            I Migliori Costruttori Italiani
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base text-secondary-300 max-w-full sm:max-w-xl md:max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Collaboriamo con i più prestigiosi marchi automobilistici italiani per creare restomods che rispettano l'eredità di ogni costruttore.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40 sm:h-52 md:h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-sm sm:text-base">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-10 sm:mb-12 md:mb-16">
              {brands.slice(0, 6).map((brand) => (
                <motion.div 
                  key={brand._id}
                  className="bg-secondary-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/brands/${brand._id}`} className="block h-full flex flex-col group">
                    <div className="h-36 sm:h-40 md:h-48 overflow-hidden flex items-center justify-center bg-secondary-900/50 p-3 sm:p-4 md:p-6 transition-all duration-300 rounded-t-lg">
                      <div className="p-2 sm:p-3 flex items-center justify-center w-full h-full">
                        <img 
                          src={brand.logo} 
                          alt={brand.nome} 
                          className="max-w-[80%] sm:max-w-[85%] max-h-[80%] sm:max-h-[85%] object-contain w-auto h-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
                      <h3 className="text-lg sm:text-xl text-white mb-1 sm:mb-2 line-clamp-1">{brand.nome}</h3>
                      <p className="text-xs sm:text-sm text-secondary-400 mb-3 sm:mb-4 line-clamp-2 flex-grow">{brand.descrizione}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-[10px] sm:text-xs text-secondary-500">{brand.annoFondazione}</span>
                        <span className="text-primary text-xs sm:text-sm">Scopri di più</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                to="/brands"
                variant="outline-primary"
                size="md"
                className="w-full sm:w-auto"
              >
                Vedi tutti i costruttori
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BrandsSection;