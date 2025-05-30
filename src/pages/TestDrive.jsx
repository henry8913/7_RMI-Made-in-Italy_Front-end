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
      navigate('/auth', { state: { from: '/test-drive' } });
      return;
    }

    if (!selectedModel || !date || !time || !location) {
      alert('Per favore, compila tutti i campi richiesti.');
      return;
    }

    try {
      setSubmitting(true);
      await testDriveService.bookTestDrive({
        modello: selectedModel,
        data: date,
        ora: time,
        luogo: location
      });
      
      setSuccess(true);
      // Reset form
      setSelectedModel('');
      setDate('');
      setTime('');
      setLocation('');
      
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
    <div className="min-h-screen bg-secondary-950 text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary-950 z-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('/images/test-drive-hero.jpg')` }}
        ></div>
        <div className="container mx-auto px-4 relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Prenota un Test Drive</h1>
            <p className="text-lg text-secondary-300">
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
          className="bg-green-800 text-white p-4 rounded-lg max-w-3xl mx-auto mt-8"
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="font-bold">Prenotazione confermata!</h3>
              <p>La tua richiesta di test drive è stata inviata con successo. Riceverai presto una email di conferma con tutti i dettagli.</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link to="/profile">
              <Button variant="secondary" size="sm">Visualizza le tue prenotazioni</Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-secondary-900/50 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Prenota la tua esperienza di guida</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="model" className="block text-secondary-300 mb-2">Seleziona un modello*</label>
                <select
                  id="model"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full p-3 rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary"
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

              <div className="mb-6">
                <label htmlFor="date" className="block text-secondary-300 mb-2">Seleziona una data*</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={tomorrowFormatted}
                  max={threeMonthsLaterFormatted}
                  className="w-full p-3 rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <p className="text-sm text-secondary-400 mt-1">Le prenotazioni sono disponibili fino a 3 mesi in anticipo</p>
              </div>

              <div className="mb-6">
                <label htmlFor="time" className="block text-secondary-300 mb-2">Seleziona un orario*</label>
                <select
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary"
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
                  <p className="text-sm text-primary mt-1">Seleziona prima un modello e una data</p>
                )}
              </div>

              <div className="mb-8">
                <label htmlFor="location" className="block text-secondary-300 mb-2">Seleziona una sede*</label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 rounded-lg bg-secondary-800 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary"
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

              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="px-8 py-3 text-lg"
                  disabled={submitting || !isAuthenticated}
                >
                  {submitting ? 'Invio in corso...' : 'Prenota ora'}
                </Button>
              </div>

              {!isAuthenticated && (
                <p className="text-center mt-4 text-primary">
                  Devi essere registrato per prenotare un test drive. 
                  <Link to="/auth" className="underline ml-1">Accedi o registrati</Link>
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Why Book a Test Drive */}
      <section className="py-16 bg-secondary-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Perché prenotare un test drive</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary-950 p-6 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Esperienza Unica</h3>
              <p className="text-secondary-300 text-center">
                Prova l'emozione di guidare un'auto d'epoca con prestazioni moderne in un'esperienza che unisce il fascino del passato con la tecnologia del presente.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-950 p-6 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Assistenza Professionale</h3>
              <p className="text-secondary-300 text-center">
                I nostri esperti ti guideranno durante tutto il test drive, spiegandoti le caratteristiche uniche del modello e rispondendo a tutte le tue domande.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary-950 p-6 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Nessun Impegno</h3>
              <p className="text-secondary-300 text-center">
                Il test drive è gratuito e senza impegno. È un'opportunità per conoscere meglio i nostri modelli prima di prendere una decisione d'acquisto.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Domande Frequenti</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-secondary-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Quanto dura un test drive?</h3>
              <p className="text-secondary-300">
                Un test drive standard dura circa 30-45 minuti, inclusa una breve introduzione al veicolo e alle sue caratteristiche uniche.
              </p>
            </div>
            
            <div className="bg-secondary-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Devo portare qualcosa con me?</h3>
              <p className="text-secondary-300">
                Sì, è necessario portare con sé una patente di guida valida e in corso di validità. Ti consigliamo anche di indossare scarpe comode per la guida.
              </p>
            </div>
            
            <div className="bg-secondary-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Posso portare un accompagnatore?</h3>
              <p className="text-secondary-300">
                Certamente! Puoi portare un accompagnatore che potrà sedersi nel sedile del passeggero durante il test drive, a seconda del modello scelto.
              </p>
            </div>
            
            <div className="bg-secondary-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Cosa succede se devo annullare la prenotazione?</h3>
              <p className="text-secondary-300">
                Puoi annullare o riprogrammare il tuo test drive fino a 24 ore prima dell'orario prenotato senza alcuna penalità, direttamente dalla tua area personale.
              </p>
            </div>
            
            <div className="bg-secondary-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Il test drive è gratuito?</h3>
              <p className="text-secondary-300">
                Sì, il test drive è completamente gratuito e senza impegno. È un'opportunità per conoscere meglio i nostri modelli restomod.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Hai altre domande?</h2>
          <p className="text-xl text-secondary-300 mb-8 max-w-2xl mx-auto">
            Il nostro team è a tua disposizione per fornirti tutte le informazioni di cui hai bisogno.
          </p>
          <Link to="/contact">
            <Button variant="primary" className="px-8 py-3 text-lg">
              Contattaci
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TestDrive;