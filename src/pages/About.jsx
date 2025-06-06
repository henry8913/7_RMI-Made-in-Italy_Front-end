import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import brandService from '../services/brandService';
import Newsletter from '../components/common/Newsletter';

const About = () => {
  // State per i brand
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch brands
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await brandService.getAll();
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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Varianti per le animazioni dei brand
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
    <div className="min-h-screen bg-secondary-950 sm:pt-20 md:pt-24">
      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-secondary-950/80 z-10" />
          <video
            src="https://borromeodesilva.it/IMG/tutto-bene/tuttobene.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 h-full flex items-center">
          <div className="container-custom px-4 sm:px-6 md:px-8">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-gradient mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Chi Siamo
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-secondary-200 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Scopri la nostra passione per i restomod italiani e la nostra missione di celebrare l'eccellenza automobilistica italiana.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-primary-950 to-secondary-950">
        <div className="container-custom px-4 sm:px-6 md:px-8">
          <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-4 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              La Nostra Missione
            </motion.h2>
            <motion.p 
              className="text-secondary-200 text-base sm:text-lg md:text-xl leading-relaxed px-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Restomod Made in Italy è nato dalla passione per l'eccellenza automobilistica italiana. 
              Il nostro obiettivo è celebrare e preservare il patrimonio automobilistico italiano, 
              unendo la bellezza senza tempo del design classico con le tecnologie moderne.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="luxury-card p-6 sm:p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Qualità</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                Collaboriamo solo con i migliori costruttori italiani, garantendo standard di eccellenza in ogni veicolo presentato.
              </p>
            </motion.div>

            <motion.div 
              className="luxury-card p-6 sm:p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Artigianato</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                Valorizziamo l'artigianato italiano, dove ogni dettaglio è curato con passione e maestria, creando opere d'arte su quattro ruote.
              </p>
            </motion.div>

            <motion.div 
              className="luxury-card p-6 sm:p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Innovazione</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                Uniamo la tradizione con le tecnologie moderne, creando veicoli che rispettano il passato ma guardano al futuro.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-black">
        <div className="container-custom px-4 sm:px-6 md:px-8">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-10 sm:mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Il Nostro Team
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="luxury-card overflow-hidden group"
              variants={fadeInUp}
            >
              <div className="overflow-hidden h-48 sm:h-56 md:h-64">
                <img 
                  src="https://raw.githubusercontent.com/henry8913/0_Welcome/refs/heads/main/IMG/IMG.jpg" 
                  alt="Henry Grecchi" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-heading text-white mb-1 sm:mb-2">Henry Grecchi</h3>
                <p className="text-primary font-medium mb-3 sm:mb-4 md:mb-5 text-sm sm:text-base">Fondatore & CEO</p>
                <p className="text-secondary-300 text-sm sm:text-base">
                  Appassionato di auto d'epoca e innovazione, Henry ha fondato Restomod Made in Italy per celebrare l'eccellenza automobilistica italiana.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="luxury-card overflow-hidden group"
              variants={fadeInUp}
            >
              <div className="overflow-hidden h-48 sm:h-56 md:h-64">
                <img 
                  src="https://hips.hearstapps.com/hmg-prod/images/italian-fashion-blogger-and-designer-chiara-ferragni-poses-news-photo-1745954548.pjpeg?crop=0.668xw:1.00xh;0.234xw,0&resize=640:*" 
                  alt="Chiara Ferraghi" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-heading text-white mb-1 sm:mb-2">Chiara Ferraghi</h3>
                <p className="text-primary font-medium mb-3 sm:mb-4 md:mb-5 text-sm sm:text-base">Direttore Creativo</p>
                <p className="text-secondary-300 text-sm sm:text-base">
                  Con un background in design automobilistico, Chiara porta la sua visione creativa e attenzione ai dettagli in ogni progetto.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="luxury-card overflow-hidden group"
              variants={fadeInUp}
            >
              <div className="overflow-hidden h-48 sm:h-56 md:h-64">
                <img 
                  src="https://i.pinimg.com/736x/4b/f4/72/4bf472c2963a556f62ddc31f2ae778f1.jpg" 
                  alt="Tony Stark" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-heading text-white mb-1 sm:mb-2">Tony Stark</h3>
                <p className="text-primary font-medium mb-3 sm:mb-4 md:mb-5 text-sm sm:text-base">Responsabile Tecnico</p>
                <p className="text-secondary-300 text-sm sm:text-base">
                  Ingegnere meccanico con esperienza nel settore automobilistico, Tony supervisiona gli aspetti tecnici di ogni restomod.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-primary-950 to-secondary-950">
        <div className="container-custom px-4 sm:px-6 md:px-8">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-10 sm:mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            I Nostri Partner
          </motion.h2>

          {loading ? (
            <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10 sm:py-12 md:py-16">
              <p className="text-red-500 mb-3 sm:mb-4 text-sm sm:text-base">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 bg-primary text-white text-sm sm:text-base rounded-md hover:bg-primary-600 transition-colors"
              >
                Riprova
              </button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {brands.slice(0, 6).map((brand) => (
                <motion.div key={brand._id} variants={itemVariants}>
                  <Link 
                    to={`/brands/${brand._id}`}
                    className="block bg-secondary-900/50 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 h-full"
                  >
                    <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center text-center h-full">
                      {brand.logo && (
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4 sm:mb-5 md:mb-6 flex items-center justify-center">
                          <img 
                            src={brand.logo} 
                            alt={`${brand.nome} logo`} 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      <h3 className="text-xl sm:text-2xl font-heading font-bold mb-1 sm:mb-2">{brand.nome}</h3>
                      <p className="text-secondary-400 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                        {brand.fondazione && `Fondato nel ${brand.fondazione}`}
                        {brand.fondazione && brand.sede && ` • `}
                        {brand.sede && `${brand.sede}`}
                      </p>
                      <div className="mt-auto pt-3 sm:pt-4">
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

      {/* Newsletter Section */}
      <section className="py-12 sm:py-14 md:py-16 bg-secondary-800">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <Newsletter />
        </div>
      </section>
    </div>
  );
};

export default About;