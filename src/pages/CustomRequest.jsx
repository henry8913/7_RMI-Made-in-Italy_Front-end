import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { customRequestService, restomodService } from "../services";
import { Button } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";

const CustomRequest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modelIdFromUrl = searchParams.get('modelId');
  const { user, isAuthenticated } = useAuth();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form state
  const [baseModel, setBaseModel] = useState(modelIdFromUrl || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [files, setFiles] = useState([]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const data = await restomodService.getAll();
        setModels(Array.isArray(data) ? data : data.restomods || []);
        setLoading(false);
      } catch (err) {
        console.error("Errore nel caricamento dei modelli:", err);
        setError(
          "Si è verificato un errore nel caricamento dei modelli. Riprova più tardi."
        );
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/custom-request" } });
      return;
    }

    // Validazione dei campi obbligatori
    if (!title || !description || !budget || !contactName || !contactEmail || !contactPhone) {
      setError("Compila tutti i campi obbligatori");
      return;
    }

    try {
      setSubmitting(true);

      // Preparazione dei dati per l'invio
      const requestData = {
        modelloBase: baseModel || undefined,
        titolo: title,
        descrizione: description,
        budget: Number(budget),
        tempistiche: timeframe,
        contatto: {
          nome: contactName,
          email: contactEmail,
          telefono: contactPhone
        }
      };

      // Se ci sono file, li gestiamo con FormData
      if (files.length > 0) {
        const formData = new FormData();
        
        // Aggiungiamo i dati JSON come stringa
        formData.append('data', JSON.stringify(requestData));
        
        // Aggiungiamo i file
        files.forEach((file) => {
          formData.append("allegati", file);
        });
        
        await customRequestService.create(formData);
      } else {
        // Se non ci sono file, inviamo direttamente i dati JSON
        await customRequestService.create(requestData);
      }

      setSuccess(true);
      // Reset form
      setBaseModel("");
      setTitle("");
      setDescription("");
      setBudget("");
      setTimeframe("");
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setFiles([]);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Errore nell'invio della richiesta personalizzata:", err);
      setError(
        "Si è verificato un errore nell'invio della richiesta. Riprova più tardi."
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

  return (
    <div className="min-h-screen bg-secondary-950 text-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950 to-secondary-950 z-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/custom-request-hero.jpg')` }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30 mt-10 sm:mt-14 md:mt-18">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto px-4 sm:px-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">
              Richiesta Personalizzata
            </h1>
            <p className="text-base sm:text-lg text-secondary-300 max-w-2xl mx-auto">
              Crea l'auto dei tuoi sogni. Inviaci la tua idea e realizzeremo un
              restomod su misura per te.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-800 text-white p-3 sm:p-4 rounded-lg max-w-3xl mx-auto mt-6 sm:mt-8 mx-4 sm:mx-auto"
        >
          <div className="flex items-start sm:items-center flex-col sm:flex-row sm:space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 mr-2 mt-1 sm:mt-0 flex-shrink-0"
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
            <div>
              <h3 className="font-bold text-base sm:text-lg">Richiesta inviata con successo!</h3>
              <p className="text-sm sm:text-base mt-1">
                La tua richiesta personalizzata è stata inviata. Ti contatteremo
                presto per discutere i dettagli del tuo progetto.
              </p>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 text-center">
            <Link to="/profile">
              <Button variant="secondary" size="sm" className="text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4">
                Visualizza le tue richieste
              </Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-800 text-white p-3 sm:p-4 rounded-lg max-w-3xl mx-auto mt-6 sm:mt-8 mx-4 sm:mx-auto"
        >
          <div className="flex items-start sm:items-center flex-col sm:flex-row sm:space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 mr-2 mt-1 sm:mt-0 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Si è verificato un errore</h3>
              <p className="text-sm sm:text-base mt-1">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Request Form */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-secondary-800 rounded-lg p-4 sm:p-6 md:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Invia la tua richiesta personalizzata
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 sm:mb-6">
                <label htmlFor="baseModel" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base">
                  Modello base (opzionale)
                </label>
                <select
                  id="baseModel"
                  value={baseModel}
                  onChange={(e) => setBaseModel(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                >
                  <option value="">
                    Seleziona un modello base (opzionale)
                  </option>
                  {models.map((model) => (
                    <option key={model._id} value={model._id}>
                      {model.costruttore && model.costruttore.nome ? model.costruttore.nome : ''} {model.nome} - {model.anno}
                    </option>
                  ))}
                </select>
                <p className="text-xs sm:text-sm text-secondary-400 mt-1">
                  Seleziona un modello esistente come punto di partenza o lascia
                  vuoto per un progetto completamente personalizzato
                </p>
              </div>

              <div className="mb-4 sm:mb-6">
                <label htmlFor="title" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base">
                  Titolo del progetto*
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                  placeholder="Es. Alfa Romeo Giulia GT restomod personalizzata"
                  required
                />
              </div>

              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="description"
                  className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base"
                >
                  Descrizione del progetto*
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none min-h-[150px] sm:min-h-[200px] text-sm sm:text-base"
                  placeholder="Descrivi in dettaglio il tuo progetto ideale. Includi informazioni su motore, interni, esterni, colore, prestazioni desiderate e qualsiasi altra specifica importante."
                  required
                ></textarea>
              </div>

              <div className="mb-4 sm:mb-6">
                <label htmlFor="budget" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base">
                  Budget indicativo (€)*
                </label>
                <input
                  type="number"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                  placeholder="Es. 150000"
                  min="50000"
                  required
                />
                <p className="text-xs sm:text-sm text-secondary-400 mt-1">
                  Indica un budget approssimativo per il tuo progetto (minimo
                  €50.000)
                </p>
              </div>

              <div className="mb-4 sm:mb-6">
                <label htmlFor="timeframe" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base">
                  Tempistiche desiderate*
                </label>
                <input
                  type="text"
                  id="timeframe"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                  placeholder="Es. entro 6 mesi, entro fine anno"
                  required
                />
                <p className="text-xs sm:text-sm text-secondary-400 mt-1">
                  Indica quando vorresti che il progetto fosse completato
                </p>
              </div>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-secondary-300">Informazioni di contatto*</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <label htmlFor="contactName" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base">
                      Nome completo*
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2 sm:p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                      placeholder="Es. Mario Rossi"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contactEmail" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full p-2 sm:p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                      placeholder="Es. mario.rossi@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base">
                    Telefono*
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-2 sm:p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                    placeholder="Es. +39 123 456 7890"
                    required
                  />
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <label htmlFor="files" className="block text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base">
                  Allegati (opzionale)
                </label>
                <div className="border-2 border-dashed border-secondary-600 rounded-lg p-3 sm:p-4 text-center">
                  <input
                    type="file"
                    id="files"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    accept="image/*,.pdf"
                  />
                  <label
                    htmlFor="files"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 sm:h-10 sm:w-10 text-secondary-400 mb-1 sm:mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-secondary-300 mb-1 sm:mb-2 text-sm sm:text-base">
                      Trascina qui i tuoi file o clicca per selezionarli
                    </span>
                    <span className="text-xs sm:text-sm text-secondary-400">
                      Immagini, schizzi, PDF (max 5 file, 10MB ciascuno)
                    </span>
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-1 sm:mt-2">
                    <p className="text-xs sm:text-sm text-secondary-300 mb-1">
                      File selezionati:
                    </p>
                    <ul className="text-xs sm:text-sm text-secondary-400">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-400"
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
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                          MB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg"
                  disabled={submitting || !isAuthenticated}
                >
                  {submitting ? "Invio in corso..." : "Invia richiesta"}
                </Button>
              </div>

              {!isAuthenticated && (
                <p className="text-center mt-3 sm:mt-4 text-amber-400 text-xs sm:text-sm md:text-base">
                  Devi essere registrato per inviare una richiesta
                  personalizzata.
                  <Link to="/login" className="underline ml-1">
                    Accedi o registrati
                  </Link>
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-secondary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">
            Il processo di personalizzazione
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary-900 p-4 sm:p-5 md:p-6 rounded-lg shadow-lg relative"
            >
              <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500 flex items-center justify-center text-secondary-900 font-bold text-lg sm:text-xl">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 mt-1 sm:mt-2">Richiesta</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                Inviaci la tua idea compilando il modulo. Descrivi il tuo
                progetto ideale con tutti i dettagli che desideri.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-900 p-4 sm:p-5 md:p-6 rounded-lg shadow-lg relative"
            >
              <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500 flex items-center justify-center text-secondary-900 font-bold text-lg sm:text-xl">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 mt-1 sm:mt-2">Consulenza</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                I nostri esperti ti contatteranno per discutere i dettagli,
                consigliarti sulle opzioni e definire le specifiche tecniche.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary-900 p-4 sm:p-5 md:p-6 rounded-lg shadow-lg relative"
            >
              <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500 flex items-center justify-center text-secondary-900 font-bold text-lg sm:text-xl">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 mt-1 sm:mt-2">Progettazione</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                Creiamo un progetto dettagliato con rendering 3D, specifiche
                tecniche e un preventivo preciso per la tua approvazione.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-secondary-900 p-4 sm:p-5 md:p-6 rounded-lg shadow-lg relative"
            >
              <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500 flex items-center justify-center text-secondary-900 font-bold text-lg sm:text-xl">
                4
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 mt-1 sm:mt-2">Realizzazione</h3>
              <p className="text-secondary-300 text-sm sm:text-base">
                Una volta approvato il progetto, i nostri artigiani iniziano la
                costruzione del tuo restomod personalizzato, tenendoti aggiornato
                durante tutto il processo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomRequest;
