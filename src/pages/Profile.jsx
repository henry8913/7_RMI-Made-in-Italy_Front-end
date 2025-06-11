import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components";
import { Modal } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";
import { packageService } from "../services";
import orderService from "../services/orderService";
import customRequestService from "../services/customRequestService";
import testDriveService from "../services/testDriveService";
import contactService from "../services/contactService";
import { FaCheck, FaTimes, FaSpinner } from "react-icons/fa";

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
  
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [requestsError, setRequestsError] = useState("");
  
  const [testDrives, setTestDrives] = useState([]);
  const [testDrivesLoading, setTestDrivesLoading] = useState(false);
  const [testDrivesError, setTestDrivesError] = useState("");
  
  const [contacts, setContacts] = useState([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState("");

  // Stati per i modali di dettaglio
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Stati per i dettagli degli elementi selezionati
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedTestDrive, setSelectedTestDrive] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  
  // Stati per il caricamento dei dettagli
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

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

  // Carica le richieste dell'utente (include richieste personalizzate, test drive e messaggi di contatto)
  useEffect(() => {
    const fetchUserRequests = async () => {
      if (activeTab === "requests") {
        setRequestsLoading(true);
        setTestDrivesLoading(true);
        setContactsLoading(true);
        setRequestsError("");
        setTestDrivesError("");
        setContactsError("");
        
        try {
          // Carica tutte le tipologie di richieste in parallelo
          const [userRequests, userTestDrives, userContacts] = await Promise.all([
            customRequestService.getUserRequests(),
            testDriveService.getUserTestDrives(),
            contactService.getUserMessages()
          ]);
          
          setRequests(userRequests);
          setTestDrives(userTestDrives);
          setContacts(userContacts);
        } catch (error) {
          console.error("Errore durante il recupero delle richieste:", error);
          setRequestsError("Impossibile caricare le richieste. Riprova più tardi.");
        } finally {
          setRequestsLoading(false);
          setTestDrivesLoading(false);
          setContactsLoading(false);
        }
      }
    };

    fetchUserRequests();
  }, [activeTab]);
  
  // Carica i test drive dell'utente (solo quando si visualizza la tab dedicata)
  useEffect(() => {
    const fetchUserTestDrives = async () => {
      if (activeTab === "testdrives") {
        setTestDrivesLoading(true);
        setTestDrivesError("");
        try {
          const userTestDrives = await testDriveService.getUserTestDrives();
          setTestDrives(userTestDrives);
        } catch (error) {
          console.error("Errore durante il recupero dei test drive:", error);
          setTestDrivesError("Impossibile caricare i test drive. Riprova più tardi.");
        } finally {
          setTestDrivesLoading(false);
        }
      }
    };

    fetchUserTestDrives();
  }, [activeTab]);
  
  // Carica i messaggi di contatto dell'utente (solo quando si visualizza la tab dedicata)
  useEffect(() => {
    const fetchUserContacts = async () => {
      if (activeTab === "contacts") {
        setContactsLoading(true);
        setContactsError("");
        try {
          const userContacts = await contactService.getUserMessages();
          setContacts(userContacts);
        } catch (error) {
          console.error("Errore durante il recupero dei messaggi di contatto:", error);
          setContactsError("Impossibile caricare i messaggi di contatto. Riprova più tardi.");
        } finally {
          setContactsLoading(false);
        }
      }
    };

    fetchUserContacts();
  }, [activeTab]);

  // Le richieste vengono caricate dal backend

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

  // Funzioni per gestire i modali di dettaglio
  const handleViewOrderDetails = async (orderId) => {
    try {
      setDetailsLoading(true);
      setDetailsError("");
      const orderDetails = await orderService.getOrderById(orderId);
      setSelectedOrder(orderDetails);
      setIsOrderModalOpen(true);
    } catch (error) {
      console.error("Errore durante il caricamento dei dettagli dell'ordine:", error);
      setDetailsError("Si è verificato un errore durante il caricamento dei dettagli dell'ordine.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleViewRequestDetails = async (requestId) => {
    try {
      setDetailsLoading(true);
      setDetailsError("");
      const requestDetails = await customRequestService.getById(requestId);
      setSelectedRequest(requestDetails);
      setIsRequestModalOpen(true);
    } catch (error) {
      console.error("Errore durante il caricamento dei dettagli della richiesta:", error);
      setDetailsError("Si è verificato un errore durante il caricamento dei dettagli della richiesta.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleViewTestDriveDetails = async (testDriveId) => {
    try {
      setDetailsLoading(true);
      setDetailsError("");
      const testDriveDetails = await testDriveService.getById(testDriveId);
      setSelectedTestDrive(testDriveDetails);
      setIsTestDriveModalOpen(true);
    } catch (error) {
      console.error("Errore durante il caricamento dei dettagli del test drive:", error);
      setDetailsError("Si è verificato un errore durante il caricamento dei dettagli del test drive.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleViewContactDetails = (contact) => {
    setSelectedContact(contact);
    setIsContactModalOpen(true);
  };

  // Funzioni per chiudere i modali
  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setSelectedRequest(null);
  };

  const closeTestDriveModal = () => {
    setIsTestDriveModalOpen(false);
    setSelectedTestDrive(null);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setSelectedContact(null);
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
            {/* I tab Test Drive e Contatti sono stati rimossi perché il loro contenuto è stato integrato nella sezione Richieste */}
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
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleViewOrderDetails(order._id || order.id)}
                        >
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
              
              {/* Sezione Richieste Personalizzate */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-secondary-800 pb-2">
                  Richieste personalizzate
                </h3>
                
                {requestsLoading ? (
                  <div className="text-center py-6">
                    <p className="text-secondary-400">Caricamento richieste...</p>
                  </div>
                ) : requestsError ? (
                  <div className="text-center py-6">
                    <p className="text-red-400">{requestsError}</p>
                  </div>
                ) : requests.length > 0 ? (
                  <div className="space-y-6">
                    {requests.map((request) => (
                      <div
                        key={request._id}
                        className="border border-secondary-800 rounded-lg overflow-hidden"
                      >
                        <div className="bg-secondary-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-white font-medium">
                              {request.titolo || request.title}
                            </p>
                            <p className="text-secondary-400 text-sm">
                              {new Date(request.createdAt).toLocaleDateString("it-IT")}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                request.status === "completato" || request.status === "accettato"
                                  ? "bg-green-900/50 text-green-400"
                                  : request.status === "in_attesa"
                                  ? "bg-yellow-900/50 text-yellow-400"
                                  : request.status === "rifiutato"
                                  ? "bg-red-900/50 text-red-400"
                                  : "bg-blue-900/50 text-blue-400"
                              }`}
                            >
                              {request.status === "in_attesa" ? "In attesa" :
                               request.status === "in_lavorazione" ? "In lavorazione" :
                               request.status === "preventivo_inviato" ? "Preventivo inviato" :
                               request.status === "accettato" ? "Accettato" :
                               request.status === "rifiutato" ? "Rifiutato" :
                               request.status === "completato" ? "Completato" :
                               request.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-secondary-300">{request.descrizione || request.description}</p>
                          {request.budget && (
                            <p className="text-secondary-300 mt-2">Budget: € {request.budget.toLocaleString("it-IT")}</p>
                          )}
                          {request.timeline && (
                            <p className="text-secondary-300 mt-2">Tempistica: {request.timeline}</p>
                          )}
                          {request.admin_response && request.admin_response.text && (
                            <div className="mt-4 p-3 bg-secondary-800 rounded">
                              <p className="text-white font-medium mb-1">Risposta:</p>
                              <p className="text-secondary-300">{request.admin_response.text}</p>
                              {request.admin_response.quote && (
                                <p className="text-secondary-300 mt-2">Preventivo: € {request.admin_response.quote.toLocaleString("it-IT")}</p>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="bg-secondary-800 p-4 flex justify-end space-x-3">
                          {request.status === "preventivo_inviato" && (
                            <>
                              <Button 
                                variant="primary" 
                                size="sm"
                                onClick={() => {
                                  // Implementare la logica per accettare il preventivo
                                  // customRequestService.acceptQuote(request._id)
                                }}
                              >
                                Accetta preventivo
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => {
                                  // Implementare la logica per rifiutare il preventivo
                                  // customRequestService.cancel(request._id)
                                }}
                              >
                                Rifiuta
                              </Button>
                            </>
                          )}
                          {request.status === "in_attesa" && (
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => {
                                // Implementare la logica per annullare la richiesta
                                // customRequestService.cancel(request._id)
                              }}
                            >
                              Annulla richiesta
                            </Button>
                          )}
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => handleViewRequestDetails(request._id)}
                          >
                            Visualizza dettagli
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-secondary-400">
                      Non hai ancora effettuato richieste personalizzate.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Sezione Test Drive */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-secondary-800 pb-2">
                  Test Drive
                </h3>
                
                {testDrivesLoading ? (
                  <div className="text-center py-6">
                    <p className="text-secondary-400">Caricamento test drive...</p>
                  </div>
                ) : testDrivesError ? (
                  <div className="text-center py-6">
                    <p className="text-red-400">{testDrivesError}</p>
                  </div>
                ) : testDrives.length > 0 ? (
                  <div className="space-y-6">
                    {testDrives.map((testDrive) => (
                      <div
                        key={testDrive._id}
                        className="border border-secondary-800 rounded-lg overflow-hidden"
                      >
                        <div className="bg-secondary-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-white font-medium">
                              {testDrive.modello?.nome || "Modello non disponibile"}
                            </p>
                            <p className="text-secondary-400 text-sm">
                              {new Date(testDrive.data).toLocaleDateString("it-IT")} - {testDrive.ora}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                testDrive.stato === "completato"
                                  ? "bg-green-900/50 text-green-400"
                                  : testDrive.stato === "confermato"
                                  ? "bg-blue-900/50 text-blue-400"
                                  : testDrive.stato === "richiesto"
                                  ? "bg-yellow-900/50 text-yellow-400"
                                  : "bg-red-900/50 text-red-400"
                              }`}
                            >
                              {testDrive.stato === "richiesto" ? "Richiesto" :
                               testDrive.stato === "confermato" ? "Confermato" :
                               testDrive.stato === "completato" ? "Completato" :
                               testDrive.stato === "annullato" ? "Annullato" :
                               testDrive.stato}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-secondary-300">Luogo: {testDrive.luogo}</p>
                          {testDrive.note && (
                            <p className="text-secondary-300 mt-2">Note: {testDrive.note}</p>
                          )}
                        </div>
                        <div className="bg-secondary-800 p-4 flex justify-end space-x-3">
                          {testDrive.stato === "richiesto" && (
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => {
                                // Implementare la logica per annullare il test drive
                                // testDriveService.cancel(testDrive._id)
                              }}
                            >
                              Annulla test drive
                            </Button>
                          )}
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => handleViewTestDriveDetails(testDrive._id)}
                          >
                            Visualizza dettagli
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-secondary-400">
                      Non hai ancora prenotato test drive.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Sezione Messaggi di Contatto */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-secondary-800 pb-2">
                  Messaggi di contatto
                </h3>
                
                {contactsLoading ? (
                  <div className="text-center py-6">
                    <p className="text-secondary-400">Caricamento messaggi...</p>
                  </div>
                ) : contactsError ? (
                  <div className="text-center py-6">
                    <p className="text-red-400">{contactsError}</p>
                  </div>
                ) : contacts.length > 0 ? (
                  <div className="space-y-6">
                    {contacts.map((contact) => (
                      <div
                        key={contact._id}
                        className="border border-secondary-800 rounded-lg overflow-hidden"
                      >
                        <div className="bg-secondary-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-white font-medium">
                              {contact.nome}
                            </p>
                            <p className="text-secondary-400 text-sm">
                              {new Date(contact.dataInvio).toLocaleDateString("it-IT")}
                            </p>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                contact.letto
                                  ? "bg-green-900/50 text-green-400"
                                  : "bg-yellow-900/50 text-yellow-400"
                              }`}
                            >
                              {contact.letto ? "Risposto" : "In attesa"}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-secondary-300">{contact.messaggio}</p>
                          {contact.allegati && contact.allegati.length > 0 && (
                            <div className="mt-4">
                              <p className="text-white font-medium mb-2">Allegati:</p>
                              <ul className="space-y-1">
                                {contact.allegati.map((allegato, index) => (
                                  <li key={index}>
                                    <a 
                                      href={allegato.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:underline"
                                    >
                                      {allegato.filename}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="bg-secondary-800 p-4 flex justify-end">
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => handleViewContactDetails(contact)}
                          >
                            Visualizza dettagli
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-secondary-400">
                      Non hai ancora inviato messaggi di contatto.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab Test Drive */}
          {activeTab === "testdrives" && (
            <div className="bg-secondary-900 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6">
                I tuoi test drive
              </h2>

              {testDrivesLoading ? (
                <div className="text-center py-12">
                  <p className="text-secondary-400">Caricamento test drive...</p>
                </div>
              ) : testDrivesError ? (
                <div className="text-center py-12">
                  <p className="text-red-400">{testDrivesError}</p>
                </div>
              ) : testDrives.length > 0 ? (
                <div className="space-y-6">
                  {testDrives.map((testDrive) => (
                    <div
                      key={testDrive._id}
                      className="border border-secondary-800 rounded-lg overflow-hidden"
                    >
                      <div className="bg-secondary-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-white font-medium">
                            {testDrive.modello?.nome || "Modello non disponibile"}
                          </p>
                          <p className="text-secondary-400 text-sm">
                            {new Date(testDrive.data).toLocaleDateString("it-IT")} - {testDrive.ora}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              testDrive.stato === "completato"
                                ? "bg-green-900/50 text-green-400"
                                : testDrive.stato === "confermato"
                                ? "bg-blue-900/50 text-blue-400"
                                : testDrive.stato === "richiesto"
                                ? "bg-yellow-900/50 text-yellow-400"
                                : "bg-red-900/50 text-red-400"
                            }`}
                          >
                            {testDrive.stato === "richiesto" ? "Richiesto" :
                             testDrive.stato === "confermato" ? "Confermato" :
                             testDrive.stato === "completato" ? "Completato" :
                             testDrive.stato === "annullato" ? "Annullato" :
                             testDrive.stato}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-secondary-300">Luogo: {testDrive.luogo}</p>
                        {testDrive.note && (
                          <p className="text-secondary-300 mt-2">Note: {testDrive.note}</p>
                        )}
                      </div>
                      <div className="bg-secondary-800 p-4 flex justify-end space-x-3">
                        {testDrive.stato === "richiesto" && (
                          <Button 
                            variant="danger" 
                            size="sm"
                            onClick={() => {
                              // Implementare la logica per annullare il test drive
                              // testDriveService.cancel(testDrive._id)
                            }}
                          >
                            Annulla test drive
                          </Button>
                        )}
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => {
                            // Implementare la logica per visualizzare i dettagli
                            // navigate(`/test-drive/${testDrive._id}`)
                          }}
                        >
                          Visualizza dettagli
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-secondary-400">
                    Non hai ancora prenotato test drive.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab Messaggi di Contatto */}
          {activeTab === "contacts" && (
            <div className="bg-secondary-900 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-bold text-white mb-6">
                I tuoi messaggi di contatto
              </h2>

              {contactsLoading ? (
                <div className="text-center py-12">
                  <p className="text-secondary-400">Caricamento messaggi...</p>
                </div>
              ) : contactsError ? (
                <div className="text-center py-12">
                  <p className="text-red-400">{contactsError}</p>
                </div>
              ) : contacts.length > 0 ? (
                <div className="space-y-6">
                  {contacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="border border-secondary-800 rounded-lg overflow-hidden"
                    >
                      <div className="bg-secondary-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-white font-medium">
                            {contact.nome}
                          </p>
                          <p className="text-secondary-400 text-sm">
                            {new Date(contact.dataInvio).toLocaleDateString("it-IT")}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              contact.letto
                                ? "bg-green-900/50 text-green-400"
                                : "bg-yellow-900/50 text-yellow-400"
                            }`}
                          >
                            {contact.letto ? "Risposto" : "In attesa"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-secondary-300">{contact.messaggio}</p>
                        {contact.allegati && contact.allegati.length > 0 && (
                          <div className="mt-4">
                            <p className="text-white font-medium mb-2">Allegati:</p>
                            <ul className="space-y-1">
                              {contact.allegati.map((allegato, index) => (
                                <li key={index}>
                                  <a 
                                    href={allegato.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                  >
                                    {allegato.filename}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-secondary-400">
                    Non hai ancora inviato messaggi di contatto.
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

      {/* Modali per visualizzare i dettagli */}
      
      {/* Modale Dettagli Ordine */}
      <Modal
        isOpen={isOrderModalOpen}
        onClose={closeOrderModal}
        title="Dettagli Ordine"
        size="lg"
      >
        {detailsLoading ? (
          <div className="flex justify-center items-center py-8">
            <FaSpinner className="animate-spin text-red-500 text-2xl" />
          </div>
        ) : detailsError ? (
          <div className="text-center py-6">
            <p className="text-red-400">{detailsError}</p>
          </div>
        ) : selectedOrder ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-white font-medium mb-2">Informazioni Ordine</h3>
                <p className="text-secondary-300">ID: {selectedOrder._id || selectedOrder.id}</p>
                <p className="text-secondary-300">
                  Data: {new Date(selectedOrder.dataAcquisto || selectedOrder.dataCreazione || selectedOrder.date || selectedOrder.createdAt).toLocaleDateString("it-IT")}
                </p>
                <p className="text-secondary-300">
                  Stato: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedOrder.stato === "completato" || selectedOrder.status === "completed" || selectedOrder.status === "Completato"
                      ? "bg-green-900/50 text-green-400"
                      : "bg-yellow-900/50 text-yellow-400"
                  }`}>
                    {selectedOrder.stato === "completato" || selectedOrder.status === "completed" ? "Completato" : selectedOrder.stato || selectedOrder.status}
                  </span>
                </p>
                <p className="text-secondary-300">
                  Totale: € {(selectedOrder.totale || selectedOrder.total || selectedOrder.amount || 0).toLocaleString("it-IT")}
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-2">Informazioni Spedizione</h3>
                <p className="text-secondary-300">Nome: {selectedOrder.shipping?.name || currentUser.name}</p>
                <p className="text-secondary-300">Indirizzo: {selectedOrder.shipping?.address || currentUser.address}</p>
                <p className="text-secondary-300">Città: {selectedOrder.shipping?.city || currentUser.city}</p>
                <p className="text-secondary-300">CAP: {selectedOrder.shipping?.postalCode || currentUser.postalCode}</p>
                <p className="text-secondary-300">Paese: {selectedOrder.shipping?.country || currentUser.country}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-2">Articoli</h3>
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                <div className="bg-secondary-800 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-secondary-700">
                        <th className="px-4 py-2 text-left text-white">Articolo</th>
                        <th className="px-4 py-2 text-right text-white">Prezzo</th>
                        <th className="px-4 py-2 text-right text-white">Quantità</th>
                        <th className="px-4 py-2 text-right text-white">Totale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="border-t border-secondary-700">
                          <td className="px-4 py-3 text-secondary-300">{item.nome || item.name}</td>
                          <td className="px-4 py-3 text-secondary-300 text-right">€ {(item.prezzo || item.price || 0).toLocaleString("it-IT")}</td>
                          <td className="px-4 py-3 text-secondary-300 text-right">{item.quantita || item.quantity || 1}</td>
                          <td className="px-4 py-3 text-secondary-300 text-right">€ {((item.prezzo || item.price || 0) * (item.quantita || item.quantity || 1)).toLocaleString("it-IT")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : selectedOrder.package ? (
                <div className="bg-secondary-800 rounded-lg p-4">
                  <p className="text-secondary-300">
                    {selectedOrder.package.nome || "Pacchetto"}: € {(selectedOrder.package.prezzo || 0).toLocaleString("it-IT")}
                  </p>
                  {selectedOrder.package.descrizione && (
                    <p className="text-secondary-300 mt-2">{selectedOrder.package.descrizione}</p>
                  )}
                </div>
              ) : (
                <div className="bg-secondary-800 rounded-lg p-4">
                  <p className="text-secondary-300">
                    {selectedOrder.packageName || "Pacchetto"}: € {(selectedOrder.amount || 0).toLocaleString("it-IT")}
                  </p>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-2">Pagamento</h3>
              <div className="bg-secondary-800 rounded-lg p-4">
                <p className="text-secondary-300">Metodo: {selectedOrder.paymentMethod || "Carta di credito"}</p>
                {selectedOrder.paymentResult && (
                  <>
                    <p className="text-secondary-300">ID: {selectedOrder.paymentResult.id}</p>
                    <p className="text-secondary-300">Stato: {selectedOrder.paymentResult.status}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-secondary-400">Nessun dettaglio disponibile</p>
          </div>
        )}
      </Modal>

      {/* Modale Dettagli Richiesta */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={closeRequestModal}
        title="Dettagli Richiesta Personalizzata"
        size="lg"
      >
        {detailsLoading ? (
          <div className="flex justify-center items-center py-8">
            <FaSpinner className="animate-spin text-red-500 text-2xl" />
          </div>
        ) : detailsError ? (
          <div className="text-center py-6">
            <p className="text-red-400">{detailsError}</p>
          </div>
        ) : selectedRequest ? (
          <div className="space-y-6">
            <div className="bg-secondary-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">{selectedRequest.titolo || selectedRequest.title}</h3>
              <p className="text-secondary-300 mb-2">
                Data: {new Date(selectedRequest.createdAt).toLocaleDateString("it-IT")}
              </p>
              <p className="text-secondary-300 mb-2">
                Stato: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedRequest.status === "completato" || selectedRequest.status === "accettato"
                    ? "bg-green-900/50 text-green-400"
                    : selectedRequest.status === "in_attesa"
                    ? "bg-yellow-900/50 text-yellow-400"
                    : selectedRequest.status === "rifiutato"
                    ? "bg-red-900/50 text-red-400"
                    : "bg-blue-900/50 text-blue-400"
                }`}>
                  {selectedRequest.status === "in_attesa" ? "In attesa" :
                   selectedRequest.status === "in_lavorazione" ? "In lavorazione" :
                   selectedRequest.status === "preventivo_inviato" ? "Preventivo inviato" :
                   selectedRequest.status === "accettato" ? "Accettato" :
                   selectedRequest.status === "rifiutato" ? "Rifiutato" :
                   selectedRequest.status === "completato" ? "Completato" :
                   selectedRequest.status}
                </span>
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-2">Descrizione</h3>
              <div className="bg-secondary-800 rounded-lg p-4">
                <p className="text-secondary-300">{selectedRequest.descrizione || selectedRequest.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedRequest.budget && (
                <div>
                  <h3 className="text-white font-medium mb-2">Budget</h3>
                  <div className="bg-secondary-800 rounded-lg p-4">
                    <p className="text-secondary-300">€ {selectedRequest.budget.toLocaleString("it-IT")}</p>
                  </div>
                </div>
              )}
              
              {selectedRequest.timeline && (
                <div>
                  <h3 className="text-white font-medium mb-2">Tempistica</h3>
                  <div className="bg-secondary-800 rounded-lg p-4">
                    <p className="text-secondary-300">{selectedRequest.timeline}</p>
                  </div>
                </div>
              )}
            </div>
            
            {selectedRequest.admin_response && selectedRequest.admin_response.text && (
              <div>
                <h3 className="text-white font-medium mb-2">Risposta dell'amministratore</h3>
                <div className="bg-secondary-800 rounded-lg p-4">
                  <p className="text-secondary-300">{selectedRequest.admin_response.text}</p>
                  {selectedRequest.admin_response.quote && (
                    <p className="text-secondary-300 mt-4 font-medium">Preventivo: € {selectedRequest.admin_response.quote.toLocaleString("it-IT")}</p>
                  )}
                </div>
              </div>
            )}
            
            {selectedRequest.status === "preventivo_inviato" && (
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="primary" 
                  onClick={() => {
                    // Implementare la logica per accettare il preventivo
                    // customRequestService.acceptQuote(selectedRequest._id)
                  }}
                >
                  Accetta preventivo
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => {
                    // Implementare la logica per rifiutare il preventivo
                    // customRequestService.cancel(selectedRequest._id)
                  }}
                >
                  Rifiuta
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-secondary-400">Nessun dettaglio disponibile</p>
          </div>
        )}
      </Modal>

      {/* Modale Dettagli Test Drive */}
      <Modal
        isOpen={isTestDriveModalOpen}
        onClose={closeTestDriveModal}
        title="Dettagli Test Drive"
        size="md"
      >
        {detailsLoading ? (
          <div className="flex justify-center items-center py-8">
            <FaSpinner className="animate-spin text-red-500 text-2xl" />
          </div>
        ) : detailsError ? (
          <div className="text-center py-6">
            <p className="text-red-400">{detailsError}</p>
          </div>
        ) : selectedTestDrive ? (
          <div className="space-y-6">
            <div className="bg-secondary-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">{selectedTestDrive.modello?.nome || "Modello non disponibile"}</h3>
              <p className="text-secondary-300 mb-2">
                Data: {new Date(selectedTestDrive.data).toLocaleDateString("it-IT")}
              </p>
              <p className="text-secondary-300 mb-2">
                Ora: {selectedTestDrive.ora}
              </p>
              <p className="text-secondary-300 mb-2">
                Stato: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedTestDrive.stato === "completato"
                    ? "bg-green-900/50 text-green-400"
                    : selectedTestDrive.stato === "confermato"
                    ? "bg-blue-900/50 text-blue-400"
                    : selectedTestDrive.stato === "richiesto"
                    ? "bg-yellow-900/50 text-yellow-400"
                    : "bg-red-900/50 text-red-400"
                }`}>
                  {selectedTestDrive.stato === "richiesto" ? "Richiesto" :
                   selectedTestDrive.stato === "confermato" ? "Confermato" :
                   selectedTestDrive.stato === "completato" ? "Completato" :
                   selectedTestDrive.stato === "annullato" ? "Annullato" :
                   selectedTestDrive.stato}
                </span>
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-2">Luogo</h3>
              <div className="bg-secondary-800 rounded-lg p-4">
                <p className="text-secondary-300">{selectedTestDrive.luogo}</p>
              </div>
            </div>
            
            {selectedTestDrive.note && (
              <div>
                <h3 className="text-white font-medium mb-2">Note</h3>
                <div className="bg-secondary-800 rounded-lg p-4">
                  <p className="text-secondary-300">{selectedTestDrive.note}</p>
                </div>
              </div>
            )}
            
            {selectedTestDrive.stato === "richiesto" && (
              <div className="flex justify-end">
                <Button 
                  variant="danger" 
                  onClick={() => {
                    // Implementare la logica per annullare il test drive
                    // testDriveService.cancel(selectedTestDrive._id)
                  }}
                >
                  Annulla test drive
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-secondary-400">Nessun dettaglio disponibile</p>
          </div>
        )}
      </Modal>

      {/* Modale Dettagli Contatto */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        title="Dettagli Messaggio"
        size="md"
      >
        {selectedContact ? (
          <div className="space-y-6">
            <div className="bg-secondary-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">{selectedContact.nome}</h3>
              <p className="text-secondary-300 mb-2">
                Data: {new Date(selectedContact.dataInvio).toLocaleDateString("it-IT")}
              </p>
              <p className="text-secondary-300 mb-2">
                Stato: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedContact.letto
                    ? "bg-green-900/50 text-green-400"
                    : "bg-yellow-900/50 text-yellow-400"
                }`}>
                  {selectedContact.letto ? "Risposto" : "In attesa"}
                </span>
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-2">Messaggio</h3>
              <div className="bg-secondary-800 rounded-lg p-4">
                <p className="text-secondary-300">{selectedContact.messaggio}</p>
              </div>
            </div>
            
            {selectedContact.allegati && selectedContact.allegati.length > 0 && (
              <div>
                <h3 className="text-white font-medium mb-2">Allegati</h3>
                <div className="bg-secondary-800 rounded-lg p-4">
                  <ul className="space-y-2">
                    {selectedContact.allegati.map((allegato, index) => (
                      <li key={index}>
                        <a 
                          href={allegato.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          {allegato.filename}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {selectedContact.risposta && (
              <div>
                <h3 className="text-white font-medium mb-2">Risposta</h3>
                <div className="bg-secondary-800 rounded-lg p-4">
                  <p className="text-secondary-300">{selectedContact.risposta}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-secondary-400">Nessun dettaglio disponibile</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Profile;
