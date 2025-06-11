import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import restomodService from '../../services/restomodService';

const FeaturedRestomods = () => {
  const [restomods, setRestomods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestomods = async () => {
      try {
        setLoading(true);
        const data = await restomodService.getFeatured();
        console.log('Restomods ricevuti:', data); // Log per debug
        setRestomods(data);
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

  // Varianti per le animazioni
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <section id="featured-section" className="section-padding bg-secondary-950 py-24"> 
      <div className="container-custom">
        {/* Intestazione della sezione */}
        <div className="text-center mb-16"> 
          <motion.span
            className="text-primary font-light tracking-[0.4em] uppercase text-xs block mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Collezione
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-light mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary">Restomods</span> in Evidenza
          </motion.h2>
          <motion.p 
            className="text-secondary-400 max-w-2xl mx-auto font-light text-sm leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Scopri le nostre creazioni più esclusive, dove l'heritage italiano incontra la tecnologia moderna per dare vita a capolavori senza tempo.
          </motion.p>
        </div>

        {/* Contenuto principale */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-1 border-b-1 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4 font-light">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="secondary"
            >
              Riprova
            </Button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {restomods.slice(0, 6).map((restomod) => (
              <motion.div key={restomod._id} variants={itemVariants}>
                <Card
                  image={restomod.immagini && restomod.immagini.length > 0 ? restomod.immagini[0].url : '/placeholder-image.jpg'}
                  title={restomod.nome}
                  subtitle={`${restomod.costruttore?.nome || 'Brand sconosciuto'} | ${restomod.anno || 'Anno sconosciuto'}`}
                  description={restomod.descrizione ? restomod.descrizione.substring(0, 100) + '...' : ''}
                  price={restomod.prezzo}
                  badge={restomod.stato === 'sold' ? 'venduta' : restomod.stato === 'reserved' ? 'Riservato' : null}
                  link={`/restomods/${restomod._id}`}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pulsante per vedere tutti i restomods */}
        {!loading && !error && restomods.length > 0 && (
          <motion.div 
            className="text-center mt-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button to="/restomods" variant="secondary">
              Vedi tutti i Restomods
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRestomods;