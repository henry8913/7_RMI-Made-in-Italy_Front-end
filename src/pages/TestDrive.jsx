import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { testDriveService, restomodService } from '../services';
import { Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';

const TestDrive = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modelIdFromUrl = searchParams.get('modelId');
  const { user, isAuthenticated } = useAuth();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState(modelIdFromUrl || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Get tomorrow's date in YYYY-MM-DD format for min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

  // Get date 3 months from now for max date attribute
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  const threeMonthsLaterFormatted = threeMonthsLater.toISOString().split('T')[0];

  // Predefined locations
  const locations = [
    'Milano - Showroom Centrale',
    'Roma - Sede Espositiva EUR',
    'Torino - Centro Storico',
    'Modena - Motor Valley',
    'Firenze - Showroom Toscana'
  ];

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const data = await restomodService.getAll();
        setModels(Array.isArray(data) ? data : data.restomods || []);
        setLoading(false);
      } catch (err) {
        console.error('Errore nel caricamento dei modelli:', err);
        setError('Si è verificato un errore nel caricamento dei modelli. Riprova più tardi.');
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  useEffect(() => {
    // When date and model are selected, check available times
    const checkAvailability = async () => {
      if (!date || !selectedModel) return;

      try {
        const response = await testDriveService.checkAvailability(selectedModel, date);
        // Assuming the API returns available time slots
        setAvailableTimes(response.availableTimes || []);
        
        // If no times are available, set a default list
        if (!response.availableTimes || response.availableTimes.length === 0) {
          setAvailableTimes([
            '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
          ]);
        }
      } catch (err) {
        console.error('Errore nel controllo della disponibilità:', err);
        // Fallback to default times if API fails
        setAvailableTimes([
          '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
        ]);
      }
    };

    checkAvailability();
  }, [date, selectedModel]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/test-drive' } });
      return;
    }

    if (!selectedModel || !date || !time || !location || !contactName || !contactEmail || !contactPhone) {
      alert('Per favore, compila tutti i campi richiesti.');
      return;
    }

    try {
      setSubmitting(true);
      await testDriveService.book({
        modello: selectedModel,
        data: date,
        ora: time,
        luogo: location,
        note: notes,
        contatto: {
          nome: contactName,
          email: contactEmail,
          telefono: contactPhone
        }
      });
      
      setSuccess(true);
      // Reset form
      setSelectedModel('');
      setDate('');
      setTime('');
      setLocation('');
      setNotes('');
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Errore nella prenotazione del test drive:', err);
      alert('Si è verificato un errore nella prenotazione del test drive. Riprova più tardi.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-900 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-900 text-white flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl font-bold mb-4">Errore</h2>
        <p className="text-secondary-300 mb-8">{error}</p>
        <Link to="/">
          <Button variant="primary">Torna alla home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-950 text-white pt-16 sm:pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary-950 z-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('/images/test-drive-hero.jpg')` }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">Prenota un Test Drive</h1>
            <p className="text-base sm:text-lg text-secondary-300 max-w-xl sm:max-w-2xl mx-auto">
              Vivi l'emozione di guidare un'auto d'epoca con tecnologia moderna. 
              Prenota oggi il tuo test drive esclusivo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Message */}
      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-800 text-white p-3 sm:p-4 rounded-lg max-w-xs sm:max-w-xl md:max-w-3xl mx-auto mt-4 sm:mt-6 md:mt-8"
        >
          <div className="flex items-start sm:items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg">Prenotazione confermata!</h3>
              <p className="text-xs sm:text-sm md:text-base">La tua richiesta di test drive è stata inviata con successo. Riceverai presto una email di conferma con tutti i dettagli.</p>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 text-center">
            <Link to="/profile">
              <Button variant="secondary" size="sm">Visualizza le tue prenotazioni</Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Booking Form */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-3xl mx-auto bg-secondary-900/50 rounded-lg p-4 sm:p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">Prenota la tua esperienza di guida</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4 sm:mb-6">
                <label htmlFor="model" className="block text-secondary-300 text-sm sm:text-base mb-1 sm:mb-2">Seleziona un modello*</label>
                <select
                  id="model"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Seleziona un modello</option>
                  {models.map((model) => (
                    <option key={model._id} value={model._id}>
                      {model.costruttore && model.costruttore.nome ? model.costruttore.nome : ''} {model.nome} - {model.anno}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 sm:mb-6">
                <label htmlFor="date" className="block text-secondary-300 text-sm sm:text-base mb-1 sm:mb-2">Seleziona una data*</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={tomorrowFormatted}
                  max={threeMonthsLaterFormatted}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <p className="text-xs sm:text-sm text-secondary-400 mt-1">Le prenotazioni sono disponibili fino a 3 mesi in anticipo</p>
              </div>

              <div className="mb-4 sm:mb-6">
                <label htmlFor="time" className="block text-secondary-300 text-sm sm:text-base mb-1 sm:mb-2">Seleziona un orario*</label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={!date || !selectedModel}
                >
                  <option value="">Seleziona un orario</option>
                  {availableTimes.map((timeSlot) => (
                    <option key={timeSlot} value={timeSlot}>
                      {timeSlot}
                    </option>
                  ))}
                </select>
                {(!date || !selectedModel) && (
                  <p className="text-xs sm:text-sm text-primary mt-1">Seleziona prima un modello e una data</p>
                )}
              </div>

              <div className="mb-4 sm:mb-6">
                <label htmlFor="location" className="block text-secondary-300 text-sm sm:text-base mb-1 sm:mb-2">Seleziona una sede*</label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Seleziona una sede</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 sm:mb-6">
                <label htmlFor="notes" className="block text-secondary-300 text-sm sm:text-base mb-1 sm:mb-2">Note (opzionale)</label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Inserisci eventuali richieste o preferenze"
                  className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary h-20 sm:h-24"
                ></textarea>
              </div>

              <div className="mb-4 sm:mb-6 border-t border-secondary-700 pt-4 sm:pt-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center sm:text-left">Informazioni di contatto*</h3>
                
                <div className="mb-3 sm:mb-4">
                  <label htmlFor="contactName" className="block text-secondary-300 text-sm sm:text-base mb-1 sm:mb-2">Nome completo*</label>
                  <input
                    type="text"
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Inserisci il tuo nome completo"
                    className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="mb-3 sm:mb-4">
                  <label htmlFor="contactEmail" className="block text-secondary-300 text-sm sm:text-base mb-1 sm:mb-2">Email*</label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Inserisci la tua email"
                    className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="mb-3 sm:mb-4">
                  <label htmlFor="contactPhone" className="block text-secondary-300 text-sm sm:text-base mb-1 sm:mb-2">Telefono*</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Inserisci il tuo numero di telefono"
                    className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex justify-center">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg"
                  disabled={submitting || !isAuthenticated}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm sm:text-base">Invio in corso...</span>
                    </>
                  ) : <span className="text-sm sm:text-base">Prenota ora</span>}
                </Button>
              </div>

              {!isAuthenticated && (
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-secondary-800 rounded-lg border border-secondary-600 text-center">
                  <p className="text-secondary-300 text-sm sm:text-base mb-1 sm:mb-2">Per prenotare un test drive, è necessario accedere al tuo account.</p>
                  <Link to="/login" className="text-primary hover:text-primary-light font-medium text-sm sm:text-base">
                    Accedi o registrati
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Why Book a Test Drive */}
      <section className="py-10 sm:py-12 md:py-16 bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Perché prenotare un test drive</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-6 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary-950 p-4 sm:p-5 md:p-6 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-center">Esperienza Unica</h3>
              <p className="text-secondary-300 text-sm sm:text-base text-center">
                Prova l'emozione di guidare un'auto d'epoca con prestazioni moderne in un'esperienza che unisce il fascino del passato con la tecnologia del presente.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-950 p-4 sm:p-5 md:p-6 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-center">Assistenza Professionale</h3>
              <p className="text-secondary-300 text-sm sm:text-base text-center">
                I nostri esperti ti guideranno durante tutto il test drive, spiegandoti le caratteristiche uniche del modello e rispondendo a tutte le tue domande.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary-950 p-4 sm:p-5 md:p-6 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-center">Nessun Impegno</h3>
              <p className="text-secondary-300 text-sm sm:text-base text-center">
                Il test drive è gratuito e senza impegno. È un'opportunità per conoscere meglio i nostri modelli prima di prendere una decisione d'acquisto.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">Domande Frequenti</h2>
          
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
            <div className="bg-secondary-900 rounded-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Quanto dura un test drive?</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                I nostri test drive durano circa 30-45 minuti, tempo sufficiente per farti apprezzare le caratteristiche del veicolo e porre tutte le domande che desideri.
              </p>
            </div>
            
            <div className="bg-secondary-900 rounded-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Devo portare qualcosa con me?</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                Sì, è necessario portare con sé una patente di guida valida e in corso di validità. Ti consigliamo anche di indossare scarpe comode per la guida.
              </p>
            </div>
            
            <div className="bg-secondary-900 rounded-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Posso portare un accompagnatore?</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                Certamente! Puoi portare un accompagnatore che potrà sedersi nel sedile del passeggero durante il test drive, a seconda del modello scelto.
              </p>
            </div>
            
            <div className="bg-secondary-900 rounded-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Cosa succede se devo annullare la prenotazione?</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                Puoi annullare o riprogrammare il tuo test drive fino a 24 ore prima dell'orario prenotato senza alcuna penalità, direttamente dalla tua area personale.
              </p>
            </div>
            
            <div className="bg-secondary-900 rounded-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Il test drive è gratuito?</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                Sì, il test drive è completamente gratuito e senza impegno. È un'opportunità per conoscere meglio i nostri modelli restomod.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Hai altre domande?</h2>
          <p className="text-base sm:text-lg md:text-xl text-secondary-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Il nostro team di esperti è a tua disposizione per fornirti tutte le informazioni di cui hai bisogno sui nostri modelli e sul processo di test drive.
          </p>
          <Link to="/contatti" className="bg-primary hover:bg-primary-dark text-white font-bold py-2 sm:py-3 px-6 sm:px-8 text-sm sm:text-base rounded-lg inline-block transition duration-300">
            Contattaci
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TestDrive;