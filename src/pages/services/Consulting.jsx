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
      <div className="relative h-[60vh] md:h-[70vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
            alt="Consulenza auto d'epoca"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 h-full flex items-center">
          <div className="container-custom">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-heading text-gradient mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Servizio di Consulenza
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-secondary-200 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Esperti al tuo fianco per guidarti nel mondo delle auto d'epoca e dei restomod italiani.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Service Description */}
      <section className="py-24 bg-gradient-to-b from-secondary-950 to-secondary-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.h2 
              className="text-4xl md:text-5xl font-heading text-gradient mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Consulenza Specializzata
            </motion.h2>
            <motion.p 
              className="text-secondary-200 text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Il nostro team di esperti offre consulenza professionale su tutti gli aspetti del mondo delle auto d'epoca e dei restomod italiani, dall'acquisto alla valutazione, dalla certificazione agli aspetti legali e assicurativi.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading text-white mb-4">Esperienza Certificata</h3>
              <p className="text-secondary-300">Il nostro team vanta decenni di esperienza nel settore delle auto d'epoca italiane, con competenze specifiche su marchi iconici come Ferrari, Lamborghini, Alfa Romeo e Maserati.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading text-white mb-4">Approccio Personalizzato</h3>
              <p className="text-secondary-300">Ogni consulenza è personalizzata in base alle tue esigenze specifiche, che tu sia un collezionista esperto o un appassionato alle prime armi nel mondo delle auto d'epoca.</p>
            </motion.div>

            <motion.div 
              className="luxury-card p-8 hover:translate-y-[-8px] transition-transform duration-500"
              variants={fadeInUp}
            >
              <div className="text-primary mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading text-white mb-4">Rete di Esperti</h3>
              <p className="text-secondary-300">Collaboriamo con una rete di esperti in vari settori, dai restauratori ai periti, dagli storici dell'automobile agli specialisti legali, per offrirti una consulenza completa e affidabile.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Consulting Services */}
      <section className="py-24 bg-secondary-900">
        <div className="container-custom">
          <motion.h2 
            className="text-4xl md:text-5xl font-heading text-gradient mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            I Nostri Servizi di Consulenza
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
                  src="https://www.cristianoluzzago.it/wp-content/uploads/2025/01/image00003.jpg" 
                  alt="Consulenza Acquisto" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Consulenza per l'Acquisto</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Ti guidiamo nella ricerca e selezione dell'auto d'epoca o del restomod perfetto per te, valutando autenticità, condizioni, storia e valore dell'investimento. Il nostro servizio include:
                </p>
                <ul className="text-secondary-300 mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Ricerca mirata in base alle tue preferenze e budget
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Ispezione dettagliata e valutazione tecnica
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Verifica dell'autenticità e della storia del veicolo
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Assistenza nella negoziazione e nell'acquisto
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
                  src="https://www.newsauto.it/wp-content/uploads/2016/11/centro-restauro-auto-classiche-mauto.jpg" 
                  alt="Consulenza Progetti" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Consulenza per Progetti di Restauro e Restomod</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Forniamo consulenza completa per progetti di restauro e restomod, dalla pianificazione iniziale alla supervisione dell'esecuzione, garantendo risultati eccellenti e rispetto del budget.
                </p>
                <ul className="text-secondary-300 mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Definizione del concept e degli obiettivi del progetto
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Selezione dei partner e fornitori più adatti
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Pianificazione dettagliata delle fasi e dei costi
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Supervisione e controllo qualità durante l'esecuzione
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
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" 
                  alt="Consulenza Valutazione" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Valutazione e Certificazione</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Offriamo servizi di valutazione professionale e assistenza per la certificazione di autenticità e storicità del tuo veicolo, elementi fondamentali per determinarne il valore e garantirne la corretta classificazione.
                </p>
                <ul className="text-secondary-300 mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Valutazione dettagliata del valore di mercato
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Assistenza per l'ottenimento di certificati di autenticità
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Supporto per la certificazione di interesse storico
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Preparazione della documentazione necessaria
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
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" 
                  alt="Consulenza Legale" 
                  className="rounded-lg shadow-xl w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-3xl font-heading text-white mb-4">Consulenza Legale e Assicurativa</h3>
                <p className="text-secondary-300 text-lg leading-relaxed">
                  Forniamo assistenza per tutti gli aspetti legali e assicurativi relativi alle auto d'epoca e ai restomod, dalla registrazione alle polizze specializzate, garantendo la massima tutela per il tuo investimento.
                </p>
                <ul className="text-secondary-300 mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Consulenza su normative e regolamenti specifici
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Assistenza per immatricolazione e passaggi di proprietà
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Selezione delle migliori coperture assicurative
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Supporto in caso di controversie o sinistri
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-secondary-900">
        <div className="container-custom">
          <motion.h2 
            className="text-4xl md:text-5xl font-heading text-gradient mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Cosa Dicono i Nostri Clienti
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="luxury-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-white text-lg font-semibold">Marco Bianchi</h4>
                  <p className="text-secondary-400">Collezionista</p>
                </div>
              </div>
              <p className="text-secondary-300 italic">
                "La consulenza ricevuta è stata fondamentale per l'acquisto della mia Alfa Romeo Giulietta Sprint. Il team ha verificato l'autenticità del veicolo e mi ha assistito in ogni fase della trattativa, garantendomi un investimento sicuro."
              </p>
            </motion.div>

            <motion.div 
              className="luxury-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-white text-lg font-semibold">Laura Rossi</h4>
                  <p className="text-secondary-400">Imprenditrice</p>
                </div>
              </div>
              <p className="text-secondary-300 italic">
                "Ho affidato al team la supervisione del progetto di restomod della mia Lancia Fulvia. La loro competenza e attenzione ai dettagli hanno permesso di realizzare un'auto unica che mantiene l'eleganza originale con prestazioni moderne."
              </p>
            </motion.div>

            <motion.div 
              className="luxury-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-white text-lg font-semibold">Alessandro Verdi</h4>
                  <p className="text-secondary-400">Appassionato di auto d'epoca</p>
                </div>
              </div>
              <p className="text-secondary-300 italic">
                "Grazie alla loro consulenza legale e assicurativa, ho potuto importare e registrare in Italia una rara Ferrari 250 GT. La loro conoscenza delle normative e dei processi burocratici ha reso semplice un processo potenzialmente complesso."
              </p>
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
            Pronto a Ricevere la Nostra Consulenza?
          </motion.h2>
          <motion.p 
            className="text-secondary-200 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contattaci per una consulenza iniziale gratuita e scopri come possiamo aiutarti a realizzare i tuoi progetti nel mondo delle auto d'epoca e dei restomod italiani.
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
              Richiedi Consulenza
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;