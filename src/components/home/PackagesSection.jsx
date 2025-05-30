import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { packageService } from '../../services';

const PackagesSection = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPackages = async () => {
      try {
        setLoading(true);
        const data = await packageService.getAll();
        // Prendiamo solo i primi 3 pacchetti per la home
        setPackages(data.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento dei pacchetti:', err);
        setError('Si è verificato un errore nel caricamento dei pacchetti. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    getPackages();
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="packages-section" className="py-16 md:py-20 bg-secondary-950">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-500 font-medium tracking-wider uppercase block mb-1">
            I Nostri Pacchetti
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Soluzioni su Misura per Te
          </h2>
          <p className="text-secondary-400 max-w-2xl mx-auto">
            Scopri i nostri pacchetti esclusivi per la manutenzione e il miglioramento della tua auto d'epoca. 
            Ogni pacchetto è stato progettato per offrire il massimo valore e qualità.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg._id}
                className="bg-secondary-900 rounded-lg overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-300 flex flex-col h-full"
                variants={itemVariants}
              >
                {pkg.immagine && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={pkg.immagine} 
                      alt={pkg.nome} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5 flex-grow">
                  <h3 className="text-xl font-heading font-bold mb-2">{pkg.nome}</h3>
                  <div className="text-primary-500 text-2xl font-bold mb-3">
                    €{pkg.prezzo ? pkg.prezzo.toFixed(2) : '0.00'}
                  </div>
                  <p className="text-secondary-400 mb-4 line-clamp-3">{pkg.descrizione}</p>
                  <ul className="space-y-1 mb-4">
                    {pkg.caratteristiche && pkg.caratteristiche.slice(0, 3).map((feature, index) => (
                      <li key={`${pkg._id}-feature-${index}`} className="flex items-start">
                        <span className="text-primary-500 mr-2">✓</span>
                        <span className="text-secondary-300">{feature}</span>
                      </li>
                    ))}
                    {pkg.caratteristiche && pkg.caratteristiche.length > 3 && (
                      <li key={`${pkg._id}-more-features`} className="text-secondary-400 italic">E altro ancora...</li>
                    )}
                  </ul>
                </div>
                <div className="p-5 pt-0 mt-auto">
                  <Link to={`/packages/${pkg._id}`}>
                    <Button variant="primary" className="w-full">
                      Scopri di più
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/packages">
            <Button variant="outline" size="lg">
              Vedi tutti i pacchetti
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesSection;