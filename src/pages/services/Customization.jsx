import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Customization = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
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

  return (
    <div className="min-h-screen bg-secondary-950">
      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />
          <img
            src="https://www.touringsuperleggera.eu/wp-content/uploads/2024/08/3-4-Rear-scaled-1200x761.jpg"
            alt="Personalizzazione auto d'epoca"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 h-full flex items-center pt-16">
          <div className="container-custom">
            <motion.h1 
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-gradient mb-2 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Servizio di Personalizzazione
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-secondary-200 max-w-xs sm:max-w-md md:max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Trasforma la tua auto d'epoca in un'opera d'arte unica, combinando tradizione e innovazione.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Service Description */}
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-b from-secondary-950 to-secondary-900">
        <div className="container-custom">
          <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-4 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Personalizzazione su Misura
            </motion.h2>
            <motion.p 
              className="text-secondary-200 text-base sm:text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Offriamo soluzioni di personalizzazione che rispettano l'anima della tua auto d'epoca, aggiungendo comfort moderno e prestazioni migliorate senza comprometterne l'autenticità.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Design Personalizzato</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Creiamo soluzioni estetiche e funzionali su misura, rispettando lo stile originale ma aggiungendo il tuo tocco personale.</p>
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
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Upgrade Prestazionali</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Miglioriamo le prestazioni del tuo veicolo con soluzioni moderne che mantengono l'aspetto classico ma offrono un'esperienza di guida superiore.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-6 sm:p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Tecnologia Moderna</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Integriamo discretamente tecnologie moderne come sistemi audio, navigazione e connettività, mantenendo l'estetica originale.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-16 sm:py-20 md:py-24 bg-secondary-900">
        <div className="container-custom">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-10 sm:mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Opzioni di Personalizzazione
          </motion.h2>

          <div className="space-y-12 sm:space-y-14 md:space-y-16">
            <motion.div 
              className="flex flex-col md:flex-row items-center gap-6 sm:gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/9381004/pexels-photo-9381004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Personalizzazione Motore" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">Upgrade del Motore</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Miglioriamo le prestazioni del motore originale o installiamo propulsori moderni che offrono maggiore potenza, affidabilità e efficienza, mantenendo l'aspetto classico del vano motore.
                </p>
                <ul className="mt-4 space-y-2 text-secondary-300 text-base sm:text-lg">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Carburatori ottimizzati
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Sistemi di iniezione moderni
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Conversione a sistemi di alimentazione alternativi
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="w-full md:w-1/2">
                <img 
                  src="https://cdn.mos.cms.futurecdn.net/ZGn7NxsHLGWcE3NUf4LnVc-1600-80.jpg.webp"
                  alt="Sospensioni e Freni" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">Sospensioni e Freni</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Aggiorniamo i sistemi di sospensione e frenata per migliorare comfort, maneggevolezza e sicurezza, mantenendo l'aspetto esteriore fedele all'originale ma con prestazioni moderne.
                </p>
                <ul className="mt-4 space-y-2 text-secondary-300 text-base sm:text-lg">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Sospensioni regolabili
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Impianti frenanti a disco
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Sistemi ABS discretamente integrati
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row items-center gap-6 sm:gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="w-full md:w-1/2">
                <img 
                  src="https://cdn.mos.cms.futurecdn.net/U8Af96s72fdMWp2q3gzBDJ-1600-80.jpg.webp"  
                  alt="Tecnologia e Infotainment" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">Tecnologia e Infotainment</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Integriamo discretamente tecnologie moderne per migliorare il comfort e l'esperienza di guida, mantenendo l'estetica classica degli interni.
                </p>
                <ul className="mt-4 space-y-2 text-secondary-300 text-base sm:text-lg">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Sistemi audio nascosti
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Navigazione e connettività Bluetooth
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Climatizzazione moderna
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-secondary-900 to-secondary-950">
        <div className="container-custom text-center px-4 sm:px-6">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Trasforma la Tua Auto d'Epoca
          </motion.h2>
          <motion.p 
            className="text-secondary-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contattaci per discutere del tuo progetto di personalizzazione. Il nostro team di esperti ti aiuterà a creare un'auto d'epoca unica che rifletta il tuo stile personale mantenendo l'autenticità del veicolo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/contact" className="btn-primary px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">
              Contattaci
            </Link>
            <Link to="/custom-requests" className="btn-outline px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">
              Richiedi Preventivo
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Customization;