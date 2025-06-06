import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jobService } from "../services";
import { Button } from "../components/ui";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    nome: "",
    email: "",
    telefono: "",
    messaggio: "",
    cv: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showApplications, setShowApplications] = useState(false);
  const [userApplications, setUserApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [applicationEmail, setApplicationEmail] = useState("");
  const [applicationError, setApplicationError] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Recupera l'email dal localStorage se disponibile
    const savedEmail = localStorage.getItem('jobApplicationEmail');
    if (savedEmail) {
      setApplicationEmail(savedEmail);
      setApplicationForm(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await jobService.getAll();
        setJobs(data || []);
        setLoading(false);
      } catch (err) {
        console.error("Errore nel caricamento delle offerte di lavoro:", err);
        setError(
          "Si è verificato un errore nel caricamento delle offerte di lavoro. Riprova più tardi."
        );
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Aggiorna anche l'email per il controllo delle candidature se necessario
    if (name === 'email') {
      setApplicationEmail(value);
    }
  };
  
  // Funzione per recuperare le candidature dell'utente
  const fetchUserApplications = async () => {
    if (!applicationEmail) {
      setApplicationError('Inserisci un indirizzo email per verificare le tue candidature');
      return;
    }
    
    try {
      setLoadingApplications(true);
      setApplicationError(null);
      
      const applications = await jobService.getUserApplications(applicationEmail);
      setUserApplications(applications);
      setShowApplications(true);
    } catch (err) {
      console.error('Errore nel recupero delle candidature:', err);
      setApplicationError(
        err.response?.data?.message || 'Errore nel recupero delle candidature. Riprova più tardi.'
      );
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleFileChange = (e) => {
    setApplicationForm((prev) => ({
      ...prev,
      cv: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!applicationForm.cv) {
      setSubmitError("Per favore, carica il tuo CV");
      return;
    }

    if (!applicationForm.nome || !applicationForm.email) {
      setSubmitError("Nome ed email sono campi obbligatori");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      // Invia la candidatura
      await jobService.apply(selectedJob._id, applicationForm);

      // Salva l'email nel localStorage per future consultazioni
      localStorage.setItem('jobApplicationEmail', applicationForm.email);

      setSubmitSuccess(true);
      setApplicationForm({
        nome: "",
        email: "",
        telefono: "",
        messaggio: "",
        cv: null,
      });

      // Reset file input
      const fileInput = document.getElementById("cv-upload");
      if (fileInput) fileInput.value = "";

      setTimeout(() => {
        setSelectedJob(null);
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Errore nell'invio della candidatura:", err);
      setSubmitError(
        err.response?.data?.message || "Si è verificato un errore nell'invio della candidatura. Riprova più tardi."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-950 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-950 text-white flex flex-col justify-center items-center p-4">
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
          style={{ backgroundImage: `url('https://cdn.mos.cms.futurecdn.net/nZFBnnTXGWRPzTpHPJy78m-1920-80.jpg.webp')` }}
        ></div>
        <div className="container mx-auto px-4 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Lavora con noi
            </h1>
            <p className="text-lg text-secondary-300">
              Unisciti al nostro team di appassionati e professionisti nel mondo delle auto d'epoca e restomod.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Our Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Il nostro team</h2>
              <p className="text-secondary-300 mb-4">
                In RMI - Restomod Made in Italy, crediamo che le persone siano
                il nostro asset più importante. Siamo un team di appassionati,
                artigiani, ingegneri e designer uniti dalla passione per le auto
                d'epoca italiane e l'innovazione.
              </p>
              <p className="text-secondary-300 mb-4">
                Lavoriamo in un ambiente dinamico e collaborativo, dove ogni
                idea è valorizzata e ogni sfida è un'opportunità per crescere
                insieme. La nostra missione è preservare l'eredità
                automobilistica italiana, reinterpretandola con tecnologie
                moderne.
              </p>
              <p className="text-secondary-300">
                Se condividi la nostra passione e vuoi far parte di un'azienda
                che sta ridefinendo il concetto di restomod, esplora le nostre
                opportunità di carriera.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src="https://cdn.mos.cms.futurecdn.net/xwJvTXaNn3tH7bDdxn4e3V-1600-80.jpg.webp"
                alt="Il nostro team al lavoro"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Perché lavorare con noi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-primary text-secondary-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Innovazione
              </h3>
              <p className="text-secondary-300 text-center">
                Lavora con tecnologie all'avanguardia e contribuisci a progetti
                che ridefiniscono il settore automotive.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-primary text-secondary-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Crescita professionale
              </h3>
              <p className="text-secondary-300 text-center">
                Programmi di formazione continua, mentorship e opportunità di
                avanzamento in un'azienda in rapida crescita.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-primary text-secondary-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Ambiente stimolante
              </h3>
              <p className="text-secondary-300 text-center">
                Cultura aziendale basata sulla collaborazione, il rispetto e la
                passione condivisa per l'eccellenza italiana.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Posizioni aperte
          </h2>

          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              {jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-secondary-800 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {job.titolo}
                        </h3>
                        <p className="text-secondary-400 mb-2">
                          {job.azienda}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-secondary-700 text-primary px-3 py-1 rounded-full text-sm">
                            {job.tipo}
                          </span>
                          <span className="bg-secondary-700 text-white px-3 py-1 rounded-full text-sm">
                            {job.luogo}
                          </span>
                          {job.dipartimento && (
                            <span className="bg-secondary-700 text-white px-3 py-1 rounded-full text-sm">
                              {job.dipartimento}
                            </span>
                          )}
                          {job.salario && (
                            <span className="bg-secondary-700 text-green-400 px-3 py-1 rounded-full text-sm">
                              {job.salario.min.toLocaleString()} - {job.salario.max.toLocaleString()} {job.salario.valuta}/anno
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="bg-primary hover:bg-primary-600 text-secondary-900 font-bold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
                      >
                        Candidati
                      </button>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-bold text-primary mb-2">
                        Descrizione:
                      </h4>
                      <p className="text-secondary-300">{job.descrizione}</p>
                    </div>

                    {job.requisiti && job.requisiti.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-bold text-primary mb-2">
                          Requisiti:
                        </h4>
                        <ul className="list-disc list-inside text-secondary-300 space-y-1">
                          {job.requisiti.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {job.responsabilita && job.responsabilita.length > 0 && (
                      <div>
                        <h4 className="font-bold text-primary mb-2">
                          Responsabilità:
                        </h4>
                        <ul className="list-disc list-inside text-secondary-300 space-y-1">
                          {job.responsabilita.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-secondary-800 rounded-lg max-w-3xl mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-secondary-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h2 className="text-2xl font-bold mb-4">
                Nessuna posizione disponibile
              </h2>
              <p className="text-secondary-300 mb-8 max-w-md mx-auto">
                Al momento non ci sono posizioni aperte. Ti invitiamo a
                controllare più tardi o a inviarci il tuo curriculum per future
                opportunità.
              </p>
              <Link to="/contact">
                <Button variant="primary">Invia il tuo CV</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Perché lavorare con noi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-primary text-secondary-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Innovazione Continua
              </h3>
              <p className="text-secondary-300 text-center">
                Lavoriamo con le tecnologie più all'avanguardia e sviluppiamo
                continuamente nuove soluzioni nel settore automotive.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 bg-primary text-secondary-900 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Crescita professionale
              </h3>
              <p className="text-secondary-300 text-center">
                Programmi di formazione continua, mentorship e opportunità di
                avanzamento in un'azienda in rapida crescita.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 bg-primary text-secondary-900 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Ambiente stimolante
              </h3>
              <p className="text-secondary-300 text-center">
                Cultura aziendale basata sulla collaborazione, il rispetto e la
                passione per l'eccellenza italiana.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Cosa dicono i nostri dipendenti
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-secondary-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary text-secondary-900 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-bold">Alessandro Verdi</h4>
                  <p className="text-secondary-400 text-sm">
                    Ingegnere Meccanico, con noi da 3 anni
                  </p>
                </div>
              </div>
              <p className="text-secondary-300 italic">
                "Lavorare in RMI è stata la scelta migliore della mia carriera.
                Ogni giorno affronto sfide stimolanti e ho l'opportunità di
                contribuire a progetti innovativi che ridefiniscono il concetto
                di auto d'epoca."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary text-secondary-900 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  F
                </div>
                <div>
                  <h4 className="font-bold">Francesca Neri</h4>
                  <p className="text-secondary-400 text-sm">
                    Designer di Interni, con noi da 2 anni
                  </p>
                </div>
              </div>
              <p className="text-secondary-300 italic">
                "L'ambiente di lavoro in RMI è incredibilmente collaborativo. Le
                mie idee vengono sempre ascoltate e apprezzate, e ho la libertà
                creativa di esplorare nuovi concetti di design che rispettano la
                tradizione italiana."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Check Applications Section */}
      <section className="py-16 bg-secondary-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Verifica lo stato delle tue candidature
          </h2>
          
          <div className="max-w-xl mx-auto bg-secondary-800 p-6 rounded-lg shadow-lg">
            {!showApplications ? (
              <div>
                <p className="text-secondary-300 mb-6 text-center">
                  Inserisci l'email che hai utilizzato per candidarti per verificare lo stato delle tue candidature.
                </p>
                
                {applicationError && (
                  <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                    {applicationError}
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    value={applicationEmail}
                    onChange={(e) => setApplicationEmail(e.target.value)}
                    placeholder="La tua email"
                    className="flex-grow bg-secondary-700 border border-secondary-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={fetchUserApplications}
                    disabled={loadingApplications}
                    className="bg-amber-500 hover:bg-amber-600 text-secondary-900 font-bold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingApplications ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-secondary-900 rounded-full mr-2"></div>
                        Caricamento...
                      </div>
                    ) : (
                      "Verifica candidature"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Le tue candidature</h3>
                  <button
                    onClick={() => setShowApplications(false)}
                    className="text-secondary-400 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                
                {userApplications.length === 0 ? (
                  <p className="text-secondary-300 text-center py-4">
                    Non hai ancora inviato candidature con questa email.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {userApplications.map((application) => (
                      <div key={application.candidatura._id} className="bg-secondary-700 p-4 rounded-lg">
                        <h4 className="font-bold text-lg mb-1">{application.job.titolo}</h4>
                        <p className="text-sm text-secondary-400 mb-1">{application.job.azienda}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-sm text-secondary-400">{application.job.tipo} - {application.job.luogo}</span>
                          {application.job.salario && (
                            <span className="text-sm text-green-400">
                              {application.job.salario.min.toLocaleString()} - {application.job.salario.max.toLocaleString()} {application.job.salario.valuta}/anno
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div>
                            <span className="text-sm text-secondary-400">Stato: </span>
                            <span className={`text-sm font-medium ${
                              application.candidatura.stato === 'ricevuta' ? 'text-blue-400' :
                              application.candidatura.stato === 'in_revisione' ? 'text-yellow-400' :
                              application.candidatura.stato === 'colloquio' ? 'text-purple-400' :
                              application.candidatura.stato === 'accettata' ? 'text-green-400' :
                              'text-red-400'
                            }`}>
                              {application.candidatura.stato === 'ricevuta' ? 'Ricevuta' :
                               application.candidatura.stato === 'in_revisione' ? 'In revisione' :
                               application.candidatura.stato === 'colloquio' ? 'Colloquio' :
                               application.candidatura.stato === 'accettata' ? 'Accettata' :
                               'Rifiutata'}
                            </span>
                          </div>
                          <span className="text-xs text-secondary-400">
                            {new Date(application.candidatura.dataInvio).toLocaleDateString('it-IT')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Application Process Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-secondary-800">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 text-center">
            Il nostro processo di selezione
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 sm:left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary"></div>

              {/* Timeline Items */}
              <div className="space-y-8 sm:space-y-10 md:space-y-12">
                {/* Step 1 */}
                <div className="relative">
                  <div className="flex flex-col sm:flex-row md:flex-row items-start sm:items-center md:items-center">
                    <div className="flex-1 md:text-right sm:pr-6 md:pr-8 mb-4 sm:mb-0 md:mb-0 pl-12 sm:pl-0">
                      <h3 className="text-lg sm:text-xl font-bold">Candidatura</h3>
                      <p className="text-secondary-300 mt-1 sm:mt-2 text-sm sm:text-base">
                        Invia il tuo CV e lettera di presentazione attraverso il
                        nostro portale carriere o via email.
                      </p>
                    </div>
                    <div className="z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-primary text-secondary-900 rounded-full flex items-center justify-center font-bold absolute left-0 sm:relative sm:mx-3 md:mx-4 top-0 sm:top-auto">
                      1
                    </div>
                    <div className="flex-1 md:pl-8 sm:pl-6 md:block sm:block hidden"></div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="flex flex-col sm:flex-row md:flex-row items-start sm:items-center md:items-center">
                    <div className="flex-1 md:text-right sm:text-right sm:pr-6 md:pr-8 mb-4 sm:mb-0 md:mb-0 md:block sm:block hidden"></div>
                    <div className="z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-primary text-secondary-900 rounded-full flex items-center justify-center font-bold absolute left-0 sm:relative sm:mx-3 md:mx-4 top-0 sm:top-auto">
                      2
                    </div>
                    <div className="flex-1 md:pl-8 sm:pl-6 pl-12 sm:pl-6">
                      <h3 className="text-lg sm:text-xl font-bold">Screening Iniziale</h3>
                      <p className="text-secondary-300 mt-1 sm:mt-2 text-sm sm:text-base">
                        Il nostro team HR esaminerà la tua candidatura e ti
                        contatterà per un primo colloquio telefonico.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="flex flex-col sm:flex-row md:flex-row items-start sm:items-center md:items-center">
                    <div className="flex-1 md:text-right sm:text-right sm:pr-6 md:pr-8 mb-4 sm:mb-0 md:mb-0 pl-12 sm:pl-0">
                      <h3 className="text-lg sm:text-xl font-bold">Colloquio Tecnico</h3>
                      <p className="text-secondary-300 mt-1 sm:mt-2 text-sm sm:text-base">
                        Se selezionato, parteciperai a un colloquio tecnico con
                        il team del dipartimento di riferimento.
                      </p>
                    </div>
                    <div className="z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-primary text-secondary-900 rounded-full flex items-center justify-center font-bold absolute left-0 sm:relative sm:mx-3 md:mx-4 top-0 sm:top-auto">
                      3
                    </div>
                    <div className="flex-1 md:pl-8 sm:pl-6 md:block sm:block hidden"></div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="flex flex-col sm:flex-row md:flex-row items-start sm:items-center md:items-center">
                    <div className="flex-1 md:text-right sm:text-right sm:pr-6 md:pr-8 mb-4 sm:mb-0 md:mb-0 md:block sm:block hidden"></div>
                    <div className="z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-primary text-secondary-900 rounded-full flex items-center justify-center font-bold absolute left-0 sm:relative sm:mx-3 md:mx-4 top-0 sm:top-auto">
                      4
                    </div>
                    <div className="flex-1 md:pl-8 sm:pl-6 pl-12 sm:pl-6">
                      <h3 className="text-lg sm:text-xl font-bold">Offerta</h3>
                      <p className="text-secondary-300 mt-1 sm:mt-2 text-sm sm:text-base">
                        Se il processo va a buon fine, riceverai un'offerta
                        dettagliata con tutti i benefici e le condizioni di
                        lavoro.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Non vedi una posizione adatta a te?
          </h2>
          <p className="text-secondary-300 mb-8 max-w-2xl mx-auto">
            Siamo sempre alla ricerca di talenti eccezionali. Inviaci il tuo
            curriculum e una lettera di presentazione, e ti contatteremo quando
            avremo un'opportunità adatta al tuo profilo.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg">
              Invia candidatura spontanea
            </Button>
          </Link>
        </div>
      </section>

      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-secondary-800 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Candidatura inviata!
                </h3>
                <p className="text-secondary-300 mb-6">
                  Grazie per la tua candidatura. Ti contatteremo presto per
                  discutere delle prossime fasi.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">
                    Candidatura per: {selectedJob.titolo}
                  </h3>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="text-secondary-400 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {submitError && (
                  <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-secondary-300 mb-1"
                    >
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={applicationForm.nome}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-secondary-700 border border-secondary-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-secondary-300 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={applicationForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-secondary-700 border border-secondary-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="telefono"
                      className="block text-sm font-medium text-secondary-300 mb-1"
                    >
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={applicationForm.telefono}
                      onChange={handleInputChange}
                      className="w-full bg-secondary-700 border border-secondary-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="messaggio"
                      className="block text-sm font-medium text-secondary-300 mb-1"
                    >
                      Lettera di presentazione
                    </label>
                    <textarea
                      id="messaggio"
                      name="messaggio"
                      value={applicationForm.messaggio}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full bg-secondary-700 border border-secondary-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="cv-upload"
                      className="block text-sm font-medium text-secondary-300 mb-1"
                    >
                      Carica CV (PDF, DOC, DOCX) *
                    </label>
                    <input
                      type="file"
                      id="cv-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className="w-full bg-secondary-700 border border-secondary-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-secondary-900 hover:file:bg-amber-600"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="bg-secondary-700 hover:bg-secondary-600 text-white font-bold py-2 px-4 rounded-lg mr-2"
                    >
                      Annulla
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-amber-500 hover:bg-amber-600 text-secondary-900 font-bold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-secondary-900 rounded-full mr-2"></div>
                          Invio...
                        </div>
                      ) : (
                        "Invia candidatura"
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
