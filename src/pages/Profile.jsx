import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components";
import { useAuth } from "../contexts/AuthContext";
import { packageService } from "../services";
import orderService from "../services/orderService";

const Profile = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: "/profile" } }} />;
  }

  // Redirect se l'utente non è autenticato
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Stati per i dati del profilo e la modifica
  const [profileData, setProfileData] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    address: currentUser.address || "",
    city: currentUser.city || "",
    postalCode: currentUser.postalCode || "",
    country: currentUser.country || "Italia",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Tabs per la navigazione nella pagina profilo
  const [activeTab, setActiveTab] = useState("profile");

  // Stato per gli ordini e le richieste
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  // Carica gli ordini dell'utente
  useEffect(() => {
    const fetchUserOrders = async () => {
      if (activeTab === "orders") {
        setOrdersLoading(true);
        setOrdersError("");
        try {
          // Ottieni sia gli ordini dei pacchetti che gli ordini generali
          const [packageOrders, generalOrders] = await Promise.all([
            packageService.getUserOrders(),
            orderService.getUserOrders()
          ]);
          
          // Combina gli ordini
          const allOrders = [...packageOrders, ...generalOrders];
          
          // Ordina gli ordini per data (dal più recente)
          const sortedOrders = allOrders.sort((a, b) => {
            const dateA = new Date(a.dataAcquisto || a.dataCreazione || a.date || a.createdAt);
            const dateB = new Date(b.dataAcquisto || b.dataCreazione || b.date || b.createdAt);
            return dateB - dateA;
          });
          
          setOrders(sortedOrders);
        } catch (error) {
          console.error("Errore durante il recupero degli ordini:", error);
          setOrdersError("Impossibile caricare gli ordini. Riprova più tardi.");
        } finally {
          setOrdersLoading(false);
        }
      }
    };

    fetchUserOrders();
  }, [activeTab]);

  const [requests, setRequests] = useState([
    {
      id: "REQ-001",
      date: "2023-09-05",
      status: "Risposto",
      subject: "Informazioni su Lancia Delta Integrale",
      message:
        "Vorrei sapere se avete in programma un restomod della Lancia Delta Integrale.",
    },
    {
      id: "REQ-002",
      date: "2023-12-01",
      status: "In attesa",
      subject: "Richiesta test drive",
      message:
        "Sarei interessato a fare un test drive del vostro modello Alfa Romeo GTA.",
    },
  ]);

  // Gestisce il cambio di input nei form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestisce l'invio del form di modifica profilo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Simulazione di aggiornamento profilo (in produzione, qui andrebbe una vera API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulazione di successo
      setSuccess("Profilo aggiornato con successo!");
      setIsEditing(false);

      // Dopo 3 secondi, rimuovi il messaggio di successo
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error("Errore durante l'aggiornamento del profilo:", err);
      setError(
        "Si è verificato un errore durante l'aggiornamento. Riprova più tardi."
      );
    } finally {
      setLoading(false);
    }
  };

  // Gestisce il logout
  const handleLogout = async () => {
    try {
      const result = await logout();
      // Reindirizza l'utente alla home page dopo il logout
      if (result && result.success) {
        navigate('/');
      }
    } catch (err) {
      console.error("Errore durante il logout:", err);
      setError(
        "Si è verificato un errore durante il logout. Riprova più tardi."
      );
    }
  };

  return (
    <div className="min-h-screen bg-secondary-950 py-12 pt-28">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Il tuo profilo
        </motion.h1>

        {/* Tabs */}
        <div className="mb-8 border-b border-secondary-800">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`pb-4 font-medium text-sm ${
                activeTab === "profile"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-secondary-400 hover:text-white"
              }`}
            >
              Profilo
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-4 font-medium text-sm ${
                activeTab === "orders"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-secondary-400 hover:text-white"
              }`}
            >
              Ordini
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`pb-4 font-medium text-sm ${
                activeTab === "requests"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-secondary-400 hover:text-white"
              }`}
            >
              Richieste
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`pb-4 font-medium text-sm ${
                activeTab === "settings"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-secondary-400 hover:text-white"
              }`}
            >
              Impostazioni
            </button>
          </nav>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-900/50 text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-md bg-green-900/50 text-green-400">
            {success}
          </div>
        )}

        {/* Contenuto del tab attivo */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Tab Profilo */}
          {activeTab === "profile" && (
            <div className="bg-secondary-900 rounded-lg p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Informazioni personali
                </h2>
                {!isEditing ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Modifica
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    Annulla
                  </Button>
                )}
              </div>

              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Nome completo</p>
                    <p className="text-white">{profileData.name}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Email</p>
                    <p className="text-white">{profileData.email}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Telefono</p>
                    <p className="text-white">
                      {profileData.phone || "Non specificato"}
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Indirizzo</p>
                    <p className="text-white">
                      {profileData.address || "Non specificato"}
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Città</p>
                    <p className="text-white">
                      {profileData.city || "Non specificata"}
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">CAP</p>
                    <p className="text-white">
                      {profileData.postalCode || "Non specificato"}
                    </p>
                  </div>
                  <div>
                    <p className="text-secondary-400 text-sm mb-1">Paese</p>
                    <p className="text-white">{profileData.country}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-secondary-400 text-sm mb-1"
                      >
                        Nome completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-secondary-400 text-sm mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-secondary-400 text-sm mb-1"
                      >
                        Telefono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-secondary-400 text-sm mb-1"
                      >
                        Indirizzo
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-secondary-400 text-sm mb-1"
                      >
                        Città
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={profileData.city}
                        onChange={handleChange}
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-secondary-400 text-sm mb-1"
                      >
                        CAP
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={profileData.postalCode}
                        onChange={handleChange}
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-secondary-400 text-sm mb-1"
                      >
                        Paese
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={profileData.country}
                        onChange={handleChange}
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="Italia">Italia</option>
                        <option value="Francia">Francia</option>
                        <option value="Germania">Germania</option>
                        <option value="Regno Unito">Regno Unito</option>
                        <option value="Spagna">Spagna</option>
                        <option value="Stati Uniti">Stati Uniti</option>
                        <option value="Altro">Altro</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? "Salvataggio..." : "Salva modifiche"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Tab Ordini */}
          {activeTab === "orders" && (
            <div className="bg-secondary-900 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6">
                I tuoi ordini
              </h2>

              {ordersLoading ? (
                <div className="text-center py-12">
                  <p className="text-secondary-400">Caricamento ordini...</p>
                </div>
              ) : ordersError ? (
                <div className="text-center py-12">
                  <p className="text-red-400">{ordersError}</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order._id || order.id}
                      className="border border-secondary-800 rounded-lg overflow-hidden"
                    >
                      <div className="bg-secondary-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-white font-medium">{order._id || order.id}</p>
                          <p className="text-secondary-400 text-sm">
                            {new Date(order.dataAcquisto || order.dataCreazione || order.date || order.createdAt).toLocaleDateString("it-IT")}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.stato === "completato" || order.status === "completed" || order.status === "Completato"
                                ? "bg-green-900/50 text-green-400"
                                : "bg-yellow-900/50 text-yellow-400"
                            }`}
                          >
                            {order.stato === "completato" || order.status === "completed" ? "Completato" : order.stato || order.status}
                          </span>
                          <span className="ml-4 text-white font-medium">
                            € {(order.totale || order.total || order.amount || 0).toLocaleString("it-IT")}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-medium mb-2">
                          Dettagli ordine
                        </h3>
                        {order.items && order.items.length > 0 ? (
                          <ul className="space-y-2">
                            {order.items.map((item, index) => (
                              <li key={index} className="flex justify-between">
                                <span className="text-secondary-300">{item.nome || item.name}</span>
                                <span className="text-secondary-300">
                                  € {(item.prezzo || item.price || 0).toLocaleString("it-IT")}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : order.package ? (
                          <p className="text-secondary-300">
                            {order.package.nome || "Pacchetto"}: € {(order.package.prezzo || 0).toLocaleString("it-IT")}
                          </p>
                        ) : (
                          <p className="text-secondary-300">
                            {order.packageName || "Pacchetto"}: € {(order.amount || 0).toLocaleString("it-IT")}
                          </p>
                        )}
                      </div>
                      <div className="bg-secondary-800 p-4 flex justify-end">
                        <Button variant="secondary" size="sm">
                          Visualizza dettagli
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-secondary-400">
                    Non hai ancora effettuato ordini.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab Richieste */}
          {activeTab === "requests" && (
            <div className="bg-secondary-900 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6">
                Le tue richieste
              </h2>

              {requests.length > 0 ? (
                <div className="space-y-6">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      className="border border-secondary-800 rounded-lg overflow-hidden"
                    >
                      <div className="bg-secondary-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-white font-medium">
                            {request.subject}
                          </p>
                          <p className="text-secondary-400 text-sm">
                            {new Date(request.date).toLocaleDateString("it-IT")}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              request.status === "Risposto"
                                ? "bg-green-900/50 text-green-400"
                                : "bg-yellow-900/50 text-yellow-400"
                            }`}
                          >
                            {request.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-secondary-300">{request.message}</p>
                      </div>
                      <div className="bg-secondary-800 p-4 flex justify-end">
                        <Button variant="secondary" size="sm">
                          Visualizza conversazione
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-secondary-400">
                    Non hai ancora effettuato richieste.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab Impostazioni */}
          {activeTab === "settings" && (
            <div className="bg-secondary-900 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6">
                Impostazioni account
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-white font-medium mb-4">
                    Cambia password
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="currentPassword"
                        className="block text-secondary-400 text-sm mb-1"
                      >
                        Password attuale
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-secondary-400 text-sm mb-1"
                      >
                        Nuova password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-secondary-400 text-sm mb-1"
                      >
                        Conferma nuova password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <Button variant="secondary">Cambia password</Button>
                    </div>
                  </form>
                </div>

                <div className="pt-6 border-t border-secondary-800">
                  <h3 className="text-white font-medium mb-4">Notifiche</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Email di marketing</p>
                        <p className="text-secondary-400 text-sm">
                          Ricevi email su offerte e novità
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-secondary-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Aggiornamenti sugli ordini</p>
                        <p className="text-secondary-400 text-sm">
                          Ricevi email sullo stato dei tuoi ordini
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-secondary-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-secondary-800">
                  <h3 className="text-white font-medium mb-4">
                    Elimina account
                  </h3>
                  <p className="text-secondary-400 mb-4">
                    Una volta eliminato il tuo account, tutti i tuoi dati
                    verranno rimossi permanentemente. Questa azione non può
                    essere annullata.
                  </p>
                  <Button variant="danger">Elimina account</Button>
                </div>

                <div className="pt-6 border-t border-secondary-800">
                  <h3 className="text-white font-medium mb-4">Logout</h3>
                  <p className="text-secondary-400 mb-4">
                    Esci dal tuo account su questo dispositivo.
                  </p>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
