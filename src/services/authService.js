import api from './api';

const authService = {
  // Registrazione utente
  register: async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login utente
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout utente
  logout: async () => {
    try {
      const response = await api.post('/api/auth/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni utente corrente
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // URL per login con Google
  getGoogleAuthUrl: () => {
    return `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  },
};

export default authService;