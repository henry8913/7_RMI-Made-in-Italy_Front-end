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
      <div className="section-padding bg-secondary-950 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding bg-secondary-950 min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-500 mb-6 text-xl">{error}</p>
        <Button to="/brands" variant="primary">
          Torna ai Brand
        </Button>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="section-padding bg-secondary-950 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-heading font-bold mb-6">Brand non trovato</h2>
        <Button to="/brands" variant="primary">
          Torna ai Brand
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden bg-gradient-to-b from-primary-950 to-secondary-950">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
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
                  className="h-24 md:h-32 mb-6 object-contain"
                />
              )}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4">
                <span className="text-gradient">{brand.nome}</span>
              </h1>
              <p className="text-xl text-secondary-300 max-w-3xl mx-auto mb-8">
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
      <section className="py-16 md:py-20 bg-secondary-900/30"> {/* Modificato da section-padding a py-16 md:py-20 */}
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"> {/* Ridotto da gap-16 a gap-10 */}
            {/* Colonna Sinistra - Descrizione */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-heading font-bold mb-6">Storia</h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  {brand.descrizione ? (
                    <div dangerouslySetInnerHTML={{ __html: brand.descrizione }} />
                  ) : (
                    <p>Nessuna descrizione disponibile per questo brand.</p>
                  )}
                </div>
              </motion.div>
            </div>
            
            {/* Colonna Destra - Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-secondary-900/50 p-6 rounded-lg"
              >
                <h3 className="text-xl font-heading font-bold mb-4">Informazioni</h3>
                <ul className="space-y-4">
                  {brand.fondazione && (
                    <li className="flex items-start">
                      <span className="text-primary mr-3">•</span>
                      <div>
                        <span className="block text-sm text-secondary-400">Anno di fondazione</span>
                        <span className="font-medium">{brand.fondazione}</span>
                      </div>
                    </li>
                  )}
                  {brand.sede && (
                    <li className="flex items-start">
                      <span className="text-primary mr-3">•</span>
                      <div>
                        <span className="block text-sm text-secondary-400">Sede</span>
                        <span className="font-medium">{brand.sede}</span>
                      </div>
                    </li>
                  )}
                  {brand.sito && (
                    <li className="flex items-start">
                      <span className="text-primary mr-3">•</span>
                      <div>
                        <span className="block text-sm text-secondary-400">Sito Web</span>
                        <a 
                          href={brand.sito} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:text-primary-400 transition-colors"
                        >
                          Visita il sito
                        </a>
                      </div>
                    </li>
                  )}
                </ul>
                <div className="mt-6">
                  <Button to="/brands" variant="outline" className="w-full">
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
        <section className="section-padding pt-0">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-heading font-bold mb-10">Restomods di {brand.nome}</h2>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
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
                      badge={restomod.stato === 'sold' ? 'Venduto' : restomod.stato === 'reserved' ? 'Riservato' : null}
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