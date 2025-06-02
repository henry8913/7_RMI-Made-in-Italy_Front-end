import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for tracking which FAQ items are open
  const [openItems, setOpenItems] = useState({});

  // Toggle FAQ item
  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
        staggerChildren: 0.1
      }
    }
  };

  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: "Cosa sono i restomod?",
      answer: "I restomod sono veicoli classici restaurati con tecnologie moderne. Mantengono l'estetica vintage ma offrono prestazioni, comfort e affidabilità contemporanei. Combinano il fascino del design classico con l'ingegneria moderna, creando un'esperienza di guida unica."
    },
    {
      id: 2,
      question: "Come posso acquistare un restomod?",
      answer: "Per acquistare un restomod, puoi contattarci direttamente attraverso il nostro modulo di contatto o chiamando il nostro team vendite. Offriamo anche la possibilità di prenotare un test drive per provare il veicolo prima dell'acquisto. Ogni restomod è unico, quindi ti consigliamo di parlare con i nostri esperti per trovare quello più adatto alle tue esigenze."
    },
    {
      id: 3,
      question: "Quali garanzie offrite sui vostri restomod?",
      answer: "Tutti i nostri restomod sono coperti da una garanzia di 2 anni sui componenti meccanici e di 1 anno sulla carrozzeria e gli interni. Offriamo anche pacchetti di estensione della garanzia e servizi di manutenzione programmata per mantenere il tuo veicolo in condizioni ottimali."
    },
    {
      id: 4,
      question: "Posso richiedere modifiche personalizzate?",
      answer: "Assolutamente sì! La personalizzazione è al centro della nostra filosofia. Collaboriamo con te per creare un restomod che rispecchi i tuoi gusti e le tue esigenze. Dalle finiture degli interni alle modifiche del motore, il nostro team di esperti può realizzare quasi qualsiasi richiesta. Visita la nostra pagina 'Richieste Personalizzate' per iniziare il processo."
    },
    {
      id: 5,
      question: "Quanto tempo richiede la realizzazione di un restomod?",
      answer: "I tempi di realizzazione variano in base alla complessità del progetto e alle personalizzazioni richieste. In media, un restomod richiede da 6 a 12 mesi per essere completato. Durante questo periodo, ti terremo costantemente aggiornato sullo stato di avanzamento del tuo veicolo con report fotografici e video."
    },
    {
      id: 6,
      question: "Offrite servizi di spedizione internazionale?",
      answer: "Sì, offriamo servizi di spedizione in tutto il mondo. Ci occupiamo di tutta la documentazione necessaria, delle pratiche doganali e dell'assicurazione durante il trasporto. Il costo della spedizione varia in base alla destinazione e viene calcolato individualmente per ogni cliente."
    },
    {
      id: 7,
      question: "Come vengono selezionati i veicoli base per i restomod?",
      answer: "Selezioniamo attentamente i veicoli base per i nostri restomod, privilegiando modelli iconici italiani in buone condizioni strutturali. Ogni veicolo viene sottoposto a un'ispezione approfondita prima di iniziare il processo di restauro. Collaboriamo anche con collezionisti e appassionati che desiderano trasformare la propria auto classica in un restomod."
    },
    {
      id: 8,
      question: "Quali sono i costi di manutenzione di un restomod?",
      answer: "I costi di manutenzione di un restomod sono generalmente inferiori rispetto a quelli di un'auto d'epoca originale, grazie all'utilizzo di componenti moderni più affidabili. Offriamo pacchetti di manutenzione programmata e un servizio di assistenza dedicato per tutti i nostri clienti. Contattaci per ricevere un preventivo personalizzato in base al modello specifico."
    },
    {
      id: 9,
      question: "I restomod possono essere utilizzati quotidianamente?",
      answer: "Assolutamente sì! Uno dei principali vantaggi dei restomod è proprio la possibilità di utilizzarli quotidianamente. Grazie all'integrazione di tecnologie moderne, questi veicoli offrono affidabilità, comfort e prestazioni paragonabili alle auto contemporanee, pur mantenendo il fascino estetico dei classici."
    },
    {
      id: 10,
      question: "Come posso finanziare l'acquisto di un restomod?",
      answer: "Offriamo diverse opzioni di finanziamento attraverso i nostri partner bancari. Possiamo strutturare piani di pagamento personalizzati, leasing o finanziamenti tradizionali. Il nostro team finanziario è a disposizione per aiutarti a trovare la soluzione più adatta alle tue esigenze. Contattaci per una consulenza personalizzata."
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-950">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-secondary-950/80 z-10" />
          <img
            src="https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?q=80&w=2071&auto=format&fit=crop"
            alt="Classic Car Workshop"
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
              Domande Frequenti
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-secondary-200 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Tutto ciò che devi sapere sui nostri restomod e servizi
            </motion.p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-primary-950 to-secondary-950">
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqItems.map((item) => (
              <motion.div 
                key={item.id}
                className="luxury-card mb-6 overflow-hidden"
                variants={fadeInUp}
              >
                <button
                  className="w-full text-left p-6 flex justify-between items-center"
                  onClick={() => toggleItem(item.id)}
                >
                  <h3 className="text-xl md:text-2xl font-heading text-white pr-8">{item.question}</h3>
                  <div className={`text-primary transition-transform duration-300 ${openItems[item.id] ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <motion.div 
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ 
                    height: openItems[item.id] ? 'auto' : 0,
                    opacity: openItems[item.id] ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="p-6 pt-0 text-secondary-300 border-t border-secondary-800">
                    <p className="leading-relaxed">{item.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact CTA */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading text-gradient mb-6">Hai altre domande?</h2>
            <p className="text-secondary-300 mb-8 max-w-2xl mx-auto">
              Non hai trovato la risposta che cercavi? Il nostro team è a tua disposizione per fornirti tutte le informazioni di cui hai bisogno.
            </p>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a 
                href="/contact" 
                className="btn-primary btn-hover-effect px-8 py-4 text-lg"
              >
                Contattaci
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;