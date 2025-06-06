import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { contactService } from '../services';
import Newsletter from '../components/common/Newsletter';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaTwitter, FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
    loading: false
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Configurazione della mappa Google
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  // Coordinate di Maranello, Italia
  const center = {
    lat: 44.5284,
    lng: 10.8664,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  // Accesso alla variabile d'ambiente per la API key di Google Maps
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const validateForm = () => {
    let valid = true;
    const errors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    // Validazione nome
    if (!formData.name.trim()) {
      errors.name = 'Il nome è obbligatorio';
      valid = false;
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'L\'email è obbligatoria';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Inserisci un indirizzo email valido';
      valid = false;
    }

    // Validazione oggetto
    if (!formData.subject.trim()) {
      errors.subject = 'L\'oggetto è obbligatorio';
      valid = false;
    }

    // Validazione messaggio
    if (!formData.message.trim()) {
      errors.message = 'Il messaggio è obbligatorio';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset dell'errore quando l'utente inizia a digitare
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione del form
    if (!validateForm()) {
      return;
    }
    
    setFormStatus({ ...formStatus, submitted: true, loading: true, message: 'Invio in corso...' });
    
    try {
      // Prepariamo i dati per l'API con i nomi dei campi in italiano
      const contactData = {
        nome: formData.name,
        email: formData.email,
        telefono: formData.phone,
        oggetto: formData.subject,
        messaggio: formData.message
      };
      
      // Utilizzo del servizio per inviare il messaggio
      await contactService.sendMessage(contactData);
      
      // Gestione del successo
      setFormStatus({
        submitted: false,
        loading: false,
        success: true,
        message: 'Grazie per averci contattato! Ti risponderemo al più presto.'
      });
      
      
      // Reset del form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Dopo 5 secondi, rimuovi il messaggio di successo
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: '', loading: false });
      }, 5000);
      
    } catch (error) {
      console.error('Errore durante l\'invio del form:', error);
      setFormStatus({
        submitted: false,
        success: false,
        loading: false,
        message: 'Si è verificato un errore durante l\'invio. Riprova più tardi.'
      });
    }
  };

  // Varianti per le animazioni
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

  // Dati FAQ
  const faqItems = [
    {
      question: 'Quali sono i tempi di risposta per una richiesta di informazioni?',
      answer: 'Ci impegniamo a rispondere a tutte le richieste entro 24-48 ore lavorative. Per richieste più complesse o personalizzate, potrebbe essere necessario un tempo maggiore.'
    },
    {
      question: 'Posso visitare il vostro showroom?',
      answer: 'Certamente! Il nostro showroom è aperto dal lunedì al venerdì dalle 9:00 alle 18:00 e il sabato dalle 10:00 alle 16:00. Ti consigliamo di prenotare un appuntamento per garantirti un\'assistenza personalizzata.'
    },
    {
      question: 'Come posso richiedere un preventivo per un progetto di restauro?',
      answer: 'Puoi richiedere un preventivo compilando il modulo di contatto su questa pagina, specificando i dettagli del tuo progetto. In alternativa, puoi contattarci direttamente via email o telefono.'
    },
  ];

  const [openFaq, setOpenFaq] = useState({});

  const toggleFaq = (index) => {
    setOpenFaq(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-secondary-950 pt-16 sm:pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden"> 
        <div className="container-custom px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading mb-3 sm:mb-4 md:mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Contattaci
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-secondary-300 mb-4 sm:mb-5 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Siamo qui per rispondere a tutte le tue domande e aiutarti a realizzare la tua auto dei sogni.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="luxury-card p-5 sm:p-6 md:p-8 rounded-lg">
                <h2 className="text-2xl sm:text-2xl md:text-3xl font-heading font-bold mb-4 sm:mb-6 md:mb-8">Inviaci un messaggio</h2>
                
                {formStatus.message && (
                  <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg ${formStatus.success ? 'bg-green-900/20 text-green-400 border border-green-800' : 'bg-red-900/20 text-red-400 border border-red-800'}`}>
                    {formStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base font-medium">Nome completo *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full bg-secondary-800 border ${formErrors.name ? 'border-red-500' : 'border-secondary-700'} rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                      />
                      {formErrors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base font-medium">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full bg-secondary-800 border ${formErrors.email ? 'border-red-500' : 'border-secondary-700'} rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                      />
                      {formErrors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base font-medium">Telefono</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base font-medium">Oggetto *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={`w-full bg-secondary-800 border ${formErrors.subject ? 'border-red-500' : 'border-secondary-700'} rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                      />
                      {formErrors.subject && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.subject}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base font-medium">Messaggio *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className={`w-full bg-secondary-800 border ${formErrors.message ? 'border-red-500' : 'border-secondary-700'} rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    ></textarea>
                    {formErrors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.message}</p>}
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="h-3 w-3 sm:h-4 sm:w-4 text-primary focus:ring-primary border-secondary-700 rounded"
                    />
                    <label htmlFor="privacy" className="ml-2 block text-xs sm:text-sm text-secondary-300">
                      Acconsento al trattamento dei miei dati personali secondo la <a href="/privacy" className="text-primary hover:text-primary-400 transition-colors">Privacy Policy</a> *
                    </label>
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg"
                      disabled={formStatus.loading}
                      className="btn-hover-effect relative text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6"
                    >
                      {formStatus.loading ? (
                        <>
                          <span className="opacity-0">Invia Messaggio</span>
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </span>
                        </>
                      ) : 'Invia Messaggio'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="luxury-card p-5 sm:p-6 md:p-8 rounded-lg sticky top-24">
                <h3 className="text-xl sm:text-xl md:text-2xl font-heading font-bold mb-4 sm:mb-5 md:mb-6">Informazioni di contatto</h3>
                
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 sm:mr-4">
                      <FaMapMarkerAlt className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm sm:text-base font-medium mb-0.5 sm:mb-1">Indirizzo</h4>
                      <p className="text-secondary-400 text-xs sm:text-sm">Via XX Settembre, 45<br />41053 Maranello, MO<br />Italia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 sm:mr-4">
                      <FaPhone className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm sm:text-base font-medium mb-0.5 sm:mb-1">Telefono</h4>
                      <p className="text-secondary-400 text-xs sm:text-sm">+39 39 2693 6916</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 sm:mr-4">
                      <FaEnvelope className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm sm:text-base font-medium mb-0.5 sm:mb-1">Email</h4>
                      <p className="text-secondary-400 text-xs sm:text-sm">info@rmimadeinitaly.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 sm:mr-4">
                      <FaClock className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm sm:text-base font-medium mb-0.5 sm:mb-1">Orari</h4>
                      <p className="text-secondary-400 text-xs sm:text-sm">
                        Lun - Ven: 9:00 - 18:00<br />
                        Sab: 10:00 - 16:00<br />
                        Dom: Chiuso
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-7 md:mt-8">
                  <h4 className="text-white text-sm sm:text-base font-medium mb-2 sm:mb-3 md:mb-4">Seguici</h4>
                  <div className="flex space-x-3 sm:space-x-4">
                    <a href="#" className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-secondary-800 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                      <FaTwitter className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                    </a>
                    <a href="#" className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-secondary-800 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                      <FaInstagram className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                    </a>
                    <a href="#" className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-secondary-800 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                      <FaFacebookF className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                    </a>
                    <a href="#" className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-secondary-800 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                      <FaYoutube className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                    </a>
                    <a href="#" className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-secondary-800 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                      <FaLinkedinIn className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-secondary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-heading font-bold mb-4 sm:mb-6 md:mb-8">Dove siamo</h2>
            <div className="luxury-card h-[300px] sm:h-[350px] md:h-[400px] w-full rounded-lg overflow-hidden">
              {/* Implementazione della mappa Google */}
              <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}
                  options={options}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-heading font-bold mb-4 sm:mb-6 md:mb-8">Domande frequenti</h2>
            <div className="luxury-card p-4 sm:p-6 md:p-8 rounded-lg">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-secondary-800 pb-4 sm:pb-5 md:pb-6 last:border-b-0 last:pb-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex justify-between items-center w-full text-left"
                    >
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-white pr-4">{item.question}</h3>
                      <span className={`transform transition-transform duration-300 ${openFaq[index] ? 'rotate-180' : ''}`}>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </span>
                    </button>
                    {openFaq[index] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 sm:mt-3 md:mt-4 text-secondary-300 text-sm sm:text-base"
                      >
                        <p>{item.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-secondary-900">
        <div className="container-custom">
          <Newsletter />
        </div>
      </section>
    </div>
  );
};

export default Contact;