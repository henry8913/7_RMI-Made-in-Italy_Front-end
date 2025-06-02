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
      <div className="relative h-[50vh] md:h-[60vh]"> 
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />
          <img
            src="https://manifatturaautomobilitorino.com/img/services/MAT_Services_Production.jpg"
            alt="Manutenzione auto d'epoca"
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
              Servizio di Manutenzione
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-secondary-200 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Mantieni la tua auto restomod in condizioni perfette con i nostri servizi di manutenzione specializzata.
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
              Cura Esperta per la Tua Auto d'Epoca
            </motion.h2>
            <motion.p 
              className="text-secondary-200 text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Il nostro team di tecnici specializzati offre un servizio di manutenzione completo per auto d'epoca e restomod, garantendo prestazioni ottimali e preservando il valore del tuo investimento nel tempo.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading text-white mb-4">Manutenzione Programmata</h3>
              <p className="text-secondary-300">Piani di manutenzione personalizzati per mantenere la tua auto in condizioni ottimali, prevenendo problemi e preservando il suo valore nel tempo.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading text-white mb-4">Diagnostica Avanzata</h3>
              <p className="text-secondary-300">Utilizziamo strumenti diagnostici avanzati specifici per auto d'epoca e moderne per identificare con precisione eventuali problemi.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading text-white mb-4">Assistenza Continua</h3>
              <p className="text-secondary-300">Offriamo assistenza continua e servizio di emergenza per i nostri clienti, garantendo tranquillità e supporto in ogni momento.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Maintenance Services */}
      <section className="py-24 bg-secondary-900">
        <div className="container-custom">
          <motion.h2 
            className="text-4xl md:text-5xl font-heading text-gradient mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            I Nostri Servizi di Manutenzione
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
                  src="https://images.pexels.com/photos/24286596/pexels-photo-24286596/free-photo-of-car-engine-and-parts-under-the-hood.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Manutenzione Meccanica" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Manutenzione Meccanica</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Eseguiamo controlli approfonditi e manutenzione di tutti i componenti meccanici: motore, trasmissione, freni, sospensioni e sterzo. Utilizziamo ricambi originali o di qualità equivalente per garantire prestazioni ottimali e affidabilità.
                </p>
                <ul className="text-secondary-300 mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Tagliandi completi con sostituzione di oli e filtri
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Revisione di motore e trasmissione
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Controllo e regolazione di freni e sospensioni
                  </li>
                </ul>
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
                  src="https://cdn.mos.cms.futurecdn.net/waQriMiWSkK6opVXTiDbhB-1600-80.jpg.webp" 
                  alt="Manutenzione Elettrica" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Manutenzione Elettrica ed Elettronica</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Ci occupiamo della manutenzione e riparazione di tutti i sistemi elettrici ed elettronici, sia originali che moderni aggiunti durante il processo di restomod. Garantiamo il corretto funzionamento di tutti i componenti elettronici.
                </p>
                <ul className="text-secondary-300 mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Diagnosi e riparazione di problemi elettrici
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Manutenzione di sistemi di infotainment moderni
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Aggiornamento software e calibrazione di sistemi elettronici
                  </li>
                </ul>
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
                  src="https://cdn.mos.cms.futurecdn.net/ihCD57baD8NyG4ymckkxT8-1600-80.jpg.webp" 
                  alt="Manutenzione Estetica" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Manutenzione Estetica</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Manteniamo l'aspetto estetico della tua auto in condizioni impeccabili con trattamenti specifici per carrozzeria, interni e dettagli. Utilizziamo prodotti di alta qualità specifici per materiali d'epoca e moderni.
                </p>
                <ul className="text-secondary-300 mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Lucidatura e protezione della carrozzeria
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Trattamento e protezione di interni in pelle e tessuto
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Pulizia e protezione di cromature e dettagli
                  </li>
                </ul>
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
                  src="https://images.unsplash.com/photo-1530046339915-78e93d3c6f10?q=80&w=2070&auto=format&fit=crop" 
                  alt="Conservazione e Rimessaggio" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Conservazione e Rimessaggio</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Offriamo servizi di conservazione e rimessaggio in ambienti controllati per proteggere la tua auto durante i periodi di inutilizzo. Il nostro servizio include manutenzione periodica anche durante il rimessaggio.
                </p>
                <ul className="text-secondary-300 mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Rimessaggio in ambiente a temperatura e umidità controllate
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Manutenzione periodica durante il rimessaggio
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Preparazione del veicolo per lunghi periodi di inattività
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="py-24 bg-secondary-900">
        <div className="container-custom">
          <motion.h2 
            className="text-4xl md:text-5xl font-heading text-gradient mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Piani di Manutenzione
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="luxury-card p-8 border border-secondary-800 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-heading text-white mb-4 text-center">Piano Base</h3>
              <div className="text-primary text-center text-4xl font-bold mb-6">€ 1.200<span className="text-sm text-secondary-400">/anno</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Tagliando annuale completo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Controllo fluidi ogni 6 mesi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Assistenza telefonica prioritaria</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Sconto del 10% su ricambi</span>
                </li>
              </ul>
              <div className="text-center">
                <Link to="/contact" className="btn-outline px-6 py-2 inline-block">
                  Maggiori Informazioni
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="luxury-card p-8 border border-primary rounded-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 bg-primary text-black px-4 py-1 text-sm font-bold">
                Popolare
              </div>
              <h3 className="text-2xl font-heading text-white mb-4 text-center">Piano Premium</h3>
              <div className="text-primary text-center text-4xl font-bold mb-6">€ 2.400<span className="text-sm text-secondary-400">/anno</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Tutto il piano Base</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Controlli trimestrali completi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Servizio di ritiro e consegna</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Detailing completo 2 volte l'anno</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Sconto del 15% su ricambi e manodopera</span>
                </li>
              </ul>
              <div className="text-center">
                <Link to="/contact" className="btn-primary px-6 py-2 inline-block">
                  Maggiori Informazioni
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="luxury-card p-8 border border-secondary-800 rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-heading text-white mb-4 text-center">Piano Elite</h3>
              <div className="text-primary text-center text-4xl font-bold mb-6">€ 4.800<span className="text-sm text-secondary-400">/anno</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Tutto il piano Premium</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Manutenzione illimitata</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Rimessaggio incluso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Assistenza 24/7 con numero dedicato</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-secondary-300">Sconto del 25% su tutti i servizi aggiuntivi</span>
                </li>
              </ul>
              <div className="text-center">
                <Link to="/contact" className="btn-outline px-6 py-2 inline-block">
                  Maggiori Informazioni
                </Link>
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
            Affida la Tua Auto a Mani Esperte
          </motion.h2>
          <motion.p 
            className="text-secondary-200 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contattaci per una consulenza personalizzata e scopri il piano di manutenzione più adatto alle tue esigenze. I nostri esperti sono pronti ad aiutarti a mantenere la tua auto in condizioni perfette.
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

export default Maintenance;