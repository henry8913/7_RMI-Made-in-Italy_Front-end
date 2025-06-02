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
    <section id="brands-section" className="section-padding bg-gradient-to-b from-primary-950 to-secondary-950">
      <div className="container-custom">
        {/* Intestazione della sezione */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Marchi <span className="text-gradient">Iconici</span> Italiani
          </motion.h2>
          <motion.p 
            className="text-secondary-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Esplora i leggendari marchi italiani che hanno fatto la storia dell'automobilismo mondiale e che continuano a ispirare le nostre creazioni.
          </motion.p>
        </div>

        {/* Contenuto principale */}
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
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {brands.map((brand) => (
              <motion.div 
                key={brand._id} 
                variants={itemVariants}
                className="group"
              >
                <Link 
                  to={`/brands/${brand._id}`} 
                  className="block p-6 bg-secondary-800/50 rounded-lg luxury-card hover:shadow-accent transition-all duration-300 text-center h-full flex flex-col items-center justify-center"
                >
                  <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src={brand.logo} 
                      alt={`${brand.nome} logo`} 
                      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-heading font-medium text-white group-hover:text-primary-400 transition-colors duration-300">
                    {brand.nome}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pulsante per vedere tutti i marchi */}
        {!loading && !error && brands.length > 0 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              to="/brands" 
              variant="outline" 
              size="lg"
              className="btn-hover-effect"
            >
              Scopri tutti i Marchi
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BrandsSection;