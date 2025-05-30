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
      <div className="relative h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />
          <img
            src="https://www.touringsuperleggera.eu/wp-content/uploads/2024/08/3-4-Rear-scaled-1200x761.jpg"
            alt="Personalizzazione auto"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 h-full flex items-center">
          <div className="container-custom">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-heading text-gradient mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Servizio di Personalizzazione
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-secondary-200 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Trasforma la tua auto in un'opera d'arte unica con le nostre soluzioni di personalizzazione su misura.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Service Description */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-secondary-950 to-secondary-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-heading text-gradient mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              La Tua Visione, La Nostra Maestria
            </motion.h2>
            <motion.p 
              className="text-secondary-200 text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Il nostro servizio di personalizzazione ti permette di creare un'auto che riflette la tua personalità e i tuoi gusti, mantenendo l'essenza e il fascino del design italiano classico ma con prestazioni e comfort moderni.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="luxury-card p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading text-white mb-4">Design Personalizzato</h3>
              <p className="text-secondary-300">Collaboriamo con te per creare un design unico che rispecchi la tua visione, dai colori esterni alle finiture degli interni.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading text-white mb-4">Upgrade Prestazionali</h3>
              <p className="text-secondary-300">Miglioriamo le prestazioni del tuo veicolo con motori moderni, sospensioni avanzate e sistemi frenanti di ultima generazione.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading text-white mb-4">Tecnologia Moderna</h3>
              <p className="text-secondary-300">Integriamo tecnologie moderne come sistemi di infotainment, navigazione, climatizzazione e assistenza alla guida, mantenendo un'estetica classica.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-24 bg-secondary-900">
        <div className="container-custom">
          <motion.h2 
            className="text-4xl md:text-5xl font-heading text-gradient mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Opzioni di Personalizzazione
          </motion.h2>

          <div className="space-y-16">
            <motion.div 
              className="flex flex-col md:flex-row items-center gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/9381004/pexels-photo-9381004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Upgrade Motore" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Upgrade del Motore</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Sostituiamo o modifichiamo il motore originale con versioni più potenti e affidabili, mantenendo l'equilibrio tra prestazioni moderne e carattere vintage. Offriamo opzioni che vanno dai motori a combustione ottimizzati fino alle soluzioni ibride o completamente elettriche.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row-reverse items-center gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/9845406/pexels-photo-9845406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Interni Personalizzati" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Interni Personalizzati</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Riprogettiamo completamente gli interni con materiali di lusso come pelle pregiata, legno, alluminio o fibra di carbonio. Integriamo sedili ergonomici, sistemi audio premium e illuminazione ambientale personalizzabile, tutto mantenendo l'estetica classica.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row items-center gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="md:w-1/2">
                <img 
                  src="https://cdn.mos.cms.futurecdn.net/ZGn7NxsHLGWcE3NUf4LnVc-1600-80.jpg.webp" 
                  alt="Sospensioni e Freni" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Sospensioni e Freni</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Miglioriamo la maneggevolezza e la sicurezza con sospensioni regolabili moderne e sistemi frenanti ad alte prestazioni. Questi upgrade garantiscono un'esperienza di guida più sicura e confortevole senza compromettere l'aspetto classico del veicolo.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row-reverse items-center gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="md:w-1/2">
                <img 
                  src="https://cdn.mos.cms.futurecdn.net/U8Af96s72fdMWp2q3gzBDJ-1600-80.jpg.webp" 
                  alt="Tecnologia e Infotainment" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Tecnologia e Infotainment</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Integriamo discretamente tecnologie moderne come touchscreen nascosti, sistemi di navigazione, connettività Bluetooth, telecamere di retromarcia e sistemi di assistenza alla guida, tutto mantenendo l'aspetto vintage della plancia.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-secondary-900 to-secondary-950">
        <div className="container-custom text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-heading text-gradient mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Pronto a Creare la Tua Auto dei Sogni?
          </motion.h2>
          <motion.p 
            className="text-secondary-200 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contattaci per una consulenza personalizzata e scopri come possiamo trasformare la tua auto classica in un capolavoro unico che combina il fascino del passato con le prestazioni e il comfort moderni.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/contact" className="btn-primary px-8 py-3 text-lg">
              Contattaci
            </Link>
            <Link to="/custom-requests" className="btn-outline px-8 py-3 text-lg">
              Richiedi Preventivo
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Customization;