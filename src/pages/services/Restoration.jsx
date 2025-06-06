import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Restoration = () => {
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
      <div className="relative h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[60vh] xl:h-[65vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />
          <img
            src="https://www.touringsuperleggera.eu/wp-content/uploads/2024/08/IMG_6875-due-florio-oro-ewip-2-scaled.jpg"
            alt="Restauro auto d'epoca"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 h-full flex items-center pt-16">
          <div className="container-custom">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading text-gradient mb-2 sm:mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Servizio di Restauro
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-secondary-200 max-w-xs sm:max-w-md md:max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Riportiamo in vita la bellezza e l'eleganza delle auto d'epoca italiane con maestria artigianale.
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
              Restauro di Eccellenza
            </motion.h2>
            <motion.p 
              className="text-secondary-200 text-base sm:text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Il nostro servizio di restauro combina tecniche tradizionali e tecnologie moderne per riportare la tua auto d'epoca al suo antico splendore, rispettando la sua storia e autenticità.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Valutazione Iniziale</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Ogni progetto inizia con un'attenta valutazione dello stato attuale del veicolo, documentando ogni dettaglio e pianificando il processo di restauro.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-6 sm:p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Restauro Completo</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Eseguiamo un restauro completo che include carrozzeria, meccanica, interni e finiture, utilizzando materiali originali o di qualità superiore.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-6 sm:p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Certificazione</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Al termine del restauro, forniamo una documentazione completa del lavoro svolto e assistiamo nel processo di certificazione storica del veicolo.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-secondary-900">
        <div className="container-custom">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-10 sm:mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Il Nostro Processo di Restauro
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
                  src="https://cdn.mos.cms.futurecdn.net/XdugJTU4bpVzPSm9r2yhMm-1600-80.jpg.webp" 
                  alt="Valutazione e Smontaggio" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">1. Valutazione e Smontaggio</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Iniziamo con un'attenta valutazione del veicolo, documentando ogni dettaglio e condizione. Procediamo poi con uno smontaggio metodico, catalogando ogni componente per garantire un restauro preciso.
                </p>
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
                  src="https://images.pexels.com/photos/32282277/pexels-photo-32282277/free-photo-of-off-road-adventure-with-muddy-yellow-vehicle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Restauro Carrozzeria" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">2. Restauro della Carrozzeria</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  I nostri artigiani specializzati riparano o ricostruiscono le parti danneggiate della carrozzeria, utilizzando tecniche tradizionali di battilastra. Seguono meticolosi processi di preparazione e verniciatura per ottenere una finitura perfetta.
                </p>
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
                  src="https://images.pexels.com/photos/32279836/pexels-photo-32279836/free-photo-of-detailed-shot-of-alfa-romeo-engine.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Restauro Meccanica" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">3. Restauro Meccanico</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Revisioniamo completamente il motore, la trasmissione e tutti i componenti meccanici, ripristinando o sostituendo le parti usurate con ricambi originali o fabbricati su misura secondo le specifiche originali.
                </p>
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
                  src="https://cdn.mos.cms.futurecdn.net/7NEtBHiGjnT8SmLYmiZ4Rn-1600-80.jpg.webp" 
                  alt="Restauro Interni" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">4. Restauro degli Interni</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Ricreiamo gli interni con materiali di alta qualità, rispettando i pattern e le tecniche originali. Dai sedili in pelle ai pannelli porta, ogni dettaglio viene curato per rispecchiare l'autenticità del veicolo.
                </p>
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
            Pronto a Restaurare la Tua Auto d'Epoca?
          </motion.h2>
          <motion.p 
            className="text-secondary-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contattaci per una consulenza gratuita e scopri come possiamo aiutarti a riportare in vita il tuo veicolo classico con la massima attenzione ai dettagli e rispetto per la sua storia.
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

export default Restoration;