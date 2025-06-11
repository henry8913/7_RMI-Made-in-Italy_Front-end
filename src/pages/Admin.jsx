import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FaUsers, FaCar, FaBuilding, FaBlog, FaBox, FaEnvelope, FaBriefcase, FaClipboardList, FaTrash, FaReply, FaFile } from 'react-icons/fa';
import adminService from '../services/adminService';

const Admin = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    users: 0,
    restomods: 0,
    brands: 0,
    blogs: 0,
    packages: 0,
    messages: 0,
    jobs: 0,
    customRequests: 0
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: "/admin" } }} />;
  }

  // Redirect if user is not admin
  if (currentUser && currentUser.ruolo !== 'admin') {
    return <Navigate to="/" />;
  }

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError('');
      try {
        const dashboardStats = await adminService.getDashboardStats();
        setStats(dashboardStats);
      } catch (err) {
        console.error('Errore durante il recupero delle statistiche:', err);
        setError('Impossibile caricare le statistiche. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === 'dashboard') {
      fetchStats();
    }
  }, [activeSection]);

  // Sezioni dell'amministrazione
  const adminSections = [
    { id: 'dashboard', name: 'Dashboard', icon: <FaClipboardList /> },
    { id: 'users', name: 'Utenti', icon: <FaUsers /> },
    { id: 'restomods', name: 'Restomods', icon: <FaCar /> },
    { id: 'brands', name: 'Marchi', icon: <FaBuilding /> },
    { id: 'blogs', name: 'Blog', icon: <FaBlog /> },
    { id: 'packages', name: 'Pacchetti', icon: <FaBox /> },
    { id: 'jobs', name: 'Lavori', icon: <FaBriefcase /> },
    { id: 'messages', name: 'Contatti', icon: <FaEnvelope /> },
    { id: 'orders', name: 'Ordini', icon: <FaFile /> },
  ];

  // Componente per la dashboard
  const Dashboard = () => {
    // Funzione per ottenere il nome visualizzato per ogni statistica
    const getDisplayName = (key) => {
      const displayNames = {
        users: 'Utenti',
        restomods: 'Restomods',
        brands: 'Marchi',
        blogs: 'Articoli Blog',
        packages: 'Pacchetti',
        messages: 'Messaggi',
        jobs: 'Lavori',
        orders: 'Ordini',
        customRequests: 'Richieste Personalizzate'
      };
      return displayNames[key] || key;
    };

    return (
      <div className="bg-secondary-900 p-4 sm:p-6 rounded-sm border border-secondary-800">
        <h2 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-6">Dashboard</h2>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-3 sm:p-4 mb-4 sm:mb-6 rounded-sm">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Object.entries(stats).map(([key, value]) => (
            <div 
                key={key} 
                className="bg-secondary-800 p-4 sm:p-6 rounded-sm border border-secondary-700 hover:border-primary transition-colors duration-300 cursor-pointer" 
                onClick={() => setActiveSection(key)}
              >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-400 text-xs sm:text-sm">{getDisplayName(key)}</p>
                  <h3 className="text-white text-xl sm:text-2xl font-medium mt-1">{value}</h3>
                </div>
                <div className="text-primary text-xl sm:text-2xl">
                  {key === 'users' && <FaUsers />}
                  {key === 'restomods' && <FaCar />}
                  {key === 'brands' && <FaBuilding />}
                  {key === 'blogs' && <FaBlog />}
                  {key === 'packages' && <FaBox />}
                  {key === 'messages' && <FaEnvelope />}
                  {key === 'jobs' && <FaBriefcase />}
                  {key === 'customRequests' && <FaEnvelope />}
                  {key === 'orders' && <FaFile />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  // Componente per la gestione degli utenti
  const UsersManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
      nome: '',
      email: '',
      ruolo: ''
    });

    // Carica gli utenti
    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await adminService.getUsers();
          setUsers(data);
        } catch (err) {
          console.error('Errore durante il recupero degli utenti:', err);
          setError('Impossibile caricare gli utenti. Riprova più tardi.');
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, []);

    // Gestisce il click sul pulsante di modifica
    const handleEditClick = (user) => {
      setEditingUser(user);
      setFormData({
        nome: user.nome,
        email: user.email,
        ruolo: user.ruolo
      });
    };

    // Gestisce i cambiamenti nei campi del form
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    };

    // Gestisce il salvataggio delle modifiche
    const handleSaveChanges = async () => {
      setLoading(true);
      setError('');
      try {
        const updatedUser = await adminService.updateUser(editingUser._id, formData);
        setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
        setEditingUser(null);
      } catch (err) {
        console.error('Errore durante l\'aggiornamento dell\'utente:', err);
        setError('Impossibile aggiornare l\'utente. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Gestisce l'eliminazione di un utente
    const handleDeleteUser = async (userId) => {
      if (!window.confirm('Sei sicuro di voler eliminare questo utente? Questa azione non può essere annullata.')) {
        return;
      }

      setLoading(true);
      setError('');
      try {
        await adminService.deleteUser(userId);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        console.error('Errore durante l\'eliminazione dell\'utente:', err);
        setError('Impossibile eliminare l\'utente. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Annulla la modifica
    const handleCancelEdit = () => {
      setEditingUser(null);
      setFormData({
        nome: '',
        email: '',
        ruolo: 'user'
      });
    };

    // Gestisce la creazione di un nuovo utente
    const handleSaveNewUser = async () => {
      setLoading(true);
      setError('');
      try {
        const newUser = await adminService.createUser(formData);
        setUsers([...users, newUser]);
        setEditingUser(null);
        setFormData({
          nome: '',
          email: '',
          ruolo: 'user'
        });
      } catch (err) {
        console.error('Errore durante la creazione dell\'utente:', err);
        setError('Impossibile creare l\'utente. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="bg-secondary-900 p-4 sm:p-6 rounded-sm border border-secondary-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
          <h3 className="text-white text-lg sm:text-xl font-medium">Gestione Utenti</h3>
          <button
            onClick={() => {
              setEditingUser({
                nome: '',
                email: '',
                ruolo: 'user'
              });
              setFormData({
                nome: '',
                email: '',
                ruolo: 'user'
              });
            }}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-primary text-white text-sm rounded-sm hover:bg-primary/90 transition-colors"
          >
            Crea Nuovo Utente
          </button>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-3 sm:p-4 mb-4 sm:mb-6 rounded-sm text-sm">
            {error}
          </div>
        )}

        {editingUser ? (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-base sm:text-lg mb-3 sm:mb-4">Modifica Utente</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Ruolo</label>
                <select
                  name="ruolo"
                  value={formData.ruolo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                >
                  <option value="user">Utente</option>
                  <option value="admin">Amministratore</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-3 sm:px-4 py-2 bg-secondary-800 text-white text-sm rounded-sm hover:bg-secondary-700 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-3 sm:px-4 py-2 bg-primary text-white text-sm rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Salvataggio...' : (isCreating ? 'Crea Articolo' : 'Salva Modifiche')}
              </button>
            </div>
          </div>
        ) : null}

        {loading && !editingUser ? (
          <div className="flex justify-center items-center h-48 sm:h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-xs sm:text-sm text-left text-white">
              <thead className="text-xs uppercase bg-secondary-800">
                <tr>
                  <th className="px-4 sm:px-6 py-2 sm:py-3">Nome</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3">Email</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3">Ruolo</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3">Provider</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="border-b border-secondary-800">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">{user.nome}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 truncate max-w-[120px] sm:max-w-none">{user.email}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${user.ruolo === 'admin' ? 'bg-primary/20 text-primary' : 'bg-secondary-700 text-secondary-300'}`}>
                          {user.ruolo === 'admin' ? 'Amministratore' : 'Utente'}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">{user.authProvider}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-400 hover:text-red-300 text-xs sm:text-sm"
                          >
                            Elimina
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm">
                      Nessun utente trovato
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };
  const RestomodsManagement = () => {
    const [restomods, setRestomods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingRestomod, setEditingRestomod] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
      nome: '',
      marca: '',
      modello: '',
      anno: '',
      descrizione: '',
      prezzo: '',
      immagini: []
    });

    // Carica i restomods
    useEffect(() => {
      const fetchRestomods = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await adminService.getRestomods();
          setRestomods(data);
        } catch (err) {
          console.error('Errore durante il recupero dei restomods:', err);
          setError('Impossibile caricare i restomods. Riprova più tardi.');
        } finally {
          setLoading(false);
        }
      };

      fetchRestomods();
    }, []);

    // Gestisce il click sul pulsante di modifica
    const handleEditClick = (restomod) => {
      setEditingRestomod(restomod);
      setFormData({
        nome: restomod.nome,
        marca: restomod.marca || '',
        modello: restomod.modello || '',
        anno: restomod.anno,
        descrizione: restomod.descrizione,
        prezzo: restomod.prezzo,
        immagini: restomod.immagini || []
      });
    };

    // Gestisce i cambiamenti nei campi del form
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    };

    // Gestisce l'aggiunta di una nuova immagine
    const handleAddImage = () => {
      setFormData({
        ...formData,
        immagini: [...formData.immagini, { url: '', alt: '', isPrimary: formData.immagini.length === 0 }]
      });
    };

    // Gestisce la modifica di un'immagine esistente
    const handleImageChange = (index, field, value) => {
      const updatedImages = [...formData.immagini];
      updatedImages[index] = { ...updatedImages[index], [field]: value };
      setFormData({
        ...formData,
        immagini: updatedImages
      });
    };

    // Gestisce l'impostazione di un'immagine come primaria
    const handleSetPrimary = (index) => {
      const updatedImages = formData.immagini.map((img, i) => ({
        ...img,
        isPrimary: i === index
      }));
      setFormData({
        ...formData,
        immagini: updatedImages
      });
    };

    // Gestisce la rimozione di un'immagine
    const handleRemoveImage = (index) => {
      const updatedImages = [...formData.immagini];
      updatedImages.splice(index, 1);
      
      // Se abbiamo rimosso l'immagine primaria e ci sono ancora immagini, impostiamo la prima come primaria
      if (updatedImages.length > 0 && !updatedImages.some(img => img.isPrimary)) {
        updatedImages[0].isPrimary = true;
      }
      
      setFormData({
        ...formData,
        immagini: updatedImages
      });
    };

    // Gestisce il salvataggio delle modifiche
    const handleSaveChanges = async () => {
      setLoading(true);
      setError('');
      try {
        const updatedRestomod = await adminService.updateRestomod(editingRestomod._id, formData);
        setRestomods(restomods.map(restomod => restomod._id === updatedRestomod._id ? updatedRestomod : restomod));
        setEditingRestomod(null);
      } catch (err) {
        console.error('Errore durante l\'aggiornamento del restomod:', err);
        setError('Impossibile aggiornare il restomod. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Gestisce l'eliminazione di un restomod
    const handleDeleteRestomod = async (restomodId) => {
      if (!window.confirm('Sei sicuro di voler eliminare questo restomod? Questa azione non può essere annullata.')) {
        return;
      }

      setLoading(true);
      setError('');
      try {
        await adminService.deleteRestomod(restomodId);
        setRestomods(restomods.filter(restomod => restomod._id !== restomodId));
      } catch (err) {
        console.error('Errore durante l\'eliminazione del restomod:', err);
        setError('Impossibile eliminare il restomod. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Annulla la modifica
    const handleCancelEdit = () => {
      setEditingRestomod(null);
    };

    // Formatta il prezzo
    const formatPrice = (price, currency = 'EUR') => {
      return new Intl.NumberFormat('it-IT', { style: 'currency', currency }).format(price);
    };
    
    // Ottiene l'immagine principale o la prima disponibile
    const getPrimaryImage = (images) => {
      if (!images || images.length === 0) return null;
      return images.find(img => img.isPrimary) || images[0];
    };

    return (
      <div className="bg-secondary-900 p-4 sm:p-6 rounded-sm border border-secondary-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
          <h3 className="text-white text-lg sm:text-xl font-medium">Gestione Restomods</h3>
          <button
            onClick={() => {
              setEditingRestomod({});
              setIsCreating(true);
              setFormData({
                nome: '',
                marca: '',
                modello: '',
                anno: '',
                descrizione: '',
                prezzo: '',
                immagini: []
              });
            }}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-primary text-white text-sm rounded-sm hover:bg-primary/90 transition-colors"
          >
            Crea Nuovo Restomod
          </button>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-3 sm:p-4 mb-4 sm:mb-6 rounded-sm text-sm">
            {error}
          </div>
        )}

        {editingRestomod ? (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-base sm:text-lg mb-3 sm:mb-4">Modifica Restomod</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Modello</label>
                <input
                  type="text"
                  name="modello"
                  value={formData.modello}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Anno</label>
                <input
                  type="number"
                  name="anno"
                  value={formData.anno}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Prezzo</label>
                <input
                  type="number"
                  name="prezzo"
                  value={formData.prezzo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Descrizione</label>
                <textarea
                  name="descrizione"
                  value={formData.descrizione}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                ></textarea>
              </div>
              
              {/* Gestione immagini */}
              <div className="sm:col-span-2 mt-3 sm:mt-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                  <h5 className="text-white text-sm sm:text-md">Immagini</h5>
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="w-full sm:w-auto px-3 py-1 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors text-xs sm:text-sm"
                  >
                    Aggiungi Immagine
                  </button>
                </div>
                
                {formData.immagini.length === 0 ? (
                  <div className="text-secondary-400 text-center py-3 sm:py-4 border border-dashed border-secondary-700 rounded-sm text-xs sm:text-sm">
                    Nessuna immagine. Clicca "Aggiungi Immagine" per iniziare.
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {formData.immagini.map((img, index) => (
                      <div key={index} className="p-3 sm:p-4 border border-secondary-700 rounded-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3">
                          <div className="sm:col-span-2">
                            <label className="block text-secondary-400 text-xs sm:text-sm mb-1 sm:mb-2">URL Immagine</label>
                            <input
                              type="text"
                              value={img.url}
                              onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                              className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-xs sm:text-sm"
                              placeholder="https://esempio.com/immagine.jpg"
                            />
                          </div>
                          <div>
                            <label className="block text-secondary-400 text-xs sm:text-sm mb-1 sm:mb-2">Testo Alternativo</label>
                            <input
                              type="text"
                              value={img.alt}
                              onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                              className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-xs sm:text-sm"
                              placeholder="Descrizione immagine"
                            />
                          </div>
                        </div>
                        
                        {img.url && (
                          <div className="mb-3">
                            <img 
                              src={img.url} 
                              alt={img.alt || 'Anteprima'} 
                              className="h-24 sm:h-32 object-cover rounded-sm border border-secondary-700 w-full"
                            />
                          </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id={`primary-${index}`}
                              name="primaryImage"
                              checked={img.isPrimary}
                              onChange={() => handleSetPrimary(index)}
                              className="mr-2"
                            />
                            <label htmlFor={`primary-${index}`} className="text-secondary-400 text-xs sm:text-sm">
                              Immagine principale
                            </label>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="text-red-400 hover:text-red-300 text-xs sm:text-sm w-full sm:w-auto text-center sm:text-left"
                          >
                            Rimuovi
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-3 sm:px-4 py-2 bg-secondary-800 text-white text-sm rounded-sm hover:bg-secondary-700 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-3 sm:px-4 py-2 bg-primary text-white text-sm rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Salvataggio...' : (isCreating ? 'Crea Restomod' : 'Salva Modifiche')}
              </button>
            </div>
          </div>
        ) : null}

        {loading && !editingRestomod ? (
          <div className="flex justify-center items-center h-48 sm:h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-xs sm:text-sm text-left text-white">
              <thead className="text-xs uppercase bg-secondary-800">
                <tr>
                  <th className="px-4 sm:px-6 py-2 sm:py-3">Immagine</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3">Nome</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3 hidden sm:table-cell">Marca</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3 hidden md:table-cell">Modello</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3 hidden md:table-cell">Anno</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3">Prezzo</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {restomods.length > 0 ? (
                  restomods.map((restomod) => (
                    <tr key={restomod._id} className="border-b border-secondary-800">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        {restomod.immagini && restomod.immagini.length > 0 ? (
                          <img 
                            src={getPrimaryImage(restomod.immagini)?.url} 
                            alt={getPrimaryImage(restomod.immagini)?.alt || restomod.nome} 
                            className="h-12 w-16 sm:h-16 sm:w-24 object-cover rounded-sm"
                          />
                        ) : (
                          <div className="h-12 w-16 sm:h-16 sm:w-24 bg-secondary-800 flex items-center justify-center rounded-sm">
                            <span className="text-secondary-500 text-xs">No img</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">{restomod.nome}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">{restomod.marca}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 hidden md:table-cell">{restomod.modello}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 hidden md:table-cell">{restomod.anno}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">{formatPrice(restomod.prezzo)}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0">
                          <button
                            onClick={() => handleEditClick(restomod)}
                            className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => handleDeleteRestomod(restomod._id)}
                            className="text-red-400 hover:text-red-300 text-xs sm:text-sm"
                          >
                            Elimina
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm">
                      Nessun restomod trovato
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // Componente per la gestione dei marchi
  const BrandsManagement = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingBrand, setEditingBrand] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
      nome: '',
      descrizione: '',
      logo: '',
      storia: '',
      sede: '',
      annoFondazione: '',
      sito: '',
      contatti: {
        email: '',
        telefono: ''
      },
      immagini: []
    });

    // Carica i marchi
    useEffect(() => {
      const fetchBrands = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await adminService.getBrands();
          setBrands(data);
        } catch (err) {
          console.error('Errore durante il recupero dei marchi:', err);
          setError('Impossibile caricare i marchi. Riprova più tardi.');
        } finally {
          setLoading(false);
        }
      };

      fetchBrands();
    }, []);

    // Gestisce il click sul pulsante di modifica
    const handleEditClick = (brand) => {
      setEditingBrand(brand);
      setFormData({
        nome: brand.nome || '',
        descrizione: brand.descrizione || '',
        logo: brand.logo || '',
        storia: brand.storia || '',
        sede: brand.sede || '',
        annoFondazione: brand.annoFondazione || '',
        sito: brand.sito || '',
        contatti: {
          email: brand.contatti?.email || '',
          telefono: brand.contatti?.telefono || ''
        },
        immagini: brand.immagini || []
      });
    };

    // Gestisce i cambiamenti nei campi del form
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name.startsWith('contatti.')) {
        const field = name.split('.')[1];
        setFormData({
          ...formData,
          contatti: {
            ...formData.contatti,
            [field]: value
          }
        });
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    };

    // Gestisce l'aggiunta di una nuova immagine
    const handleAddImage = () => {
      setFormData({
        ...formData,
        immagini: [...formData.immagini, { url: '', alt: '' }]
      });
    };

    // Gestisce la modifica di un'immagine esistente
    const handleImageChange = (index, field, value) => {
      const updatedImages = [...formData.immagini];
      updatedImages[index] = { ...updatedImages[index], [field]: value };
      setFormData({
        ...formData,
        immagini: updatedImages
      });
    };

    // Gestisce la rimozione di un'immagine
    const handleRemoveImage = (index) => {
      const updatedImages = [...formData.immagini];
      updatedImages.splice(index, 1);
      setFormData({
        ...formData,
        immagini: updatedImages
      });
    };

    // Gestisce il salvataggio delle modifiche
    const handleSaveChanges = async () => {
      setLoading(true);
      setError('');
      try {
        if (isCreating) {
          const newBrand = await adminService.createBrand(formData);
          setBrands([...brands, newBrand]);
        } else {
          const updatedBrand = await adminService.updateBrand(editingBrand._id, formData);
          setBrands(brands.map(brand => brand._id === updatedBrand._id ? updatedBrand : brand));
        }
        setEditingBrand(null);
        setIsCreating(false);
      } catch (err) {
        console.error('Errore durante l\'aggiornamento del marchio:', err);
        setError('Impossibile aggiornare il marchio. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Gestisce la creazione di un nuovo marchio
    const handleCreateNew = () => {
      setFormData({
        nome: '',
        descrizione: '',
        logo: '',
        storia: '',
        sede: '',
        annoFondazione: '',
        sito: '',
        contatti: {
          email: '',
          telefono: ''
        },
        immagini: []
      });
      setEditingBrand({});
      setIsCreating(true);
    };

    // Gestisce l'eliminazione di un marchio
    const handleDeleteBrand = async (brandId) => {
      if (!window.confirm('Sei sicuro di voler eliminare questo marchio? Questa azione non può essere annullata.')) {
        return;
      }

      setLoading(true);
      setError('');
      try {
        await adminService.deleteBrand(brandId);
        setBrands(brands.filter(brand => brand._id !== brandId));
      } catch (err) {
        console.error('Errore durante l\'eliminazione del marchio:', err);
        setError('Impossibile eliminare il marchio. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Annulla la modifica
    const handleCancelEdit = () => {
      setEditingBrand(null);
      setIsCreating(false);
    };
    
    // Ottiene la prima immagine disponibile
    const getFirstImage = (images) => {
      if (!images || images.length === 0) return null;
      return images[0];
    };

    return (
      <div className="bg-secondary-900 p-4 sm:p-6 rounded-sm border border-secondary-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
          <h3 className="text-white text-lg sm:text-xl font-medium">Gestione Marchi</h3>
          {!editingBrand && (
            <button
              onClick={handleCreateNew}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-primary text-white text-sm rounded-sm hover:bg-primary/90 transition-colors"
            >
              Crea Nuovo Marchio
            </button>
          )}
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-3 sm:p-4 mb-4 sm:mb-6 rounded-sm text-sm">
            {error}
          </div>
        )}

        {editingBrand ? (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-base sm:text-lg mb-3 sm:mb-4">Modifica Marchio</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Logo URL</label>
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Sede</label>
                <input
                  type="text"
                  name="sede"
                  value={formData.sede}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Anno Fondazione</label>
                <input
                  type="number"
                  name="annoFondazione"
                  value={formData.annoFondazione}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Sito Web</label>
                <input
                  type="text"
                  name="sito"
                  value={formData.sito}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                  placeholder="https://esempio.com"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Email</label>
                <input
                  type="email"
                  name="contatti.email"
                  value={formData.contatti.email}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                  placeholder="info@esempio.com"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Telefono</label>
                <input
                  type="text"
                  name="contatti.telefono"
                  value={formData.contatti.telefono}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                  placeholder="+39 123 456 7890"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Descrizione</label>
                <textarea
                  name="descrizione"
                  value={formData.descrizione}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Storia</label>
                <textarea
                  name="storia"
                  value={formData.storia}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                ></textarea>
              </div>
              
              {/* Gestione immagini */}
              <div className="sm:col-span-2 mt-3 sm:mt-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                  <h5 className="text-white text-sm sm:text-md">Immagini</h5>
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="w-full sm:w-auto px-3 py-1 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors text-xs sm:text-sm"
                  >
                    Aggiungi Immagine
                  </button>
                </div>
                
                {formData.immagini.length === 0 ? (
                  <div className="text-secondary-400 text-center py-4 border border-dashed border-secondary-700 rounded-sm">
                    Nessuna immagine. Clicca "Aggiungi Immagine" per iniziare.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.immagini.map((img, index) => (
                      <div key={index} className="p-4 border border-secondary-700 rounded-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                          <div>
                            <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">URL Immagine</label>
                            <input
                              type="text"
                              value={img.url}
                              onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                              className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                              placeholder="https://esempio.com/immagine.jpg"
                            />
                          </div>
                          <div>
                            <label className="block text-secondary-400 text-sm mb-1 sm:mb-2">Testo Alternativo</label>
                            <input
                              type="text"
                              value={img.alt}
                              onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                              className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm text-sm"
                              placeholder="Descrizione immagine"
                            />
                          </div>
                        </div>
                        
                        {img.url && (
                          <div className="mb-3">
                            <img 
                              src={img.url} 
                              alt={img.alt || 'Anteprima'} 
                              className="h-24 sm:h-32 w-full sm:w-auto object-cover rounded-sm border border-secondary-700"
                            />
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Rimuovi
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-3 sm:px-4 py-2 bg-secondary-800 text-white text-sm rounded-sm hover:bg-secondary-700 transition-colors w-full sm:w-auto"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-3 sm:px-4 py-2 bg-primary text-white text-sm rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50 w-full sm:w-auto"
              >
                {loading ? 'Salvataggio...' : (isCreating ? 'Crea Marchio' : 'Salva Modifiche')}
              </button>
            </div>
          </div>
        ) : null}

        {loading && !editingBrand ? (
          <div className="flex justify-center items-center h-40 sm:h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-xs sm:text-sm text-left text-white">
              <thead className="text-xs uppercase bg-secondary-800">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3">Logo</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3">Nome</th>
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3">Sede</th>
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-2 sm:py-3">Anno</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3">Immagini</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {brands.length > 0 ? (
                  brands.map((brand) => (
                    <tr key={brand._id} className="border-b border-secondary-800">
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        {brand.logo ? (
                          <img src={brand.logo} alt={brand.nome} className="h-8 sm:h-10 w-auto" />
                        ) : (
                          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-secondary-800 flex items-center justify-center rounded-sm">
                            <span className="text-secondary-500 text-xs">No logo</span>
                          </div>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">{brand.nome}</td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4">{brand.sede}</td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4">{brand.annoFondazione}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        {brand.immagini && brand.immagini.length > 0 ? (
                          <div className="flex items-center">
                            <img 
                              src={getFirstImage(brand.immagini)?.url} 
                              alt={getFirstImage(brand.immagini)?.alt || brand.nome} 
                              className="h-8 sm:h-10 w-12 sm:w-16 object-cover rounded-sm mr-2"
                            />
                            {brand.immagini.length > 1 && (
                              <span className="text-xs text-secondary-400">+{brand.immagini.length - 1}</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-secondary-500 text-xs">Nessuna</span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                          <button
                            onClick={() => handleEditClick(brand)}
                            className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => handleDeleteBrand(brand._id)}
                            className="text-red-400 hover:text-red-300 text-xs sm:text-sm"
                          >
                            Elimina
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-3 sm:px-6 py-3 sm:py-4 text-center text-sm">
                      Nessun marchio trovato
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // Componente per la gestione dei blog
  const BlogsManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
      titolo: '',
      contenuto: '',
      autore: '',
      immagineCopertina: '',
      categoria: '',
      tags: '',
      stato: 'bozza',
      inEvidenza: false,
      commentiAbilitati: true
    });
    const [isCreating, setIsCreating] = useState(false);

    // Carica i blog
    useEffect(() => {
      const fetchBlogs = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await adminService.getBlogPosts();
          console.log('Blog posts ricevuti:', response); // Log per debug
          
          // Verifica la struttura dei dati ricevuti
          let blogData = [];
          
          if (Array.isArray(response)) {
            // Se è già un array, usalo direttamente
            blogData = response;
          } else if (response && typeof response === 'object') {
            // Se è un oggetto, cerca proprietà che potrebbero contenere l'array di blog
            if (response.posts && Array.isArray(response.posts)) {
              blogData = response.posts;
            } else if (response.blogs && Array.isArray(response.blogs)) {
              blogData = response.blogs;
            } else if (response.data && Array.isArray(response.data)) {
              blogData = response.data;
            } else {
              // Se non troviamo array noti, ma l'oggetto ha proprietà come totalPosts, potrebbe essere la risposta principale
              blogData = response;
            }
            console.log('Blog data estratti:', blogData);
          } else {
            // Se non è né un array né un oggetto con dati validi
            console.error('Formato dati blog non valido:', response);
            setError('Formato dati blog non valido');
          }
          
          // Filtra eventuali blog non validi e assicurati che ogni blog abbia le proprietà necessarie
          const validBlogs = Array.isArray(blogData) ? blogData.filter(blog => blog && typeof blog === 'object') : [];
          console.log('Blog validi filtrati:', validBlogs);
          
          setBlogs(validBlogs);
          setLoading(false);
        } catch (err) {
            console.error('Errore durante il recupero dei post del blog:', err);
            setError('Impossibile caricare i post del blog. Riprova più tardi.');
            setBlogs([]);
            setLoading(false);
          } finally {
          // Loading state is already set in try/catch blocks
        }
      };

      fetchBlogs();
    }, []);

    // Gestisce il click sul pulsante di modifica
    const handleEditClick = (blog) => {
      setEditingBlog(blog);
      setFormData({
        titolo: blog.titolo,
        contenuto: blog.contenuto,
        autore: blog.autore,
        immagineCopertina: blog.immagineCopertina,
        categoria: blog.categoria || '',
        tags: blog.tags ? blog.tags.join(', ') : '',
        stato: blog.stato || 'bozza',
        inEvidenza: blog.inEvidenza || false,
        commentiAbilitati: blog.commentiAbilitati !== undefined ? blog.commentiAbilitati : true
      });
    };

    // Gestisce i cambiamenti nei campi del form
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    };

    // Gestisce il salvataggio delle modifiche
    const handleSaveChanges = async () => {
      setLoading(true);
      setError('');
      try {
        // Converti i tags da stringa a array
        const processedData = {
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        };
        
        let updatedBlog;
        if (isCreating) {
          // Creazione di un nuovo blog
          updatedBlog = await adminService.createBlogPost(processedData);
          setBlogs([...blogs, updatedBlog]);
          setIsCreating(false);
        } else {
          // Aggiornamento di un blog esistente
          updatedBlog = await adminService.updateBlogPost(editingBlog._id, processedData);
          setBlogs(blogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog));
        }
        setEditingBlog(null);
        // Reset del form
        setFormData({
          titolo: '',
          contenuto: '',
          autore: '',
          immagineCopertina: '',
          categoria: '',
          tags: '',
          stato: 'bozza',
          inEvidenza: false,
          commentiAbilitati: true
        });
      } catch (err) {
        console.error('Errore durante il salvataggio del post del blog:', err);
        setError('Impossibile salvare il post del blog. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Gestisce l'eliminazione di un blog
    const handleDeleteBlog = async (blogId) => {
      if (!window.confirm('Sei sicuro di voler eliminare questo post del blog? Questa azione non può essere annullata.')) {
        return;
      }

      setLoading(true);
      setError('');
      try {
        await adminService.deleteBlogPost(blogId);
        setBlogs(blogs.filter(blog => blog._id !== blogId));
      } catch (err) {
        console.error('Errore durante l\'eliminazione del post del blog:', err);
        setError('Impossibile eliminare il post del blog. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Gestisce il cambio di stato di un blog
    const handleStatusChange = async (blogId, newStatus) => {
      setLoading(true);
      setError('');
      try {
        await adminService.updateBlogPostStatus(blogId, newStatus);
        setBlogs(blogs.map(blog => {
          if (blog._id === blogId) {
            return { ...blog, stato: newStatus };
          }
          return blog;
        }));
      } catch (err) {
        console.error('Errore durante l\'aggiornamento dello stato del post del blog:', err);
        setError('Impossibile aggiornare lo stato del post del blog. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };
    
    // Gestisce il cambio dello stato di evidenza di un blog
    const handleFeaturedToggle = async (blogId, currentFeatured) => {
      setLoading(true);
      setError('');
      try {
        await adminService.updateBlogFeaturedStatus(blogId, !currentFeatured);
        setBlogs(blogs.map(blog => {
          if (blog._id === blogId) {
            return { ...blog, inEvidenza: !currentFeatured };
          }
          return blog;
        }));
      } catch (err) {
        console.error('Errore durante l\'aggiornamento dello stato di evidenza del post del blog:', err);
        setError('Impossibile aggiornare lo stato di evidenza del post del blog. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };
    
    // Gestisce il cambio dello stato dei commenti di un blog
    const handleCommentsToggle = async (blogId, currentCommentsEnabled) => {
      setLoading(true);
      setError('');
      try {
        await adminService.updateBlogCommentsStatus(blogId, !currentCommentsEnabled);
        setBlogs(blogs.map(blog => {
          if (blog._id === blogId) {
            return { ...blog, commentiAbilitati: !currentCommentsEnabled };
          }
          return blog;
        }));
      } catch (err) {
        console.error('Errore durante l\'aggiornamento dello stato dei commenti del post del blog:', err);
        setError('Impossibile aggiornare lo stato dei commenti del post del blog. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Annulla la modifica
    const handleCancelEdit = () => {
      setEditingBlog(null);
      setIsCreating(false);
      setFormData({
        titolo: '',
        contenuto: '',
        autore: '',
        immagineCopertina: '',
        categoria: '',
        tags: '',
        stato: 'bozza',
        inEvidenza: false,
        commentiAbilitati: true
      });
    };
    
    // Gestisce la creazione di un nuovo blog
    const handleCreateBlog = () => {
      setEditingBlog(null);
      setIsCreating(true);
      setFormData({
        titolo: '',
        contenuto: '',
        autore: '',
        immagineCopertina: '',
        categoria: '',
        tags: '',
        stato: 'bozza',
        inEvidenza: false,
        commentiAbilitati: true
      });
    };

    // Formatta la data
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('it-IT', options);
    };

    return (
      <div className="bg-secondary-900 p-4 sm:p-6 rounded-sm border border-secondary-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h3 className="text-white text-lg sm:text-xl font-medium">Gestione Blog</h3>
          {!editingBlog && !isCreating && (
            <button
              onClick={handleCreateBlog}
              className="bg-primary hover:bg-primary-dark text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-sm transition-all duration-300 w-full sm:w-auto"
            >
              Nuovo Articolo
            </button>
          )}
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-3 sm:p-4 mb-4 sm:mb-6 rounded-sm text-sm sm:text-base">
            {error}
          </div>
        )}

        {(editingBlog || isCreating) ? (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-base sm:text-lg mb-3 sm:mb-4">{isCreating ? 'Nuovo Articolo' : 'Modifica Articolo'}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Titolo</label>
                <input
                  type="text"
                  name="titolo"
                  value={formData.titolo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Autore</label>
                <input
                  type="text"
                  name="autore"
                  value={formData.autore}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Immagine Copertina URL</label>
                <input
                  type="text"
                  name="immagineCopertina"
                  value={formData.immagineCopertina}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Categoria</label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Tags (separati da virgola)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Stato</label>
                <select
                  name="stato"
                  value={formData.stato}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                >
                  <option value="bozza">Bozza</option>
                  <option value="pubblicato">Pubblicato</option>
                  <option value="archiviato">Archiviato</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="inEvidenza"
                  name="inEvidenza"
                  checked={formData.inEvidenza}
                  onChange={(e) => setFormData({...formData, inEvidenza: e.target.checked})}
                  className="bg-secondary-800 border border-secondary-700 text-primary rounded-sm focus:ring-primary"
                />
                <label htmlFor="inEvidenza" className="text-secondary-400 text-sm sm:text-base">In Evidenza</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="commentiAbilitati"
                  name="commentiAbilitati"
                  checked={formData.commentiAbilitati}
                  onChange={(e) => setFormData({...formData, commentiAbilitati: e.target.checked})}
                  className="bg-secondary-800 border border-secondary-700 text-primary rounded-sm focus:ring-primary"
                />
                <label htmlFor="commentiAbilitati" className="text-secondary-400 text-sm sm:text-base">Commenti Abilitati</label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Contenuto</label>
                <textarea
                  name="contenuto"
                  value={formData.contenuto}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary-800 text-white text-sm sm:text-base rounded-sm hover:bg-secondary-700 transition-colors w-full sm:w-auto"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white text-sm sm:text-base rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50 w-full sm:w-auto"
              >
                {loading ? 'Salvataggio...' : (isCreating ? 'Crea Articolo' : 'Salva Modifiche')}
              </button>
            </div>
          </div>
        ) : null}

        {loading && !editingBlog ? (
          <div className="flex justify-center items-center h-40 sm:h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left text-white">
              <thead className="text-xs uppercase bg-secondary-800">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3">Titolo</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 hidden sm:table-cell">Autore</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 hidden md:table-cell">Categoria</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 hidden md:table-cell">Data</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3">Stato</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 hidden lg:table-cell">Visualizzazioni</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 hidden md:table-cell">In Evidenza</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 hidden md:table-cell">Commenti</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {blogs && blogs.length > 0 ? (
                  blogs.filter(blog => blog && typeof blog === 'object' && blog._id).map((blog) => {
                    // Log per debug
                    console.log('Rendering blog:', blog._id, blog.titolo);
                    
                    return (
                      <tr key={blog._id} className="border-b border-secondary-800">
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm">{blog.titolo || 'Titolo non disponibile'}</td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 hidden sm:table-cell text-xs sm:text-sm">{blog.autore || 'Autore non disponibile'}</td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 hidden md:table-cell text-xs sm:text-sm">{blog.categoria || 'Non categorizzato'}</td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 hidden md:table-cell text-xs sm:text-sm">
                          {blog.dataCreazione ? formatDate(blog.dataCreazione) : 'Data non disponibile'}
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm">
                          <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs ${
                            blog.stato === 'pubblicato' ? 'bg-green-900/20 text-green-500' : 
                            blog.stato === 'archiviato' ? 'bg-red-900/20 text-red-500' : 
                            'bg-yellow-900/20 text-yellow-500'
                          }`}>
                            {blog.stato === 'pubblicato' ? 'Pubblicato' : 
                             blog.stato === 'archiviato' ? 'Archiviato' : 'Bozza'}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 hidden lg:table-cell text-xs sm:text-sm">{blog.visualizzazioni || 0}</td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 hidden md:table-cell text-xs sm:text-sm">
                          {blog.inEvidenza ? (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs bg-blue-900/20 text-blue-500">Sì</span>
                          ) : (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs bg-gray-900/20 text-gray-500">No</span>
                          )}
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 hidden md:table-cell text-xs sm:text-sm">
                          {blog.commentiAbilitati ? (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs bg-green-900/20 text-green-500">Abilitati</span>
                          ) : (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs bg-red-900/20 text-red-500">Disabilitati</span>
                          )}
                        </td>
                        <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm">
                          <div className="flex flex-col sm:flex-row gap-1.5 sm:space-x-2">
                            <button
                              onClick={() => handleEditClick(blog)}
                              className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm"
                            >
                              Modifica
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(blog._id)}
                              className="text-red-400 hover:text-red-300 text-xs sm:text-sm"
                            >
                              Elimina
                            </button>
                            {blog.stato !== 'pubblicato' && (
                              <button
                                onClick={() => handleStatusChange(blog._id, 'pubblicato')}
                                className="text-green-400 hover:text-green-300 text-xs sm:text-sm"
                              >
                                Pubblica
                              </button>
                            )}
                            {blog.stato !== 'bozza' && (
                              <button
                                onClick={() => handleStatusChange(blog._id, 'bozza')}
                                className="text-yellow-400 hover:text-yellow-300 text-xs sm:text-sm hidden sm:block"
                              >
                                Bozza
                              </button>
                            )}
                            {blog.stato !== 'archiviato' && (
                              <button
                                onClick={() => handleStatusChange(blog._id, 'archiviato')}
                                className="text-gray-400 hover:text-gray-300 text-xs sm:text-sm hidden sm:block"
                              >
                                Archivia
                              </button>
                            )}
                            <button
                              onClick={() => handleFeaturedToggle(blog._id, blog.inEvidenza)}
                              className={`${blog.inEvidenza ? 'text-blue-400 hover:text-blue-300' : 'text-gray-400 hover:text-gray-300'} text-xs sm:text-sm hidden sm:block`}
                            >
                              {blog.inEvidenza ? 'Rimuovi Evidenza' : 'Metti in Evidenza'}
                            </button>
                            <button
                              onClick={() => handleCommentsToggle(blog._id, blog.commentiAbilitati)}
                              className={`${blog.commentiAbilitati ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'} text-xs sm:text-sm hidden sm:block`}
                            >
                              {blog.commentiAbilitati ? 'Disabilita Commenti' : 'Abilita Commenti'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }).filter(Boolean) // Filtra eventuali elementi null
                ) : (
                  <tr>
                    <td colSpan="9" className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm">
                      Nessun post del blog trovato
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // Componente per la gestione dei pacchetti
  const PackagesManagement = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingPackage, setEditingPackage] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
      nome: '',
      descrizione: '',
      prezzo: '',
      valuta: 'EUR',
      durata: '',
      caratteristiche: '',
      immagine: '',
      attivo: true,
      stripeProductId: '',
      stripePriceId: ''
    });

    // Carica i pacchetti
    useEffect(() => {
      const fetchPackages = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await adminService.getPackages();
          setPackages(data);
        } catch (err) {
          console.error('Errore durante il recupero dei pacchetti:', err);
          setError('Impossibile caricare i pacchetti. Riprova più tardi.');
        } finally {
          setLoading(false);
        }
      };

      fetchPackages();
    }, []);

    // Gestisce il click sul pulsante di modifica
    const handleEditClick = (pkg) => {
      setEditingPackage(pkg);
      setFormData({
        nome: pkg.nome,
        descrizione: pkg.descrizione,
        prezzo: pkg.prezzo.toString(),
        valuta: pkg.valuta || 'EUR',
        durata: pkg.durata,
        caratteristiche: pkg.caratteristiche ? pkg.caratteristiche.join('\n') : '',
        immagine: pkg.immagine || '',
        attivo: pkg.attivo !== undefined ? pkg.attivo : true,
        stripeProductId: pkg.stripeProductId || '',
        stripePriceId: pkg.stripePriceId || ''
      });
    };

    // Gestisce i cambiamenti nei campi del form
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    };

    // Gestisce il salvataggio delle modifiche
    const handleSaveChanges = async () => {
      setLoading(true);
      setError('');
      try {
        // Converti i campi necessari
        const processedData = {
          ...formData,
          prezzo: parseFloat(formData.prezzo),
          caratteristiche: formData.caratteristiche.split('\n').map(item => item.trim()).filter(item => item),
          attivo: Boolean(formData.attivo)
        };
        
        const updatedPackage = await adminService.updatePackage(editingPackage._id, processedData);
        setPackages(packages.map(pkg => pkg._id === updatedPackage._id ? updatedPackage : pkg));
        setEditingPackage(null);
      } catch (err) {
        console.error('Errore durante l\'aggiornamento del pacchetto:', err);
        setError('Impossibile aggiornare il pacchetto. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Gestisce l'eliminazione di un pacchetto
    const handleDeletePackage = async (packageId) => {
      if (!window.confirm('Sei sicuro di voler eliminare questo pacchetto? Questa azione non può essere annullata.')) {
        return;
      }

      setLoading(true);
      setError('');
      try {
        await adminService.deletePackage(packageId);
        setPackages(packages.filter(pkg => pkg._id !== packageId));
      } catch (err) {
        console.error('Errore durante l\'eliminazione del pacchetto:', err);
        setError('Impossibile eliminare il pacchetto. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Annulla la modifica
    const handleCancelEdit = () => {
      setEditingPackage(null);
      setFormData({
        nome: '',
        descrizione: '',
        prezzo: '',
        valuta: 'EUR',
        durata: '',
        caratteristiche: '',
        immagine: '',
        attivo: true,
        stripeProductId: '',
        stripePriceId: ''
      });
    };
    
    // Gestisce il toggle dello stato attivo di un pacchetto
    const handleToggleActive = async (packageId, currentStatus) => {
      setLoading(true);
      setError('');
      try {
        const updatedPackage = await adminService.updatePackage(packageId, { attivo: !currentStatus });
        setPackages(packages.map(pkg => pkg._id === packageId ? updatedPackage : pkg));
      } catch (err) {
        console.error('Errore durante l\'aggiornamento dello stato del pacchetto:', err);
        setError('Impossibile aggiornare lo stato del pacchetto. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };
    
    // Gestisce la creazione di un nuovo pacchetto
    const handleCreatePackage = () => {
      setEditingPackage({});
      setFormData({
        nome: '',
        descrizione: '',
        prezzo: '',
        valuta: 'EUR',
        durata: '',
        caratteristiche: '',
        immagine: '',
        attivo: true,
        stripeProductId: '',
        stripePriceId: ''
      });
    };

    // Gestisce il salvataggio di un nuovo pacchetto
    const handleSaveNewPackage = async () => {
      setLoading(true);
      setError('');
      try {
        // Converti i campi necessari
        const processedData = {
          ...formData,
          prezzo: parseFloat(formData.prezzo),
          caratteristiche: formData.caratteristiche.split('\n').map(item => item.trim()).filter(item => item),
          attivo: Boolean(formData.attivo)
        };
        
        const newPackage = await adminService.createPackage(processedData);
        setPackages([...packages, newPackage]);
        setEditingPackage(null);
        setFormData({
          nome: '',
          descrizione: '',
          prezzo: '',
          valuta: 'EUR',
          durata: '',
          caratteristiche: '',
          immagine: '',
          attivo: true,
          stripeProductId: '',
          stripePriceId: ''
        });
      } catch (err) {
        console.error('Errore durante la creazione del pacchetto:', err);
        setError('Impossibile creare il pacchetto. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Formatta il prezzo
    const formatPrice = (price, currency = 'EUR') => {
      return new Intl.NumberFormat('it-IT', { style: 'currency', currency }).format(price);
    };

    return (
      <div className="bg-secondary-900 p-4 sm:p-6 rounded-sm border border-secondary-800">
        <h3 className="text-white text-lg sm:text-xl font-medium mb-3 sm:mb-4">Gestione Pacchetti</h3>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-3 sm:p-4 mb-4 sm:mb-6 rounded-sm text-sm sm:text-base">
            {error}
          </div>
        )}

        {editingPackage ? (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-base sm:text-lg mb-3 sm:mb-4">Modifica Pacchetto</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Prezzo</label>
                <div className="flex">
                  <input
                    type="number"
                    name="prezzo"
                    value={formData.prezzo}
                    onChange={handleInputChange}
                    className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-l-sm text-sm sm:text-base"
                  />
                  <select
                    name="valuta"
                    value={formData.valuta}
                    onChange={handleInputChange}
                    className="bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-r-sm text-sm sm:text-base"
                  >
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Durata</label>
                <input
                  type="text"
                  name="durata"
                  value={formData.durata}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">URL Immagine</label>
                <input
                  type="text"
                  name="immagine"
                  value={formData.immagine}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Stato</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="attivo"
                    checked={formData.attivo}
                    onChange={(e) => setFormData({...formData, attivo: e.target.checked})}
                    className="mr-2 h-3 w-3 sm:h-4 sm:w-4"
                  />
                  <span className="text-white text-sm sm:text-base">Pacchetto attivo</span>
                </div>
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Stripe Product ID</label>
                <input
                  type="text"
                  name="stripeProductId"
                  value={formData.stripeProductId}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Stripe Price ID</label>
                <input
                  type="text"
                  name="stripePriceId"
                  value={formData.stripePriceId}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Descrizione</label>
                <textarea
                  name="descrizione"
                  value={formData.descrizione}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Caratteristiche (una per riga)</label>
                <textarea
                  name="caratteristiche"
                  value={formData.caratteristiche}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base"
                  placeholder="Inserisci un elemento per riga"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end sm:space-x-3 space-y-2 sm:space-y-0">
              <button
                onClick={handleCancelEdit}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary-800 text-white rounded-sm hover:bg-secondary-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto"
              >
                {loading ? 'Salvataggio...' : (isCreating ? 'Crea Articolo' : 'Salva Modifiche')}
              </button>
            </div>
          </div>
        ) : null}

        {!editingPackage && (
          <div className="mb-4 sm:mb-6">
            <button
              onClick={handleCreatePackage}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              Nuovo Pacchetto
            </button>
          </div>
        )}

        {loading && !editingPackage ? (
          <div className="flex justify-center items-center h-48 sm:h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left text-white">
              <thead className="text-xs uppercase bg-secondary-800">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3">Nome</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3">Prezzo</th>
                  <th className="hidden sm:table-cell px-6 py-3">Valuta</th>
                  <th className="hidden md:table-cell px-6 py-3">Durata</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3">Stato</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {packages.length > 0 ? (
                  packages.map((pkg) => (
                    <tr key={pkg._id} className="border-b border-secondary-800">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{pkg.nome}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{formatPrice(pkg.prezzo, pkg.valuta)}</td>
                      <td className="hidden sm:table-cell px-6 py-4 text-xs sm:text-sm">{pkg.valuta || 'EUR'}</td>
                      <td className="hidden md:table-cell px-6 py-4 text-xs sm:text-sm">{pkg.durata}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs ${pkg.attivo ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                          {pkg.attivo ? 'Attivo' : 'Inattivo'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0 sm:space-x-2 text-xs sm:text-sm">
                          <button
                            onClick={() => handleEditClick(pkg)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => handleToggleActive(pkg._id, pkg.attivo)}
                            className={pkg.attivo ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}
                          >
                            {pkg.attivo ? 'Disattiva' : 'Attiva'}
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg._id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Elimina
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm">
                      Nessun pacchetto trovato
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // Componente per la gestione dei lavori
  const JobsManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingJob, setEditingJob] = useState(null);
    const [formData, setFormData] = useState({
      titolo: '',
      azienda: '',
      descrizione: '',
      requisiti: '',
      tipo: 'full-time',
      luogo: '',
      remoto: false,
      salarioMin: '',
      salarioMax: '',
      valuta: 'EUR',
      dataScadenza: '',
      attivo: true
    });

    // Carica i lavori
    useEffect(() => {
      const fetchJobs = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await adminService.getJobs();
          setJobs(data);
        } catch (err) {
          console.error('Errore durante il recupero dei lavori:', err);
          setError('Impossibile caricare i lavori. Riprova più tardi.');
        } finally {
          setLoading(false);
        }
      };

      fetchJobs();
    }, []);

    // Gestisce il click sul pulsante di modifica
    const handleEditClick = (job) => {
      setEditingJob(job);
      
      // Gestione del salario: se è presente il campo salario ma non salarioMin/salarioMax
      let salarioMin = '';
      let salarioMax = '';
      
      if (job.salario && typeof job.salario === 'string') {
        // Prova a estrarre i valori min e max dal campo salario esistente
        const salarioMatch = job.salario.match(/(\d+)\s*-\s*(\d+)/);
        if (salarioMatch) {
          salarioMin = salarioMatch[1];
          salarioMax = salarioMatch[2];
        } else {
          // Se non è un intervallo, usa lo stesso valore per min e max
          const singleValue = job.salario.replace(/[^0-9]/g, '');
          if (singleValue) {
            salarioMin = singleValue;
          }
        }
      } else {
        // Usa i campi salarioMin e salarioMax se esistono
        salarioMin = job.salarioMin || '';
        salarioMax = job.salarioMax || '';
      }
      
      setFormData({
        titolo: job.titolo,
        azienda: job.azienda || '',
        descrizione: job.descrizione,
        requisiti: Array.isArray(job.requisiti) ? job.requisiti.join('\n') : job.requisiti,
        tipo: job.tipo,
        luogo: job.luogo,
        remoto: job.remoto || false,
        salarioMin,
        salarioMax,
        valuta: job.salario?.valuta || job.valuta || 'EUR',
        dataScadenza: job.dataScadenza ? new Date(job.dataScadenza).toISOString().split('T')[0] : '',
        attivo: job.attivo !== undefined ? job.attivo : true
      });
    };

    // Gestisce i cambiamenti nei campi del form
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    };

    // Gestisce il salvataggio delle modifiche
    const handleSaveChanges = async () => {
      setLoading(true);
      setError('');
      try {
        // Prepara i dati da inviare al backend
        const jobData = {
          ...formData,
          // Converte i requisiti da stringa a array
          requisiti: formData.requisiti ? formData.requisiti.split('\n').filter(req => req.trim() !== '') : [],
          // Struttura il campo salario secondo lo schema
          salario: {
            min: formData.salarioMin ? parseFloat(formData.salarioMin) : undefined,
            max: formData.salarioMax ? parseFloat(formData.salarioMax) : undefined,
            valuta: formData.valuta
          }
        };
        
        let updatedJob;
        if (editingJob) {
          updatedJob = await adminService.updateJob(editingJob._id, jobData);
          setJobs(jobs.map(job => job._id === updatedJob._id ? updatedJob : job));
        } else {
          updatedJob = await adminService.createJob(jobData);
          setJobs([...jobs, updatedJob]);
        }
        setEditingJob(null);
        setFormData({
          titolo: '',
          azienda: '',
          descrizione: '',
          requisiti: '',
          tipo: 'full-time',
          luogo: '',
          remoto: false,
          salarioMin: '',
          salarioMax: '',
          valuta: 'EUR',
          dataScadenza: '',
          attivo: true
        });
      } catch (err) {
        console.error('Errore durante il salvataggio del lavoro:', err);
        setError('Impossibile salvare il lavoro. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Gestisce l'eliminazione di un lavoro
    const handleDeleteJob = async (jobId) => {
      if (!window.confirm('Sei sicuro di voler eliminare questo lavoro? Questa azione non può essere annullata.')) {
        return;
      }

      setLoading(true);
      setError('');
      try {
        await adminService.deleteJob(jobId);
        setJobs(jobs.filter(job => job._id !== jobId));
      } catch (err) {
        console.error('Errore durante l\'eliminazione del lavoro:', err);
        setError('Impossibile eliminare il lavoro. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };
    
    // Gestisce l'attivazione/disattivazione di un lavoro
    const handleToggleActive = async (job) => {
      setLoading(true);
      setError('');
      try {
        const updatedJob = await adminService.updateJob(job._id, {
          ...job,
          attivo: !job.attivo
        });
        setJobs(jobs.map(j => j._id === updatedJob._id ? updatedJob : j));
      } catch (err) {
        console.error('Errore durante l\'aggiornamento dello stato del lavoro:', err);
        setError('Impossibile aggiornare lo stato del lavoro. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Annulla la modifica
    const handleCancelEdit = () => {
      setEditingJob(null);
      setFormData({
        titolo: '',
        azienda: '',
        descrizione: '',
        requisiti: '',
        tipo: 'full-time',
        luogo: '',
        remoto: false,
        salarioMin: '',
        salarioMax: '',
        valuta: 'EUR',
        dataScadenza: '',
        attivo: true
      });
    };

    // Gestisce la creazione di un nuovo lavoro
    const handleCreateJob = () => {
      setEditingJob(null); // Non stiamo modificando un lavoro esistente
      setFormData({
        titolo: '',
        azienda: '',
        descrizione: '',
        requisiti: '',
        tipo: 'full-time',
        luogo: '',
        remoto: false,
        salarioMin: '',
        salarioMax: '',
        valuta: 'EUR',
        dataScadenza: '',
        attivo: true
      });
    };

    // Formatta la data
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('it-IT', options);
    };

    return (
      <div className="bg-secondary-900 p-3 sm:p-6 rounded-sm border border-secondary-800">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
          <h3 className="text-white text-lg sm:text-xl font-medium">Gestione Lavori</h3>
          {!editingJob && (
            <button
              onClick={handleCreateJob}
              className="bg-primary hover:bg-primary-dark text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
            >
              Nuovo Lavoro
            </button>
          )}
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-3 sm:p-4 mb-4 sm:mb-6 rounded-sm text-sm sm:text-base">
            {error}
          </div>
        )}

        {(editingJob !== null || formData.titolo) ? (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-base sm:text-lg mb-3 sm:mb-4">{editingJob ? 'Modifica Lavoro' : 'Nuovo Lavoro'}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Titolo</label>
                <input
                  type="text"
                  name="titolo"
                  value={formData.titolo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Azienda</label>
                <input
                  type="text"
                  name="azienda"
                  value={formData.azienda}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Tipo</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="freelance">Freelance</option>
                  <option value="stage">Stage</option>
                </select>
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Luogo</label>
                <input
                  type="text"
                  name="luogo"
                  value={formData.luogo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remoto"
                  name="remoto"
                  checked={formData.remoto}
                  onChange={handleInputChange}
                  className="mr-2 h-3 w-3 sm:h-4 sm:w-4"
                />
                <label htmlFor="remoto" className="text-secondary-400 text-sm sm:text-base">Lavoro Remoto</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="attivo"
                  name="attivo"
                  checked={formData.attivo}
                  onChange={handleInputChange}
                  className="mr-2 h-3 w-3 sm:h-4 sm:w-4"
                />
                <label htmlFor="attivo" className="text-secondary-400 text-sm sm:text-base">Annuncio Attivo</label>
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Salario Minimo</label>
                <input
                  type="number"
                  name="salarioMin"
                  value={formData.salarioMin}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base"
                  placeholder="Es. 1500"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Salario Massimo</label>
                <input
                  type="number"
                  name="salarioMax"
                  value={formData.salarioMax}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base"
                  placeholder="Es. 2000"
                />
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Valuta</label>
                <select
                  name="valuta"
                  value={formData.valuta}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base"
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              <div>
                <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Data di Scadenza</label>
                <input
                  type="date"
                  name="dataScadenza"
                  value={formData.dataScadenza}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Descrizione</label>
              <textarea
                name="descrizione"
                value={formData.descrizione}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-secondary-800 border border-secondary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base"
                required
              ></textarea>
            </div>
            <div className="mb-3 sm:mb-4">
              <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Requisiti</label>
              <textarea
                name="requisiti"
                value={formData.requisiti}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-secondary-800 border border-secondary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base"
                required
              ></textarea>
            </div>
            <div className="flex flex-col sm:flex-row justify-end sm:space-x-3 space-y-2 sm:space-y-0">
              <button
                onClick={handleCancelEdit}
                className="bg-secondary-700 hover:bg-secondary-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-primary hover:bg-primary-dark text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm transition-all duration-300 text-sm sm:text-base w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? 'Salvataggio...' : 'Salva'}
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-800 text-xs sm:text-sm">
              <thead className="bg-secondary-800">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Titolo</th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Azienda</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Tipo</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Luogo</th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Remoto</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Stato</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Scadenza</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Azioni</th>
                </tr>
              </thead>
              <tbody className="bg-secondary-900 divide-y divide-secondary-800">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job._id} className="border-b border-secondary-800">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{job.titolo}</td>
                      <td className="hidden sm:table-cell px-6 py-4 text-xs sm:text-sm">{job.azienda || 'Non specificata'}</td>
                      <td className="hidden md:table-cell px-6 py-4 text-xs sm:text-sm">{job.tipo}</td>
                      <td className="hidden md:table-cell px-6 py-4 text-xs sm:text-sm">{job.luogo || 'Non specificato'}</td>
                      <td className="hidden sm:table-cell px-6 py-4 text-xs sm:text-sm">
                        {job.remoto ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Sì
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        {job.attivo ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Attivo
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Inattivo
                          </span>
                        )}
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-xs sm:text-sm">{job.dataScadenza ? formatDate(job.dataScadenza) : 'Non specificata'}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                          <button
                            onClick={() => handleEditClick(job)}
                            className="text-xs sm:text-sm text-blue-400 hover:text-blue-300"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => handleToggleActive(job)}
                            className={`text-xs sm:text-sm ${job.attivo ? "text-yellow-400 hover:text-yellow-300" : "text-green-400 hover:text-green-300"}`}
                          >
                            {job.attivo ? 'Disattiva' : 'Attiva'}
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job._id)}
                            className="text-xs sm:text-sm text-red-400 hover:text-red-300"
                          >
                            Elimina
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm">
                      Nessun lavoro trovato
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };


  // Componente per la gestione dei messaggi di contatto
  const MessagesManagement = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Carica i messaggi
    useEffect(() => {
      const fetchMessages = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await adminService.getMessages();
          setMessages(data);
        } catch (err) {
          console.error('Errore durante il recupero dei messaggi:', err);
          setError('Impossibile caricare i messaggi. Riprova più tardi.');
        } finally {
          setLoading(false);
        }
      };

      fetchMessages();
    }, []);

    // Gestisce il click su un messaggio
    const handleMessageClick = async (messageId) => {
      setLoading(true);
      setError('');
      try {
        const message = await adminService.getMessage(messageId);
        setSelectedMessage(message);
      } catch (err) {
        console.error('Errore durante il recupero del messaggio:', err);
        setError('Impossibile caricare il messaggio. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Gestisce l'eliminazione di un messaggio
    const handleDeleteMessage = async (messageId) => {
      if (!window.confirm('Sei sicuro di voler eliminare questo messaggio? Questa azione non può essere annullata.')) {
        return;
      }

      setLoading(true);
      setError('');
      try {
        await adminService.deleteMessage(messageId);
        setMessages(messages.filter(message => message._id !== messageId));
        if (selectedMessage && selectedMessage._id === messageId) {
          setSelectedMessage(null);
        }
      } catch (err) {
        console.error('Errore durante l\'eliminazione del messaggio:', err);
        setError('Impossibile eliminare il messaggio. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Formatta la data
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('it-IT', options);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-secondary-900 rounded-sm border border-secondary-800 overflow-hidden"
      >
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-6">Gestione Contatti</h2>
          
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-white p-3 sm:p-4 mb-4 sm:mb-6 rounded-sm text-sm sm:text-base">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Lista messaggi */}
            <div className="lg:col-span-1 bg-secondary-800 rounded-sm overflow-hidden">
              <div className="p-3 sm:p-4 border-b border-secondary-700">
                <h3 className="text-white text-sm sm:text-base font-medium">Messaggi ricevuti</h3>
              </div>
              
              {loading && messages.length === 0 ? (
                <div className="flex justify-center items-center p-6 sm:p-8">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="p-4 sm:p-6 text-center text-secondary-400 text-sm sm:text-base">
                  Nessun messaggio ricevuto
                </div>
              ) : (
                <div className="max-h-[400px] sm:max-h-[600px] overflow-y-auto">
                  {messages.map((message) => (
                    <div 
                      key={message._id}
                      onClick={() => handleMessageClick(message._id)}
                      className={`p-3 sm:p-4 border-b border-secondary-700 cursor-pointer transition-colors duration-300 ${selectedMessage && selectedMessage._id === message._id ? 'bg-secondary-700' : 'hover:bg-secondary-750'} ${!message.letto ? 'border-l-4 border-l-primary' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="text-white text-sm sm:text-base font-medium">{message.nome}</h4>
                        <span className="text-xs text-secondary-400">{formatDate(message.dataInvio)}</span>
                      </div>
                      <p className="text-secondary-300 text-xs sm:text-sm mt-1">{message.email}</p>
                      <p className="text-secondary-400 text-xs sm:text-sm mt-2 line-clamp-2">{message.messaggio}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Dettaglio messaggio */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-secondary-800 p-4 sm:p-6 rounded-sm"
                >
                  <div className="flex justify-between items-start mb-4 sm:mb-6">
                    <div>
                      <h3 className="text-lg sm:text-xl text-white font-medium">{selectedMessage.nome}</h3>
                      <p className="text-secondary-300 text-xs sm:text-sm mt-1">{selectedMessage.email}</p>
                      {selectedMessage.telefono && (
                        <p className="text-secondary-400 text-xs sm:text-sm mt-1">{selectedMessage.telefono}</p>
                      )}
                      <p className="text-secondary-400 text-xs sm:text-sm mt-2">
                        Ricevuto il {formatDate(selectedMessage.dataInvio)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(selectedMessage._id)}
                      className="text-red-500 hover:text-red-400 transition-colors duration-300 text-sm sm:text-base"
                      title="Elimina messaggio"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  
                  <div className="bg-secondary-850 p-3 sm:p-4 rounded-sm mb-4 sm:mb-6">
                    <h4 className="text-white text-sm sm:text-md font-medium mb-2">Messaggio</h4>
                    <p className="text-secondary-300 text-xs sm:text-sm whitespace-pre-line">{selectedMessage.messaggio}</p>
                  </div>
                  
                  {selectedMessage.allegati && selectedMessage.allegati.length > 0 && (
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-white text-sm sm:text-md font-medium mb-2">Allegati</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {selectedMessage.allegati.map((allegato, index) => (
                          <a
                            key={index}
                            href={allegato.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-2 sm:p-3 bg-secondary-750 rounded-sm hover:bg-secondary-700 transition-colors duration-300"
                          >
                            <FaFile className="text-primary mr-2 sm:mr-3 text-sm sm:text-base" />
                            <span className="text-white text-xs sm:text-sm truncate">{allegato.filename}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="bg-primary hover:bg-primary-dark text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm transition-colors duration-300 flex items-center text-xs sm:text-sm"
                    >
                      <FaReply className="mr-1.5 sm:mr-2" />
                      Rispondi via Email
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-secondary-800 p-6 sm:p-8 rounded-sm flex flex-col items-center justify-center h-48 sm:h-64 shadow-md">
                  <FaEnvelope className="text-secondary-600 text-3xl sm:text-5xl mb-3 sm:mb-4" />
                  <p className="text-secondary-400 text-xs sm:text-sm text-center">Seleziona un messaggio per visualizzarne i dettagli</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Componente per la gestione degli ordini
  const OrdersManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    // Carica gli ordini
    useEffect(() => {
      const fetchOrders = async () => {
        setLoading(true);
        setError('');
        try {
          const data = await adminService.getOrders();
          setOrders(data);
        } catch (err) {
          console.error('Errore durante il recupero degli ordini:', err);
          setError('Impossibile caricare gli ordini. Riprova più tardi.');
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }, []);

    // Filtra gli ordini in base allo stato
    const filteredOrders = filterStatus === 'all' 
      ? orders 
      : orders.filter(order => order.stato === filterStatus);

    // Formatta la data
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('it-IT', options);
    };

    // Gestisce il cambio di stato di un ordine
    const handleStatusChange = async (orderId, newStatus) => {
      if (!window.confirm(`Sei sicuro di voler cambiare lo stato dell'ordine a ${newStatus}?`)) {
        return;
      }

      setLoading(true);
      setError('');
      try {
        const updatedOrder = await adminService.updateOrderStatus(orderId, newStatus);
        setOrders(orders.map(order => order._id === updatedOrder._id ? updatedOrder : order));
        if (selectedOrder && selectedOrder._id === updatedOrder._id) {
          setSelectedOrder(updatedOrder);
        }
      } catch (err) {
        console.error('Errore durante l\'aggiornamento dello stato dell\'ordine:', err);
        setError('Impossibile aggiornare lo stato dell\'ordine. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    // Visualizza i dettagli di un ordine
    const handleViewDetails = (order) => {
      setSelectedOrder(order);
    };

    // Chiude i dettagli dell'ordine
    const handleCloseDetails = () => {
      setSelectedOrder(null);
    };

    return (
      <div className="bg-secondary-900 p-4 sm:p-6 rounded-sm border border-secondary-800">
        <h3 className="text-white text-lg sm:text-xl font-medium mb-3 sm:mb-4">Gestione Ordini</h3>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-3 sm:p-4 mb-4 sm:mb-6 rounded-sm text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Filtri */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-secondary-400 text-sm sm:text-base mb-1 sm:mb-2">Filtra per stato:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-secondary-800 border border-secondary-700 text-white p-1.5 sm:p-2 rounded-sm text-sm sm:text-base w-full sm:w-auto"
          >
            <option value="all">Tutti gli stati</option>
            <option value="in_attesa">In attesa</option>
            <option value="completato">Completato</option>
            <option value="annullato">Annullato</option>
          </select>
        </div>

        {selectedOrder ? (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-secondary-800 rounded-sm">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h4 className="text-white text-base sm:text-lg">Dettagli Ordine #{selectedOrder._id}</h4>
              <button
                onClick={handleCloseDetails}
                className="text-secondary-400 hover:text-white transition-colors duration-300"
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <p className="text-secondary-400 text-sm sm:text-base">Data:</p>
                <p className="text-white text-sm sm:text-base">{formatDate(selectedOrder.dataCreazione)}</p>
              </div>
              <div>
                <p className="text-secondary-400 text-sm sm:text-base">Stato:</p>
                <div className="flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${selectedOrder.stato === 'completato' ? 'bg-green-500' : selectedOrder.stato === 'in_attesa' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                  <span className="text-white text-sm sm:text-base capitalize">{selectedOrder.stato.replace('_', ' ')}</span>
                </div>
              </div>
              <div>
                <p className="text-secondary-400 text-sm sm:text-base">Cliente:</p>
                <p className="text-white text-sm sm:text-base">{selectedOrder.infoCliente?.nome} {selectedOrder.infoCliente?.cognome}</p>
              </div>
              <div>
                <p className="text-secondary-400 text-sm sm:text-base">Email:</p>
                <p className="text-white text-sm sm:text-base">{selectedOrder.infoCliente?.email}</p>
              </div>
              <div>
                <p className="text-secondary-400 text-sm sm:text-base">Indirizzo:</p>
                <p className="text-white text-sm sm:text-base">{selectedOrder.infoCliente?.indirizzo}, {selectedOrder.infoCliente?.citta}, {selectedOrder.infoCliente?.cap}, {selectedOrder.infoCliente?.paese}</p>
              </div>
              <div>
                <p className="text-secondary-400 text-sm sm:text-base">Metodo di pagamento:</p>
                <p className="text-white text-sm sm:text-base">{selectedOrder.infoCliente?.metodoPagamento || 'Non specificato'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-secondary-400 text-sm sm:text-base">Totale:</p>
                <p className="text-white text-base sm:text-lg font-medium">{selectedOrder.totale.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</p>
              </div>
            </div>

            <div className="mb-3 sm:mb-4">
              <h5 className="text-white text-sm sm:text-base font-medium mb-2 sm:mb-3">Prodotti:</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-secondary-800">
                      <th className="text-left text-secondary-400 py-1.5 sm:py-2 px-2 sm:px-3">Prodotto</th>
                      <th className="text-left text-secondary-400 py-1.5 sm:py-2 px-2 sm:px-3">Tipo</th>
                      <th className="text-right text-secondary-400 py-1.5 sm:py-2 px-2 sm:px-3">Prezzo</th>
                      <th className="text-right text-secondary-400 py-1.5 sm:py-2 px-2 sm:px-3">Quantità</th>
                      <th className="text-right text-secondary-400 py-1.5 sm:py-2 px-2 sm:px-3">Subtotale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index} className="border-b border-secondary-800">
                        <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white">{item.nome}</td>
                        <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white capitalize">{item.tipo}</td>
                        <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white text-right">{item.prezzo.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</td>
                        <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white text-right">{item.quantita}</td>
                        <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white text-right">{(item.prezzo * item.quantita).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => handleStatusChange(selectedOrder._id, 'in_attesa')}
                disabled={selectedOrder.stato === 'in_attesa'}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm text-xs sm:text-sm ${selectedOrder.stato === 'in_attesa' ? 'bg-secondary-800 text-secondary-400 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700 text-white transition-colors duration-300'}`}
              >
                Imposta In Attesa
              </button>
              <button
                onClick={() => handleStatusChange(selectedOrder._id, 'completato')}
                disabled={selectedOrder.stato === 'completato'}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm text-xs sm:text-sm ${selectedOrder.stato === 'completato' ? 'bg-secondary-800 text-secondary-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white transition-colors duration-300'}`}
              >
                Imposta Completato
              </button>
              <button
                onClick={() => handleStatusChange(selectedOrder._id, 'annullato')}
                disabled={selectedOrder.stato === 'annullato'}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm text-xs sm:text-sm ${selectedOrder.stato === 'annullato' ? 'bg-secondary-800 text-secondary-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white transition-colors duration-300'}`}
              >
                Imposta Annullato
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="border-b border-secondary-800">
                  <th className="text-left text-secondary-400 py-1.5 sm:py-2 px-2 sm:px-3">ID Ordine</th>
                  <th className="text-left text-secondary-400 py-1.5 sm:py-2 px-2 sm:px-3">Data</th>
                  <th className="text-left text-secondary-400 py-1.5 sm:py-2 px-2 sm:px-3">Cliente</th>
                  <th className="text-right text-secondary-400 py-1.5 sm:py-2 px-2 sm:px-3">Totale</th>
                  <th className="text-center text-secondary-400 py-1.5 sm:py-2 px-2 sm:px-3">Stato</th>
                  <th className="text-center text-secondary-400 py-1.5 sm:py-2 px-2 sm:px-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-secondary-400">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
                        <span className="ml-2">Caricamento...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-secondary-400">
                      Nessun ordine trovato
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b border-secondary-800 hover:bg-secondary-800/50 transition-colors duration-300">
                      <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white">{order._id.substring(0, 8)}...</td>
                      <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white">{formatDate(order.dataCreazione)}</td>
                      <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white">{order.infoCliente?.nome} {order.infoCliente?.cognome}</td>
                      <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white text-right">{order.totale.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</td>
                      <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-white text-center">
                        <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs ${order.stato === 'completato' ? 'bg-green-900/30 text-green-400' : order.stato === 'in_attesa' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1 ${order.stato === 'completato' ? 'bg-green-400' : order.stato === 'in_attesa' ? 'bg-yellow-400' : 'bg-red-400'}`}></span>
                          {order.stato === 'in_attesa' ? 'In attesa' : order.stato === 'completato' ? 'Completato' : 'Annullato'}
                        </span>
                      </td>
                      <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-center">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="text-primary hover:text-primary-dark transition-colors duration-300 text-sm sm:text-base"
                        >
                          Dettagli
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // Renderizza la sezione attiva
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersManagement />;
      case 'restomods':
        return <RestomodsManagement />;
      case 'brands':
        return <BrandsManagement />;
      case 'blogs':
        return <BlogsManagement />;
      case 'packages':
        return <PackagesManagement />;
      case 'messages':
        return <MessagesManagement />;
      case 'jobs':
        return <JobsManagement />;
      case 'customRequests':
        return <CustomRequestsManagement />;
      case 'orders':
        return <OrdersManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-secondary-950 min-h-screen">
      <div className="container-custom px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 sm:mb-6 md:mb-8">Pannello di Amministrazione</h1>
          
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-white p-3 sm:p-4 mb-4 sm:mb-6 rounded-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Sidebar di navigazione */}
            <div className="w-full lg:w-1/4 mb-3 sm:mb-4 lg:mb-0">
              <div className="bg-secondary-900 rounded-sm border border-secondary-800 overflow-hidden">
                <div className="p-2 sm:p-3 md:p-4 border-b border-secondary-800">
                  <h2 className="text-white text-sm sm:text-base font-medium">Menu Amministrazione</h2>
                </div>
                <nav className="p-1.5 sm:p-2 flex flex-row flex-wrap lg:flex-col">
                  {adminSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center w-auto lg:w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 rounded-sm text-xs sm:text-sm transition-all duration-300 mr-1 mb-1 lg:mr-0 lg:mb-2 ${activeSection === section.id ? 'bg-primary/10 text-primary' : 'text-white hover:bg-secondary-800'}`}
                    >
                      <span className="mr-1.5 sm:mr-2 md:mr-3">{section.icon}</span>
                      <span className="hidden xs:inline">{section.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Contenuto principale */}
            <div className="w-full lg:w-3/4">
              {loading ? (
                <div className="flex justify-center items-center h-36 sm:h-48 md:h-64">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                renderActiveSection()
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;