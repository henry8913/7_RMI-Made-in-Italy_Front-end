import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Consulting = () => {
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
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop"
            alt="Consulenza auto d'epoca"
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
              Servizio di Consulenza
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-secondary-200 max-w-xs sm:max-w-md md:max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Esperti al tuo fianco per ogni aspetto del mondo delle auto d'epoca italiane.
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
              Consulenza Specializzata
            </motion.h2>
            <motion.p 
              className="text-secondary-200 text-base sm:text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Il nostro team di esperti offre consulenza specializzata per ogni aspetto del mondo delle auto d'epoca italiane, dall'acquisto alla valutazione, dalla certificazione alla gestione di collezioni.
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
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Esperienza Certificata</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Il nostro team vanta decenni di esperienza nel settore delle auto d'epoca italiane, con competenze certificate e riconosciute a livello internazionale.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-6 sm:p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Approccio Personalizzato</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Ogni cliente riceve un servizio su misura, adattato alle specifiche esigenze e obiettivi, che si tratti di un singolo acquisto o della gestione di un'intera collezione.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-6 sm:p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Network di Esperti</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Collaboriamo con una rete internazionale di esperti, collezionisti, restauratori e archivi storici per offrire un servizio completo e di altissimo livello.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Consulting Services */}
      <section className="py-16 sm:py-20 md:py-24 bg-secondary-900">
        <div className="container-custom">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-10 sm:mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            I Nostri Servizi di Consulenza
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
                  src="https://www.cristianoluzzago.it/wp-content/uploads/2025/01/image00003.jpg" 
                  alt="Consulenza all'Acquisto" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">Consulenza all'Acquisto</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Ti guidiamo nell'acquisto della tua auto d'epoca ideale, valutando autenticità, condizioni, storia e valore di mercato. Il nostro servizio include ricerca, ispezione, verifica documentale e negoziazione per garantirti un acquisto sicuro e vantaggioso.
                </p>
                <ul className="mt-4 space-y-2 text-secondary-300 text-base sm:text-lg">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Ricerca mirata in base alle tue preferenze
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Ispezione tecnica approfondita
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Verifica documentale e storica
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
                  src="https://www.newsauto.it/wp-content/uploads/2016/11/centro-restauro-auto-classiche-mauto.jpg"  
                  alt="Consulenza per Restauro e Restomod" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">Consulenza per Restauro e Restomod</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Offriamo consulenza specializzata per progetti di restauro e restomod, aiutandoti a definire obiettivi, budget e tempistiche. Ti guidiamo nella scelta delle migliori officine e specialisti, supervisionando l'intero processo per garantire risultati eccellenti.
                </p>
                <ul className="mt-4 space-y-2 text-secondary-300 text-base sm:text-lg">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Definizione del progetto e budget
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Selezione di officine specializzate
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Supervisione dell'intero processo
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
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" 
                  alt="Valutazione e Certificazione" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">Valutazione e Certificazione</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Forniamo valutazioni professionali e indipendenti del valore di mercato della tua auto d'epoca, basate su analisi approfondite di condizioni, rarità, storia e tendenze di mercato. Ti assistiamo anche nell'ottenimento di certificazioni ufficiali.
                </p>
                <ul className="mt-4 space-y-2 text-secondary-300 text-base sm:text-lg">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Valutazione professionale del valore
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Perizie per assicurazioni e collezioni
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Assistenza per certificazioni ufficiali
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
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop"
                  alt="Consulenza Legale e Assicurativa" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">Consulenza Legale e Assicurativa</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Ti assistiamo in tutti gli aspetti legali e assicurativi legati alle auto d'epoca: immatricolazione, passaggi di proprietà, importazione/esportazione, e selezione delle migliori coperture assicurative specializzate per veicoli storici.
                </p>
                <ul className="mt-4 space-y-2 text-secondary-300 text-base sm:text-lg">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Assistenza per pratiche amministrative
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Consulenza per importazione/esportazione
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Selezione di polizze assicurative specializzate
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-secondary-900 to-secondary-950">
        <div className="container-custom">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-10 sm:mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Cosa Dicono i Nostri Clienti
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="luxury-card p-6 sm:p-8">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>
              <p className="text-secondary-300 text-sm sm:text-base italic mb-4 sm:mb-6">
                "Grazie alla consulenza di RMI Made in Italy ho acquistato la mia Alfa Romeo Giulietta Sprint del 1962 in condizioni eccellenti e con una storia documentata. Il loro supporto è stato fondamentale per evitare brutte sorprese e concludere un ottimo affare."
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-secondary-950 font-bold">
                  MR
                </div>
                <div>
                  <p className="text-white font-medium">Marco Rossi</p>
                  <p className="text-secondary-400 text-sm">Milano</p>
                </div>
              </div>
            </div>

            <div className="luxury-card p-6 sm:p-8">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>
              <p className="text-secondary-300 text-sm sm:text-base italic mb-4 sm:mb-6">
                "Ho affidato a RMI la supervisione del restauro della mia Lancia Flaminia. La loro consulenza è stata preziosa per selezionare l'officina giusta e per ogni decisione tecnica. Il risultato è stato premiato a diversi concorsi d'eleganza."
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-secondary-950 font-bold">
                  LB
                </div>
                <div>
                  <p className="text-white font-medium">Laura Bianchi</p>
                  <p className="text-secondary-400 text-sm">Roma</p>
                </div>
              </div>
            </div>

            <div className="luxury-card p-6 sm:p-8">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="text-primary ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
              </div>
              <p className="text-secondary-300 text-sm sm:text-base italic mb-4 sm:mb-6">
                "Come collezionista straniero, avevo bisogno di supporto per gestire gli aspetti legali e logistici dell'importazione di auto d'epoca italiane. RMI ha reso tutto semplice, occupandosi di ogni dettaglio con professionalità impeccabile."
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-secondary-950 font-bold">
                  JM
                </div>
                <div>
                  <p className="text-white font-medium">John Miller</p>
                  <p className="text-secondary-400 text-sm">New York</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-secondary-950">
        <div className="container-custom text-center px-4 sm:px-6">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Esperti al Tuo Servizio
          </motion.h2>
          <motion.p 
            className="text-secondary-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contattaci per una consulenza iniziale gratuita e scopri come possiamo aiutarti a realizzare i tuoi progetti nel mondo delle auto d'epoca italiane.
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
              Richiedi Consulenza
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;