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
  const [files, setFiles] = useState([]);

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
      navigate("/auth", { state: { from: "/custom-request" } });
      return;
    }

    try {
      setSubmitting(true);

      // Create form data for file upload
      const formData = new FormData();
      formData.append("modelloBase", baseModel);
      formData.append("titolo", title);
      formData.append("descrizione", description);
      formData.append("budget", budget);

      // Append files if any
      files.forEach((file) => {
        formData.append("allegati", file);
      });

      await customRequestService.create(formData);

      setSuccess(true);
      // Reset form
      setBaseModel("");
      setTitle("");
      setDescription("");
      setBudget("");
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
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950 to-secondary-950 z-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/custom-request-hero.jpg')` }}
        ></div>
        <div className="container mx-auto px-4 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Richiesta Personalizzata
            </h1>
            <p className="text-lg text-secondary-300">
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
          className="bg-green-800 text-white p-4 rounded-lg max-w-3xl mx-auto mt-8"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
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
              <h3 className="font-bold">Richiesta inviata con successo!</h3>
              <p>
                La tua richiesta personalizzata è stata inviata. Ti contatteremo
                presto per discutere i dettagli del tuo progetto.
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link to="/profile">
              <Button variant="secondary" size="sm">
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
          className="bg-red-800 text-white p-4 rounded-lg max-w-3xl mx-auto mt-8"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
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
              <h3 className="font-bold">Si è verificato un errore</h3>
              <p>{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Request Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-secondary-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              Invia la tua richiesta personalizzata
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="baseModel" className="block text-secondary-300 mb-2">
                  Modello base (opzionale)
                </label>
                <select
                  id="baseModel"
                  value={baseModel}
                  onChange={(e) => setBaseModel(e.target.value)}
                  className="w-full p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                <p className="text-sm text-secondary-400 mt-1">
                  Seleziona un modello esistente come punto di partenza o lascia
                  vuoto per un progetto completamente personalizzato
                </p>
              </div>

              <div className="mb-6">
                <label htmlFor="title" className="block text-secondary-300 mb-2">
                  Titolo del progetto*
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Es. Alfa Romeo Giulia GT restomod personalizzata"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-secondary-300 mb-2"
                >
                  Descrizione del progetto*
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none min-h-[200px]"
                  placeholder="Descrivi in dettaglio il tuo progetto ideale. Includi informazioni su motore, interni, esterni, colore, prestazioni desiderate e qualsiasi altra specifica importante."
                  required
                ></textarea>
              </div>

              <div className="mb-6">
                <label htmlFor="budget" className="block text-secondary-300 mb-2">
                  Budget indicativo (€)*
                </label>
                <input
                  type="number"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-3 rounded-lg bg-secondary-700 text-white border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Es. 150000"
                  min="50000"
                  required
                />
                <p className="text-sm text-secondary-400 mt-1">
                  Indica un budget approssimativo per il tuo progetto (minimo
                  €50.000)
                </p>
              </div>

              <div className="mb-8">
                <label htmlFor="files" className="block text-secondary-300 mb-2">
                  Allegati (opzionale)
                </label>
                <div className="border-2 border-dashed border-secondary-600 rounded-lg p-4 text-center">
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
                      className="h-10 w-10 text-secondary-400 mb-2"
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
                    <span className="text-secondary-300 mb-2">
                      Trascina qui i tuoi file o clicca per selezionarli
                    </span>
                    <span className="text-sm text-secondary-400">
                      Immagini, schizzi, PDF (max 5 file, 10MB ciascuno)
                    </span>
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-secondary-300 mb-1">
                      File selezionati:
                    </p>
                    <ul className="text-sm text-secondary-400">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1 text-green-400"
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
                  className="px-8 py-3 text-lg"
                  disabled={submitting || !isAuthenticated}
                >
                  {submitting ? "Invio in corso..." : "Invia richiesta"}
                </Button>
              </div>

              {!isAuthenticated && (
                <p className="text-center mt-4 text-amber-400">
                  Devi essere registrato per inviare una richiesta
                  personalizzata.
                  <Link to="/auth" className="underline ml-1">
                    Accedi o registrati
                  </Link>
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-secondary-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Il processo di personalizzazione
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg relative"
            >
              <div className="w-12 h-12 bg-amber-500 text-secondary-900 rounded-full flex items-center justify-center mb-4 font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Richiesta</h3>
              <p className="text-secondary-300">
                Invia la tua richiesta dettagliata con tutte le specifiche
                desiderate per il tuo restomod personalizzato.
              </p>
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg relative"
            >
              <div className="w-12 h-12 bg-amber-500 text-secondary-900 rounded-full flex items-center justify-center mb-4 font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Consulenza</h3>
              <p className="text-secondary-300">
                I nostri esperti ti contatteranno per discutere i dettagli,
                fornire consigli e definire il progetto finale.
              </p>
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg relative"
            >
              <div className="w-12 h-12 bg-amber-500 text-secondary-900 rounded-full flex items-center justify-center mb-4 font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Realizzazione</h3>
              <p className="text-secondary-300">
                Una volta approvato il progetto, i nostri artigiani inizieranno
                a lavorare sulla tua auto personalizzata.
              </p>
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg"
            >
              <div className="w-12 h-12 bg-amber-500 text-secondary-900 rounded-full flex items-center justify-center mb-4 font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Consegna</h3>
              <p className="text-secondary-300">
                Ricevi la tua auto personalizzata, pronta per essere guidata e
                ammirata, con garanzia e assistenza post-vendita.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Progetti personalizzati realizzati
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* These would be actual custom projects, using placeholders for now */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src="/images/custom-project-1.jpg"
                alt="Progetto personalizzato"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-xl font-bold">
                    Alfa Romeo Giulia GT Elettrica
                  </h3>
                  <p className="text-secondary-300">
                    Restomod elettrico con 400 CV e interni in pelle artigianale
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src="/images/custom-project-2.jpg"
                alt="Progetto personalizzato"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-xl font-bold">
                    Lancia Delta Integrale Evoluzione
                  </h3>
                  <p className="text-secondary-300">
                    Motore potenziato a 350 CV con sospensioni regolabili e
                    interni racing
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src="/images/custom-project-3.jpg"
                alt="Progetto personalizzato"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-xl font-bold">Fiat 124 Spider Moderna</h3>
                  <p className="text-secondary-300">
                    Restomod con motore turbo da 280 CV e tecnologia di
                    infotainment avanzata
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Domande frequenti
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-secondary-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                Quanto tempo richiede la realizzazione di un progetto
                personalizzato?
              </h3>
              <p className="text-secondary-300">
                I tempi di realizzazione variano in base alla complessità del
                progetto, ma generalmente un restomod personalizzato richiede da
                8 a 18 mesi per essere completato.
              </p>
            </div>

            <div className="bg-secondary-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                Posso richiedere modifiche durante il processo di realizzazione?
              </h3>
              <p className="text-secondary-300">
                Sì, è possibile richiedere modifiche durante le fasi iniziali
                del progetto. Una volta che la produzione è avanzata, le
                modifiche potrebbero comportare costi aggiuntivi e ritardi nella
                consegna.
              </p>
            </div>

            <div className="bg-secondary-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                Quali garanzie offrite sui progetti personalizzati?
              </h3>
              <p className="text-secondary-300">
                Tutti i nostri progetti personalizzati sono coperti da una
                garanzia di 2 anni su componenti meccanici e elettrici, e 5 anni
                sulla carrozzeria. Offriamo inoltre assistenza post-vendita
                dedicata.
              </p>
            </div>

            <div className="bg-secondary-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                Posso utilizzare la mia auto come base per il progetto?
              </h3>
              <p className="text-secondary-300">
                Certamente! Puoi fornire la tua auto come base per il progetto.
                I nostri esperti valuteranno le condizioni del veicolo e ti
                consiglieranno sulle migliori opzioni di personalizzazione.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Hai altre domande?</h2>
          <p className="text-xl text-secondary-300 mb-8 max-w-2xl mx-auto">
            Il nostro team è a tua disposizione per fornirti tutte le
            informazioni di cui hai bisogno.
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

export default CustomRequest;
