import api from './api';

// Servizio per la gestione dell'autenticazione
export const authService = {
  api,

  // Registrazione utente
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      throw error;
    }
  },

  // Login utente
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Errore durante il login:', error);
      throw error;
    }
  },

  // Logout utente
  async logout() {
    try {
      // Rimuovi il token dal localStorage
      localStorage.removeItem('token');
      // Rimuovi l'header di autorizzazione
      delete api.defaults.headers.common['Authorization'];
      return { success: true };
    } catch (error) {
      console.error('Errore durante il logout:', error);
      throw error;
    }
  },

  // Ottieni l'utente corrente
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero dell\'utente corrente:', error);
      throw error;
    }
  },

  // Ottieni l'URL per l'autenticazione Google
  async getGoogleAuthUrl() {
    try {
      const response = await api.get('/auth/google');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero dell\'URL di autenticazione Google:', error);
      throw error;
    }
  },
};

export default authService;