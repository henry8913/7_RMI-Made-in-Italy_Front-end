import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FaUsers, FaCar, FaBuilding, FaBlog, FaBox, FaEnvelope, FaBriefcase, FaClipboardList } from 'react-icons/fa';
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
    jobs: 0
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
  ];

  // Componente per la dashboard
  const Dashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="bg-secondary-900 p-6 rounded-sm border border-secondary-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-400 text-sm capitalize">{key}</p>
              <h3 className="text-white text-2xl font-medium mt-1">{value}</h3>
            </div>
            <div className="text-primary text-2xl">
              {key === 'users' && <FaUsers />}
              {key === 'restomods' && <FaCar />}
              {key === 'brands' && <FaBuilding />}
              {key === 'blogs' && <FaBlog />}
              {key === 'packages' && <FaBox />}
              {key === 'messages' && <FaEnvelope />}
              {key === 'jobs' && <FaBriefcase />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

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
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
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
    };

    return (
      <div className="bg-secondary-900 p-6 rounded-sm border border-secondary-800">
        <h3 className="text-white text-xl font-medium mb-4">Gestione Utenti</h3>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-4 mb-6 rounded-sm">
            {error}
          </div>
        )}

        {editingUser ? (
          <div className="mb-6 p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-lg mb-4">Modifica Utente</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-secondary-400 mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Ruolo</label>
                <select
                  name="ruolo"
                  value={formData.ruolo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                >
                  <option value="user">Utente</option>
                  <option value="admin">Amministratore</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-secondary-800 text-white rounded-sm hover:bg-secondary-700 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Salvataggio...' : (isCreating ? 'Crea Articolo' : 'Salva Modifiche')}
              </button>
            </div>
          </div>
        ) : null}

        {loading && !editingUser ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white">
              <thead className="text-xs uppercase bg-secondary-800">
                <tr>
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Ruolo</th>
                  <th className="px-6 py-3">Provider</th>
                  <th className="px-6 py-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="border-b border-secondary-800">
                      <td className="px-6 py-4">{user.nome}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${user.ruolo === 'admin' ? 'bg-primary/20 text-primary' : 'bg-secondary-700 text-secondary-300'}`}>
                          {user.ruolo === 'admin' ? 'Amministratore' : 'Utente'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{user.authProvider}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
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
                    <td colSpan="5" className="px-6 py-4 text-center">
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
      immagine: '',
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
        marca: restomod.marca,
        modello: restomod.modello,
        anno: restomod.anno,
        descrizione: restomod.descrizione,
        prezzo: restomod.prezzo,
        immagine: restomod.immagine || '',
        immagini: restomod.immagini || []
      });
    };

    // Gestisce i cambiamenti nei campi del form
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
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
    const formatPrice = (price) => {
      return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price);
    };

    return (
      <div className="bg-secondary-900 p-6 rounded-sm border border-secondary-800">
        <h3 className="text-white text-xl font-medium mb-4">Gestione Restomods</h3>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-4 mb-6 rounded-sm">
            {error}
          </div>
        )}

        {editingRestomod ? (
          <div className="mb-6 p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-lg mb-4">Modifica Restomod</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-secondary-400 mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Modello</label>
                <input
                  type="text"
                  name="modello"
                  value={formData.modello}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Anno</label>
                <input
                  type="number"
                  name="anno"
                  value={formData.anno}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Prezzo</label>
                <input
                  type="number"
                  name="prezzo"
                  value={formData.prezzo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Immagine URL</label>
                <input
                  type="text"
                  name="immagine"
                  value={formData.immagine}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                  placeholder="URL dell'immagine principale"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-secondary-400 mb-2">Descrizione</label>
                <textarea
                  name="descrizione"
                  value={formData.descrizione}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-secondary-800 text-white rounded-sm hover:bg-secondary-700 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Salvataggio...' : (isCreating ? 'Crea Articolo' : 'Salva Modifiche')}
              </button>
            </div>
          </div>
        ) : null}

        {loading && !editingRestomod ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white">
              <thead className="text-xs uppercase bg-secondary-800">
                <tr>
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Marca</th>
                  <th className="px-6 py-3">Modello</th>
                  <th className="px-6 py-3">Anno</th>
                  <th className="px-6 py-3">Prezzo</th>
                  <th className="px-6 py-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {restomods.length > 0 ? (
                  restomods.map((restomod) => (
                    <tr key={restomod._id} className="border-b border-secondary-800">
                      <td className="px-6 py-4">{restomod.nome}</td>
                      <td className="px-6 py-4">{restomod.marca}</td>
                      <td className="px-6 py-4">{restomod.modello}</td>
                      <td className="px-6 py-4">{restomod.anno}</td>
                      <td className="px-6 py-4">{formatPrice(restomod.prezzo)}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(restomod)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => handleDeleteRestomod(restomod._id)}
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
                    <td colSpan="6" className="px-6 py-4 text-center">
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
      paese: ''
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
        nome: brand.nome,
        descrizione: brand.descrizione,
        logo: brand.logo,
        paese: brand.paese
      });
    };

    // Gestisce i cambiamenti nei campi del form
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    // Gestisce il salvataggio delle modifiche
    const handleSaveChanges = async () => {
      setLoading(true);
      setError('');
      try {
        const updatedBrand = await adminService.updateBrand(editingBrand._id, formData);
        setBrands(brands.map(brand => brand._id === updatedBrand._id ? updatedBrand : brand));
        setEditingBrand(null);
      } catch (err) {
        console.error('Errore durante l\'aggiornamento del marchio:', err);
        setError('Impossibile aggiornare il marchio. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
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
    };

    return (
      <div className="bg-secondary-900 p-6 rounded-sm border border-secondary-800">
        <h3 className="text-white text-xl font-medium mb-4">Gestione Marchi</h3>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-4 mb-6 rounded-sm">
            {error}
          </div>
        )}

        {editingBrand ? (
          <div className="mb-6 p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-lg mb-4">Modifica Marchio</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-secondary-400 mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Paese</label>
                <input
                  type="text"
                  name="paese"
                  value={formData.paese}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Logo URL</label>
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-secondary-400 mb-2">Descrizione</label>
                <textarea
                  name="descrizione"
                  value={formData.descrizione}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-secondary-800 text-white rounded-sm hover:bg-secondary-700 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Salvataggio...' : (isCreating ? 'Crea Articolo' : 'Salva Modifiche')}
              </button>
            </div>
          </div>
        ) : null}

        {loading && !editingBrand ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white">
              <thead className="text-xs uppercase bg-secondary-800">
                <tr>
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Paese</th>
                  <th className="px-6 py-3">Logo</th>
                  <th className="px-6 py-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {brands.length > 0 ? (
                  brands.map((brand) => (
                    <tr key={brand._id} className="border-b border-secondary-800">
                      <td className="px-6 py-4">{brand.nome}</td>
                      <td className="px-6 py-4">{brand.paese}</td>
                      <td className="px-6 py-4">
                        {brand.logo && (
                          <img src={brand.logo} alt={brand.nome} className="h-8 w-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(brand)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => handleDeleteBrand(brand._id)}
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
                    <td colSpan="4" className="px-6 py-4 text-center">
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
      categorie: '',
      stato: 'bozza'
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
        categorie: blog.categorie ? blog.categorie.join(', ') : '',
        stato: blog.stato || 'bozza'
      });
    };

    // Gestisce i cambiamenti nei campi del form
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    // Gestisce il salvataggio delle modifiche
    const handleSaveChanges = async () => {
      setLoading(true);
      setError('');
      try {
        // Converti le categorie da stringa a array
        const processedData = {
          ...formData,
          categorie: formData.categorie.split(',').map(cat => cat.trim()).filter(cat => cat)
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
          categorie: '',
          stato: 'bozza'
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

    // Annulla la modifica
    const handleCancelEdit = () => {
      setEditingBlog(null);
      setIsCreating(false);
      setFormData({
        titolo: '',
        contenuto: '',
        autore: '',
        immagineCopertina: '',
        categorie: '',
        stato: 'bozza'
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
        categorie: '',
        stato: 'bozza'
      });
    };

    // Formatta la data
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('it-IT', options);
    };

    return (
      <div className="bg-secondary-900 p-6 rounded-sm border border-secondary-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-xl font-medium">Gestione Blog</h3>
          {!editingBlog && !isCreating && (
            <button
              onClick={handleCreateBlog}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-sm transition-all duration-300"
            >
              Nuovo Articolo
            </button>
          )}
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-4 mb-6 rounded-sm">
            {error}
          </div>
        )}

        {(editingBlog || isCreating) ? (
          <div className="mb-6 p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-lg mb-4">{isCreating ? 'Nuovo Articolo' : 'Modifica Articolo'}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-secondary-400 mb-2">Titolo</label>
                <input
                  type="text"
                  name="titolo"
                  value={formData.titolo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Autore</label>
                <input
                  type="text"
                  name="autore"
                  value={formData.autore}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Immagine Copertina URL</label>
                <input
                  type="text"
                  name="immagineCopertina"
                  value={formData.immagineCopertina}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Categorie (separate da virgola)</label>
                <input
                  type="text"
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Stato</label>
                <select
                  name="stato"
                  value={formData.stato}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                >
                  <option value="bozza">Bozza</option>
                  <option value="pubblicato">Pubblicato</option>
                  <option value="archiviato">Archiviato</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-secondary-400 mb-2">Contenuto</label>
                <textarea
                  name="contenuto"
                  value={formData.contenuto}
                  onChange={handleInputChange}
                  rows="8"
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-secondary-800 text-white rounded-sm hover:bg-secondary-700 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Salvataggio...' : (isCreating ? 'Crea Articolo' : 'Salva Modifiche')}
              </button>
            </div>
          </div>
        ) : null}

        {loading && !editingBlog ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white">
              <thead className="text-xs uppercase bg-secondary-800">
                <tr>
                  <th className="px-6 py-3">Titolo</th>
                  <th className="px-6 py-3">Autore</th>
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3">Stato</th>
                  <th className="px-6 py-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {blogs && blogs.length > 0 ? (
                  blogs.filter(blog => blog && typeof blog === 'object' && blog._id).map((blog) => {
                    // Log per debug
                    console.log('Rendering blog:', blog._id, blog.titolo);
                    
                    return (
                      <tr key={blog._id} className="border-b border-secondary-800">
                        <td className="px-6 py-4">{blog.titolo || 'Titolo non disponibile'}</td>
                        <td className="px-6 py-4">{blog.autore || 'Autore non disponibile'}</td>
                        <td className="px-6 py-4">
                          {blog.dataCreazione ? formatDate(blog.dataCreazione) : 'Data non disponibile'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            blog.stato === 'pubblicato' ? 'bg-green-900/20 text-green-500' : 
                            blog.stato === 'archiviato' ? 'bg-red-900/20 text-red-500' : 
                            'bg-yellow-900/20 text-yellow-500'
                          }`}>
                            {blog.stato === 'pubblicato' ? 'Pubblicato' : 
                             blog.stato === 'archiviato' ? 'Archiviato' : 'Bozza'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditClick(blog)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              Modifica
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(blog._id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Elimina
                            </button>
                            {blog.stato !== 'pubblicato' && (
                              <button
                                onClick={() => handleStatusChange(blog._id, 'pubblicato')}
                                className="text-green-400 hover:text-green-300"
                              >
                                Pubblica
                              </button>
                            )}
                            {blog.stato !== 'bozza' && (
                              <button
                                onClick={() => handleStatusChange(blog._id, 'bozza')}
                                className="text-yellow-400 hover:text-yellow-300"
                              >
                                Bozza
                              </button>
                            )}
                            {blog.stato !== 'archiviato' && (
                              <button
                                onClick={() => handleStatusChange(blog._id, 'archiviato')}
                                className="text-gray-400 hover:text-gray-300"
                              >
                                Archivia
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  }).filter(Boolean) // Filtra eventuali elementi null
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center">
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
      durata: '',
      inclusi: '',
      immagine: ''
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
        durata: pkg.durata,
        inclusi: pkg.inclusi ? pkg.inclusi.join('\n') : '',
        immagine: pkg.immagine || ''
      });
    };

    // Gestisce i cambiamenti nei campi del form
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
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
          inclusi: formData.inclusi.split('\n').map(item => item.trim()).filter(item => item)
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
    };

    // Formatta il prezzo
    const formatPrice = (price) => {
      return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price);
    };

    return (
      <div className="bg-secondary-900 p-6 rounded-sm border border-secondary-800">
        <h3 className="text-white text-xl font-medium mb-4">Gestione Pacchetti</h3>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-4 mb-6 rounded-sm">
            {error}
          </div>
        )}

        {editingPackage ? (
          <div className="mb-6 p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-lg mb-4">Modifica Pacchetto</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-secondary-400 mb-2">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Prezzo (€)</label>
                <input
                  type="number"
                  name="prezzo"
                  value={formData.prezzo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Durata</label>
                <input
                  type="text"
                  name="durata"
                  value={formData.durata}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">URL Immagine</label>
                <input
                  type="text"
                  name="immagine"
                  value={formData.immagine}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-secondary-400 mb-2">Descrizione</label>
                <textarea
                  name="descrizione"
                  value={formData.descrizione}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-secondary-400 mb-2">Inclusi (uno per riga)</label>
                <textarea
                  name="inclusi"
                  value={formData.inclusi}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full bg-secondary-800 border border-secondary-700 text-white p-2 rounded-sm"
                  placeholder="Inserisci un elemento per riga"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-secondary-800 text-white rounded-sm hover:bg-secondary-700 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Salvataggio...' : (isCreating ? 'Crea Articolo' : 'Salva Modifiche')}
              </button>
            </div>
          </div>
        ) : null}

        {loading && !editingPackage ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white">
              <thead className="text-xs uppercase bg-secondary-800">
                <tr>
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Prezzo</th>
                  <th className="px-6 py-3">Durata</th>
                  <th className="px-6 py-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {packages.length > 0 ? (
                  packages.map((pkg) => (
                    <tr key={pkg._id} className="border-b border-secondary-800">
                      <td className="px-6 py-4">{pkg.nome}</td>
                      <td className="px-6 py-4">{formatPrice(pkg.prezzo)}</td>
                      <td className="px-6 py-4">{pkg.durata}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(pkg)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Modifica
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
                    <td colSpan="4" className="px-6 py-4 text-center">
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
      descrizione: '',
      requisiti: '',
      tipo: 'Full-time',
      luogo: '',
      salarioMin: '',
      salarioMax: '',
      dataScadenza: ''
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
        descrizione: job.descrizione,
        requisiti: job.requisiti,
        tipo: job.tipo,
        luogo: job.luogo,
        salarioMin,
        salarioMax,
        dataScadenza: job.dataScadenza ? new Date(job.dataScadenza).toISOString().split('T')[0] : ''
      });
    };

    // Gestisce i cambiamenti nei campi del form
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
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
          // Formatta il salario come intervallo se entrambi i valori sono presenti
          salario: formData.salarioMin && formData.salarioMax 
            ? `${formData.salarioMin} - ${formData.salarioMax} €` 
            : formData.salarioMin 
              ? `${formData.salarioMin} €` 
              : formData.salarioMax 
                ? `${formData.salarioMax} €` 
                : ''
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
          descrizione: '',
          requisiti: '',
          tipo: 'Full-time',
          luogo: '',
          salarioMin: '',
          salarioMax: '',
          dataScadenza: ''
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

    // Annulla la modifica
    const handleCancelEdit = () => {
      setEditingJob(null);
      setFormData({
        titolo: '',
        descrizione: '',
        requisiti: '',
        tipo: 'Full-time',
        luogo: '',
        salarioMin: '',
        salarioMax: '',
        dataScadenza: ''
      });
    };

    // Gestisce la creazione di un nuovo lavoro
    const handleCreateJob = () => {
      setEditingJob(null); // Non stiamo modificando un lavoro esistente
      setFormData({
        titolo: '',
        descrizione: '',
        requisiti: '',
        tipo: 'Full-time',
        luogo: '',
        salarioMin: '',
        salarioMax: '',
        dataScadenza: ''
      });
    };

    // Formatta la data
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('it-IT', options);
    };

    return (
      <div className="bg-secondary-900 p-6 rounded-sm border border-secondary-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-xl font-medium">Gestione Lavori</h3>
          {!editingJob && (
            <button
              onClick={handleCreateJob}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-sm transition-all duration-300"
            >
              Nuovo Lavoro
            </button>
          )}
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-white p-4 mb-6 rounded-sm">
            {error}
          </div>
        )}

        {(editingJob !== null || formData.titolo) ? (
          <div className="mb-6 p-4 border border-secondary-800 rounded-sm">
            <h4 className="text-white text-lg mb-4">{editingJob ? 'Modifica Lavoro' : 'Nuovo Lavoro'}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-secondary-400 mb-2">Titolo</label>
                <input
                  type="text"
                  name="titolo"
                  value={formData.titolo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-4 py-2 rounded-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Tipo</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-4 py-2 rounded-sm"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Stage">Stage</option>
                </select>
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Luogo</label>
                <input
                  type="text"
                  name="luogo"
                  value={formData.luogo}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-4 py-2 rounded-sm"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Salario Minimo (€)</label>
                <input
                  type="number"
                  name="salarioMin"
                  value={formData.salarioMin}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-4 py-2 rounded-sm"
                  placeholder="Es. 1500"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Salario Massimo (€)</label>
                <input
                  type="number"
                  name="salarioMax"
                  value={formData.salarioMax}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-4 py-2 rounded-sm"
                  placeholder="Es. 2000"
                />
              </div>
              <div>
                <label className="block text-secondary-400 mb-2">Data di Scadenza</label>
                <input
                  type="date"
                  name="dataScadenza"
                  value={formData.dataScadenza}
                  onChange={handleInputChange}
                  className="w-full bg-secondary-800 border border-secondary-700 text-white px-4 py-2 rounded-sm"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-secondary-400 mb-2">Descrizione</label>
              <textarea
                name="descrizione"
                value={formData.descrizione}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-secondary-800 border border-secondary-700 text-white px-4 py-2 rounded-sm"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-secondary-400 mb-2">Requisiti</label>
              <textarea
                name="requisiti"
                value={formData.requisiti}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-secondary-800 border border-secondary-700 text-white px-4 py-2 rounded-sm"
                required
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="bg-secondary-700 hover:bg-secondary-600 text-white px-4 py-2 rounded-sm transition-all duration-300"
              >
                Annulla
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-sm transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Salvataggio...' : 'Salva'}
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-800">
              <thead className="bg-secondary-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Titolo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Luogo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Scadenza</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-400 uppercase tracking-wider">Azioni</th>
                </tr>
              </thead>
              <tbody className="bg-secondary-900 divide-y divide-secondary-800">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job._id} className="border-b border-secondary-800">
                      <td className="px-6 py-4">{job.titolo}</td>
                      <td className="px-6 py-4">{job.tipo}</td>
                      <td className="px-6 py-4">{job.luogo || 'Non specificato'}</td>
                      <td className="px-6 py-4">{job.dataScadenza ? formatDate(job.dataScadenza) : 'Non specificata'}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(job)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job._id)}
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
                    <td colSpan="5" className="px-6 py-4 text-center">
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
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="pt-32 pb-20 bg-secondary-950 min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-light text-white mb-8">Pannello di Amministrazione</h1>
          
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-white p-4 mb-6 rounded-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar di navigazione */}
            <div className="lg:w-1/4">
              <div className="bg-secondary-900 rounded-sm border border-secondary-800 overflow-hidden">
                <div className="p-4 border-b border-secondary-800">
                  <h2 className="text-white font-medium">Menu Amministrazione</h2>
                </div>
                <nav className="p-2">
                  {adminSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center w-full px-4 py-3 rounded-sm text-sm transition-all duration-300 ${activeSection === section.id ? 'bg-primary/10 text-primary' : 'text-white hover:bg-secondary-800'}`}
                    >
                      <span className="mr-3">{section.icon}</span>
                      {section.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Contenuto principale */}
            <div className="lg:w-3/4">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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