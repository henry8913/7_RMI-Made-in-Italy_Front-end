import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services';

// Creazione del contesto di autenticazione
const AuthContext = createContext();

// Provider del contesto di autenticazione
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verifica se l'utente è autenticato all'avvio dell'applicazione
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Verifica se esiste un token nel localStorage
        const token = localStorage.getItem('token');
        
        if (token) {
          // Imposta il token nell'header delle richieste API
          setAuthToken(token);
          
          // Ottieni i dati dell'utente corrente
          const userData = await authService.getCurrentUser();
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error('Errore durante la verifica dello stato di autenticazione:', err);
        // In caso di errore, rimuovi il token e reimposta lo stato
        localStorage.removeItem('token');
        setCurrentUser(null);
        setError('Sessione scaduta o non valida. Effettua nuovamente il login.');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Funzione per impostare il token di autenticazione negli header delle richieste
  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      // Imposta il token nell'header Authorization per tutte le richieste
      authService.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete authService.api.defaults.headers.common['Authorization'];
    }
  };

  // Funzione per il login
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      // Salva il token e imposta l'utente corrente
      setAuthToken(response.token);
      setCurrentUser(response.user);
      
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Errore durante il login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Funzione per la registrazione
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.register(userData);
      
      // Salva il token e imposta l'utente corrente
      setAuthToken(response.token);
      setCurrentUser(response.user);
      
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Errore durante la registrazione');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Funzione per il logout
  const logout = async () => {
    try {
      setLoading(true);
      
      // Chiama il servizio di logout
      await authService.logout();
      
      // Rimuovi il token e reimposta lo stato
      setAuthToken(null);
      setCurrentUser(null);
    } catch (err) {
      console.error('Errore durante il logout:', err);
      // Anche in caso di errore, rimuovi il token e reimposta lo stato
      setAuthToken(null);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Valore del contesto
  const value = {
    currentUser,
    loading,
    error,
    isAuthenticated: !!currentUser,
    user: currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizzato per utilizzare il contesto di autenticazione
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere utilizzato all\'interno di un AuthProvider');
  }
  return context;
};

export default AuthContext;