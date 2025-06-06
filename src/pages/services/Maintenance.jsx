import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Maintenance = () => {
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
            src="https://manifatturaautomobilitorino.com/img/services/MAT_Services_Production.jpg"
            alt="Manutenzione auto d'epoca"
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
              Servizio di Manutenzione
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-secondary-200 max-w-xs sm:max-w-md md:max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Mantieni la tua auto d'epoca in condizioni ottimali con i nostri servizi di manutenzione specializzata.
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
              Manutenzione Specializzata
            </motion.h2>
            <motion.p 
              className="text-secondary-200 text-base sm:text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              I nostri servizi di manutenzione sono progettati specificamente per auto d'epoca italiane, garantendo che ogni intervento rispetti l'autenticità e preservi il valore del tuo veicolo storico.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Manutenzione Programmata</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Piani di manutenzione personalizzati per mantenere la tua auto d'epoca in condizioni ottimali, prevenendo problemi e preservando il suo valore nel tempo.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-6 sm:p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Diagnostica Avanzata</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Utilizziamo strumenti diagnostici specializzati per auto d'epoca, combinando tecnologia moderna con conoscenza approfondita dei veicoli classici.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-6 sm:p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-4 sm:mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading text-white mb-2 sm:mb-4">Assistenza Continua</h3>
              <p className="text-secondary-300 text-sm sm:text-base">Offriamo supporto continuo e consulenza per qualsiasi necessità relativa alla manutenzione della tua auto d'epoca, con reperibilità anche per emergenze.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Maintenance Services */}
      <section className="py-16 sm:py-20 md:py-24 bg-secondary-900">
        <div className="container-custom">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-10 sm:mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            I Nostri Servizi di Manutenzione
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
                  src="https://images.pexels.com/photos/24286596/pexels-photo-24286596/free-photo-of-car-engine-and-parts-under-the-hood.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Manutenzione Meccanica" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">Manutenzione Meccanica</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Eseguiamo tutti gli interventi di manutenzione meccanica necessari per mantenere la tua auto d'epoca in perfetta efficienza, dai tagliandi programmati alle revisioni complete di motore, trasmissione e sistemi frenanti.
                </p>
                <ul className="mt-4 space-y-2 text-secondary-300 text-base sm:text-lg">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Tagliandi programmati
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Revisione motore e trasmissione
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Manutenzione impianto frenante
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
                  src="https://cdn.mos.cms.futurecdn.net/waQriMiWSkK6opVXTiDbhB-1600-80.jpg.webp"  
                  alt="Manutenzione Elettrica/Elettronica" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">Manutenzione Elettrica/Elettronica</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Ci occupiamo della manutenzione e del ripristino dei sistemi elettrici originali, nonché dell'integrazione di componenti moderni quando necessario, sempre rispettando l'autenticità del veicolo.
                </p>
                <ul className="mt-4 space-y-2 text-secondary-300 text-base sm:text-lg">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Revisione impianto elettrico
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Riparazione strumentazione
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Aggiornamento sistemi di illuminazione
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
                  src="https://cdn.mos.cms.futurecdn.net/ihCD57baD8NyG4ymckkxT8-1600-80.jpg.webp" 
                  alt="Manutenzione Estetica" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">Manutenzione Estetica</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Manteniamo l'aspetto estetico della tua auto d'epoca con trattamenti specifici per carrozzeria, cromature, interni in pelle e legno, utilizzando prodotti di alta qualità adatti ai materiali d'epoca.
                </p>
                <ul className="mt-4 space-y-2 text-secondary-300 text-base sm:text-lg">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Lucidatura e protezione carrozzeria
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Trattamento cromature e finiture
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Manutenzione interni in pelle e legno
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
                  src="https://www.motortrend.com/uploads/sites/5/2020/04/1968-Honda-S800-Restomod-Danny-Wu-40.jpg" 
                  alt="Conservazione e Rimessaggio" 
                  className="rounded-lg shadow-xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <h3 className="text-2xl sm:text-2xl md:text-3xl font-heading text-white mb-2 sm:mb-4">Conservazione e Rimessaggio</h3>
                <p className="text-secondary-300 text-base sm:text-lg leading-relaxed">
                  Offriamo servizi di conservazione e rimessaggio in ambienti controllati, ideali per preservare la tua auto d'epoca durante i periodi di inutilizzo, con controlli periodici e manutenzione preventiva.
                </p>
                <ul className="mt-4 space-y-2 text-secondary-300 text-base sm:text-lg">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Rimessaggio in ambiente climatizzato
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Controlli periodici dei fluidi e batteria
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Trattamenti anti-umidità e conservativi
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-secondary-900 to-secondary-950">
        <div className="container-custom">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-heading text-gradient mb-10 sm:mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Piani di Manutenzione
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="luxury-card p-6 sm:p-8 flex flex-col h-full">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-2xl sm:text-3xl font-heading text-white mb-2 sm:mb-4">Piano Base</h3>
                <p className="text-primary text-xl sm:text-2xl font-bold">€ 1.200<span className="text-sm text-secondary-300 font-normal">/anno</span></p>
              </div>
              <div className="text-secondary-300 text-sm sm:text-base flex-grow">
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>2 tagliandi programmati all'anno</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Controllo fluidi e filtri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Ispezione visiva completa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Assistenza telefonica</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 sm:mt-8">
                <Link to="/contact" className="btn-outline w-full py-2 sm:py-3 text-center">
                  Maggiori Informazioni
                </Link>
              </div>
            </div>

            <div className="luxury-card p-6 sm:p-8 flex flex-col h-full border border-primary">
              <div className="absolute top-0 right-0 bg-primary text-secondary-950 py-1 px-3 text-xs sm:text-sm font-bold">
                POPOLARE
              </div>
              <div className="mb-4 sm:mb-6">
                <h3 className="text-2xl sm:text-3xl font-heading text-white mb-2 sm:mb-4">Piano Premium</h3>
                <p className="text-primary text-xl sm:text-2xl font-bold">€ 2.500<span className="text-sm text-secondary-300 font-normal">/anno</span></p>
              </div>
              <div className="text-secondary-300 text-sm sm:text-base flex-grow">
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>4 tagliandi programmati all'anno</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Sostituzione completa fluidi e filtri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Controllo e regolazione sospensioni</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Trattamento protettivo carrozzeria</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Assistenza telefonica prioritaria</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 sm:mt-8">
                <Link to="/contact" className="btn-primary w-full py-2 sm:py-3 text-center">
                  Maggiori Informazioni
                </Link>
              </div>
            </div>

            <div className="luxury-card p-6 sm:p-8 flex flex-col h-full">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-2xl sm:text-3xl font-heading text-white mb-2 sm:mb-4">Piano Elite</h3>
                <p className="text-primary text-xl sm:text-2xl font-bold">€ 4.800<span className="text-sm text-secondary-300 font-normal">/anno</span></p>
              </div>
              <div className="text-secondary-300 text-sm sm:text-base flex-grow">
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Manutenzione completa illimitata</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Revisione annuale completa</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Rimessaggio in ambiente controllato</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Trattamento estetico completo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span> 
                    <span>Assistenza 24/7 e servizio di emergenza</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 sm:mt-8">
                <Link to="/contact" className="btn-outline w-full py-2 sm:py-3 text-center">
                  Maggiori Informazioni
                </Link>
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
            Mantieni il Valore della Tua Auto d'Epoca
          </motion.h2>
          <motion.p 
            className="text-secondary-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contattaci per scoprire come i nostri servizi di manutenzione specializzata possono aiutarti a preservare la bellezza, le prestazioni e il valore della tua auto d'epoca italiana.
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

export default Maintenance;