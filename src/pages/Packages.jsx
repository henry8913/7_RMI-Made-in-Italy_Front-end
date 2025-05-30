import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { packageService } from "../services";
import { Button } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";

const Packages = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasing, setPurchasing] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const data = await packageService.getAll();
        setPackages(data || []);
        setLoading(false);
      } catch (err) {
        console.error("Errore nel caricamento dei pacchetti:", err);
        setError(
          "Si è verificato un errore nel caricamento dei pacchetti. Riprova più tardi."
        );
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handlePurchase = async (packageId) => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: "/packages" } });
      return;
    }

    try {
      setPurchasing(packageId);
      
      // Trova il pacchetto selezionato
      const selectedPackage = packages.find(pkg => pkg._id === packageId);
      
      if (selectedPackage) {
        // Naviga alla pagina di dettaglio del pacchetto
        navigate(`/packages/${packageId}`);
      } else {
        throw new Error("Pacchetto non trovato");
      }
    } catch (err) {
      console.error("Errore nell'acquisto del pacchetto:", err);
      alert(
        "Si è verificato un errore nell'acquisto del pacchetto. Riprova più tardi."
      );
      setPurchasing(null);
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
          style={{ backgroundImage: `url('/images/packages-hero.jpg')` }}
        ></div>
        <div className="container mx-auto px-4 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Pacchetti Servizi
            </h1>
            <p className="text-lg text-secondary-300">
              Scopri i nostri pacchetti esclusivi per prenderti cura della tua
              auto restomod.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-secondary-800 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col"
                >
                  {pkg.immagine && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={pkg.immagine} 
                        alt={pkg.nome} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 border-b border-secondary-700">
                    <h3 className="text-2xl font-bold mb-2 text-center">
                      {pkg.nome}
                    </h3>
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-primary">
                        €{pkg.prezzo.toLocaleString("it-IT")}
                      </span>
                      {pkg.durata && (
                        <span className="text-secondary-400 ml-2">
                          / {pkg.durata}
                        </span>
                      )}
                    </div>
                    <p className="text-secondary-300 text-center">
                      {pkg.descrizione}
                    </p>
                  </div>

                  <div className="p-6 flex-grow">
                    <h4 className="font-bold mb-4 text-primary">
                      Caratteristiche:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.caratteristiche &&
                        pkg.caratteristiche.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="p-6 border-t border-secondary-700">
                    <button
                      onClick={() => handlePurchase(pkg._id)}
                      disabled={purchasing === pkg._id}
                      className="w-full bg-primary hover:bg-primary-600 text-secondary-900 font-bold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {purchasing === pkg._id ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-secondary-900 rounded-full mr-2"></div>
                          Elaborazione...
                        </div>
                      ) : (
                        "Scopri di più"
                      )}
                    </button>
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
                Nessun pacchetto disponibile
              </h2>
              <p className="text-secondary-300 mb-8 max-w-md mx-auto">
                Al momento non ci sono pacchetti disponibili. Ti invitiamo a
                controllare più tardi o a contattarci per informazioni
                personalizzate.
              </p>
              <Link to="/contact">
                <Button variant="primary">Contattaci</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Perché scegliere i nostri pacchetti
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Assistenza Premium
              </h3>
              <p className="text-secondary-300 text-center">
                Accesso prioritario al nostro team di esperti per qualsiasi
                necessità o emergenza, 24/7.
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Manutenzione Programmata
              </h3>
              <p className="text-secondary-300 text-center">
                Interventi regolari per mantenere la tua auto in condizioni
                ottimali, prevenendo problemi futuri.
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">
                Risparmio Garantito
              </h3>
              <p className="text-secondary-300 text-center">
                I nostri pacchetti offrono un risparmio significativo rispetto
                ai servizi acquistati singolarmente.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Cosa dicono i nostri clienti
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
                  M
                </div>
                <div>
                  <h4 className="font-bold">Marco Bianchi</h4>
                  <p className="text-secondary-400 text-sm">
                    Proprietario di Alfa Romeo Giulia GT Restomod
                  </p>
                </div>
              </div>
              <p className="text-secondary-300 italic">
                "Il pacchetto Premium è stato un investimento eccellente. La
                manutenzione programmata ha mantenuto la mia Giulia in
                condizioni perfette e il supporto tecnico è sempre stato
                impeccabile."
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
                  L
                </div>
                <div>
                  <h4 className="font-bold">Laura Rossi</h4>
                  <p className="text-secondary-400 text-sm">
                    Proprietaria di Lancia Delta Integrale Restomod
                  </p>
                </div>
              </div>
              <p className="text-secondary-300 italic">
                "L'assistenza 24/7 inclusa nel pacchetto mi ha salvata durante
                un viaggio all'estero. Un tecnico è stato in grado di guidarmi
                telefonicamente per risolvere un problema elettrico minore."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Domande frequenti
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-secondary-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                Posso annullare un pacchetto dopo l'acquisto?
              </h3>
              <p className="text-secondary-300">
                Sì, è possibile annullare un pacchetto entro 14 giorni
                dall'acquisto per un rimborso completo. Dopo questo periodo,
                offriamo rimborsi parziali in base al tempo rimanente e ai
                servizi già utilizzati.
              </p>
            </div>

            <div className="bg-secondary-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                I pacchetti sono trasferibili ad un altro veicolo?
              </h3>
              <p className="text-secondary-300">
                I pacchetti sono associati a un veicolo specifico al momento
                dell'acquisto. Tuttavia, in caso di vendita o sostituzione del
                veicolo, è possibile richiedere il trasferimento del pacchetto
                al nuovo veicolo, soggetto a valutazione tecnica.
              </p>
            </div>

            <div className="bg-secondary-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                Dove posso usufruire dei servizi inclusi nei pacchetti?
              </h3>
              <p className="text-secondary-300">
                I servizi possono essere utilizzati presso tutte le nostre
                officine autorizzate in Italia. Per i clienti con pacchetti
                Premium, offriamo anche assistenza a domicilio in determinate
                aree geografiche.
              </p>
            </div>

            <div className="bg-secondary-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">
                È possibile personalizzare un pacchetto?
              </h3>
              <p className="text-secondary-300">
                Certamente! Offriamo la possibilità di personalizzare i
                pacchetti in base alle tue esigenze specifiche. Contattaci per
                discutere delle opzioni disponibili e ricevere un preventivo
                personalizzato.
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

export default Packages;
