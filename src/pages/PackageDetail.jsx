import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { packageService } from "../services";
import { Button } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);
        const data = await packageService.getById(id);
        setPackageData(data);
        setLoading(false);
      } catch (err) {
        console.error("Errore nel caricamento del pacchetto:", err);
        setError(
          "Si è verificato un errore nel caricamento del pacchetto. Riprova più tardi."
        );
        setLoading(false);
      }
    };

    if (id) {
      fetchPackage();
    }
  }, [id]);

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: `/packages/${id}` } });
      return;
    }

    try {
      setPurchasing(true);
      
      // Aggiungi il pacchetto al carrello
      const cartItem = {
        id: packageData._id,
        type: 'Package',
        name: packageData.nome,
        price: packageData.prezzo,
        image: packageData.immagine,
        duration: packageData.durata,
        features: packageData.caratteristiche ? packageData.caratteristiche.slice(0, 3) : []
      };
      
      addToCart(cartItem);
      toast.success("Pacchetto aggiunto al carrello!");
      
      // Redirect al carrello
      setTimeout(() => {
        setPurchasing(false);
        navigate("/cart");
      }, 500);
    } catch (err) {
      console.error("Errore nell'aggiunta del pacchetto al carrello:", err);
      toast.error(
        "Si è verificato un errore nell'aggiunta del pacchetto al carrello. Riprova più tardi."
      );
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-900 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="min-h-screen bg-secondary-900 text-white flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl font-bold mb-4">Errore</h2>
        <p className="text-secondary-300 mb-8">{error || "Pacchetto non trovato"}</p>
        <Link to="/packages">
          <Button variant="primary">Torna ai pacchetti</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-900 text-white pt-16 sm:pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 overflow-hidden"> 
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary-950 z-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: packageData.immagine ? `url('${packageData.immagine}')` : `url('/images/package-detail-hero.jpg')` }}
        ></div>
        <div className="container mx-auto px-4 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {packageData.nome}
            </h1>
            <p className="text-lg text-secondary-300">{packageData.descrizione}</p>
          </motion.div>
        </div>
      </section>

      {/* Package Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary-800 rounded-lg p-8 shadow-lg"
              >
                <h2 className="text-3xl font-bold mb-6">
                  Dettagli del pacchetto
                </h2>

                {packageData.immagine && (
                  <div className="mb-6 overflow-hidden rounded-lg">
                    <img 
                      src={packageData.immagine} 
                      alt={packageData.nome} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-secondary-300 mb-6">
                    {packageData.descrizioneDettagliata ||
                      packageData.descrizione}
                  </p>

                  {packageData.caratteristiche &&
                    packageData.caratteristiche.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">
                          Cosa include:
                        </h3>
                        <ul className="space-y-3">
                          {packageData.caratteristiche.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-amber-500 mr-2 flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {packageData.durata && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">Durata:</h3>
                      <p className="text-secondary-300">{packageData.durata}</p>
                    </div>
                  )}

                  {packageData.condizioni && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">
                        Termini e condizioni:
                      </h3>
                      <p className="text-secondary-300">{packageData.condizioni}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-secondary-800 rounded-lg p-8 shadow-lg mt-8"
              >
                <h2 className="text-3xl font-bold mb-6">Domande frequenti</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Come posso utilizzare questo pacchetto?
                    </h3>
                    <p className="text-secondary-300">
                      Dopo l'acquisto, riceverai una conferma via email con
                      tutte le istruzioni per usufruire dei servizi inclusi nel
                      pacchetto. Potrai prenotare gli appuntamenti direttamente
                      dal tuo account o contattando il nostro servizio clienti.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Il pacchetto è trasferibile?
                    </h3>
                    <p className="text-secondary-300">
                      I pacchetti sono associati a un veicolo specifico e non
                      sono trasferibili ad altri veicoli o persone, salvo
                      approvazione specifica da parte nostra. Contattaci per
                      discutere di eventuali esigenze particolari.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Posso annullare l'acquisto?
                    </h3>
                    <p className="text-secondary-300">
                      Offriamo un periodo di ripensamento di 14 giorni
                      dall'acquisto, durante il quale è possibile richiedere un
                      rimborso completo se non hai ancora utilizzato alcun
                      servizio del pacchetto. Dopo questo periodo, o se hai già
                      utilizzato parte dei servizi, potrai richiedere un
                      rimborso parziale.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Dove posso utilizzare i servizi?
                    </h3>
                    <p className="text-secondary-300">
                      I servizi inclusi nei nostri pacchetti possono essere
                      utilizzati presso tutte le nostre officine autorizzate in
                      Italia. Per i clienti con pacchetti Premium, offriamo
                      anche assistenza a domicilio in determinate aree
                      geografiche.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Purchase Card */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-secondary-800 rounded-lg p-6 shadow-lg sticky top-24"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {packageData.nome}
                  </h3>
                  <div className="text-3xl font-bold text-amber-500 mb-2">
                    €{packageData.prezzo.toLocaleString("it-IT")}
                  </div>
                  {packageData.durata && (
                    <p className="text-secondary-400">
                      Durata: {packageData.durata}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-amber-400">Riepilogo:</h4>
                  <ul className="space-y-2">
                    {packageData.caratteristiche &&
                      packageData.caratteristiche
                        .slice(0, 5)
                        .map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                    {packageData.caratteristiche &&
                      packageData.caratteristiche.length > 5 && (
                        <li className="text-sm text-secondary-400 pl-7">
                          + altre {packageData.caratteristiche.length - 5}{" "}
                          caratteristiche
                        </li>
                      )}
                  </ul>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-secondary-900 font-bold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {purchasing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-secondary-900 rounded-full mr-2"></div>
                      Elaborazione...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Aggiungi al carrello
                    </div>
                  )}
                </button>

                <div className="text-center text-sm text-secondary-400">
                  <p>Pagamento sicuro</p>
                  <p className="mt-2">Garanzia di rimborso di 14 giorni</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-secondary-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Cosa dicono i nostri clienti
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-500 text-secondary-900 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-bold">Alessandro Ricci</h4>
                  <p className="text-secondary-400 text-sm">
                    Proprietario di Ferrari 308 Restomod
                  </p>
                </div>
              </div>
              <div className="flex text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-300 italic">
                "Il pacchetto Premium è stato un investimento eccellente. La
                manutenzione programmata ha mantenuto la mia Ferrari in
                condizioni perfette e il supporto tecnico è sempre stato
                impeccabile."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-500 text-secondary-900 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-bold">Marco Esposito</h4>
                  <p className="text-secondary-400 text-sm">
                    Proprietario di Lancia Delta Integrale Restomod
                  </p>
                </div>
              </div>
              <div className="flex text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-300 italic">
                "L'assistenza 24/7 inclusa nel pacchetto mi ha salvato durante
                un viaggio all'estero. Un tecnico è stato in grado di guidarmi
                telefonicamente per risolvere un problema elettrico minore."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-900 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-500 text-secondary-900 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  G
                </div>
                <div>
                  <h4 className="font-bold">Giulia Martini</h4>
                  <p className="text-secondary-400 text-sm">
                    Proprietaria di Alfa Romeo Giulia GT Restomod
                  </p>
                </div>
              </div>
              <div className="flex text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-secondary-300 italic">
                "La qualità dei servizi inclusi nel pacchetto è eccezionale. I
                tecnici sono estremamente competenti e appassionati. La mia
                Giulia GT non è mai stata in condizioni migliori."
              </p>
            </motion.div>
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button variant="primary" className="px-8 py-3 text-lg">
                Contattaci
              </Button>
            </Link>
            <Link to="/packages">
              <Button variant="secondary" className="px-8 py-3 text-lg">
                Esplora altri pacchetti
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageDetail;
