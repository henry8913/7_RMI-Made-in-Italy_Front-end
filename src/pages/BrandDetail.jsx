import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import brandService from '../services/brandService';

const BrandDetail = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        setLoading(true);
        const data = await brandService.getById(id);
        console.log('Brand ricevuto:', data); // Log per debug
        setBrand(data);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento del brand:', err);
        setError('Si è verificato un errore nel caricamento del brand. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [id]);

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

  if (loading) {
    return (
      <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 py-8 sm:py-12 md:py-16 lg:py-20 bg-secondary-950 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 py-8 sm:py-12 md:py-16 lg:py-20 bg-secondary-950 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
        <p className="text-red-500 mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg md:text-xl text-center">{error}</p>
        <Button to="/brands" variant="primary" size="sm" className="sm:text-base md:text-lg">
          Torna ai Brand
        </Button>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 py-8 sm:py-12 md:py-16 lg:py-20 bg-secondary-950 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-4 sm:mb-5 md:mb-6 text-center">Brand non trovato</h2>
        <Button to="/brands" variant="primary" size="sm" className="sm:text-base md:text-lg">
          Torna ai Brand
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden bg-gradient-to-b from-primary-950 to-secondary-950">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center pt-16 sm:pt-20 md:pt-24 lg:pt-28">
          <div className="container-custom text-center px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              {brand.logo && (
                <img 
                  src={brand.logo} 
                  alt={`${brand.nome} logo`} 
                  className="h-16 sm:h-20 md:h-24 lg:h-32 mb-3 sm:mb-4 md:mb-6 object-contain"
                />
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-2 sm:mb-3 md:mb-4">
                <span className="text-gradient">{brand.nome}</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-secondary-300 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8">
                {brand.fondazione && `Fondato nel ${brand.fondazione}`}
                {brand.fondazione && brand.sede && ` • `}
                {brand.sede && `${brand.sede}`}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Info Section */}
      {/* Brand History */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-secondary-900/30">
        <div className="container-custom px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 items-start">
            {/* Colonna Sinistra - Descrizione */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-2xl md:text-3xl font-heading font-bold mb-3 sm:mb-4 md:mb-6">Storia</h2>
                <div className="prose prose-sm sm:prose md:prose-lg prose-invert max-w-none">
                  {brand.descrizione ? (
                    <div dangerouslySetInnerHTML={{ __html: brand.descrizione }} />
                  ) : (
                    <p className="text-sm sm:text-base md:text-lg">Nessuna descrizione disponibile per questo brand.</p>
                  )}
                </div>
              </motion.div>
            </div>
            
            {/* Colonna Destra - Info */}
            <div className="order-1 lg:order-2 mb-6 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-secondary-900/50 p-4 sm:p-5 md:p-6 rounded-lg sticky top-20"
              >
                <h3 className="text-lg sm:text-xl font-heading font-bold mb-3 sm:mb-4">Informazioni</h3>
                <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                  {brand.fondazione && (
                    <li className="flex items-start">
                      <span className="text-primary mr-2 sm:mr-3">•</span>
                      <div>
                        <span className="block text-xs sm:text-sm text-secondary-400">Anno di fondazione</span>
                        <span className="font-medium text-sm sm:text-base">{brand.fondazione}</span>
                      </div>
                    </li>
                  )}
                  {brand.sede && (
                    <li className="flex items-start">
                      <span className="text-primary mr-2 sm:mr-3">•</span>
                      <div>
                        <span className="block text-xs sm:text-sm text-secondary-400">Sede</span>
                        <span className="font-medium text-sm sm:text-base">{brand.sede}</span>
                      </div>
                    </li>
                  )}
                  {brand.sito && (
                    <li className="flex items-start">
                      <span className="text-primary mr-2 sm:mr-3">•</span>
                      <div>
                        <span className="block text-xs sm:text-sm text-secondary-400">Sito Web</span>
                        <a 
                          href={brand.sito} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-sm sm:text-base text-primary hover:text-primary-400 transition-colors"
                        >
                          Visita il sito
                        </a>
                      </div>
                    </li>
                  )}
                </ul>
                <div className="mt-4 sm:mt-5 md:mt-6">
                  <Button to="/brands" variant="outline" size="sm" className="w-full sm:text-base">
                    Torna ai Brand
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Restomods Section */}
      {brand.modelli && brand.modelli.length > 0 && (
        <section className="py-10 sm:py-12 md:py-16 lg:py-20 pt-0 sm:pt-0 md:pt-0 lg:pt-0">
          <div className="container-custom px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-2xl md:text-3xl font-heading font-bold mb-6 sm:mb-8 md:mb-10">Restomods di {brand.nome}</h2>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {brand.modelli.map((restomod) => (
                  <motion.div key={restomod._id} variants={itemVariants}>
                    <Card
                      image={restomod.immagini && restomod.immagini.length > 0 ? restomod.immagini[0].url : '/placeholder-image.jpg'}
                      title={restomod.nome}
                      subtitle={`${brand.nome} | ${restomod.anno}`}
                      description={restomod.descrizione ? restomod.descrizione.substring(0, 100) + '...' : ''}
                      price={restomod.prezzo}
                      badge={restomod.stato === 'sold' ? 'venduta' : restomod.stato === 'reserved' ? 'Riservato' : null}
                      link={`/restomods/${restomod._id}`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BrandDetail;