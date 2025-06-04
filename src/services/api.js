import axios from 'axios';

// Determina il baseURL in base all'ambiente
const getBaseUrl = () => {
  // In produzione, usa l'URL completo dal .env
  if (import.meta.env.PROD && import.meta.env.VITE_BACKEND_URL) {
    return `${import.meta.env.VITE_BACKEND_URL}/api`;
  }
  // In sviluppo, usa il proxy di Vite
  return '/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per aggiungere il token di autenticazione alle richieste
api.interceptors.request.use(
  (config) => {
    // Ottieni il token dal localStorage ad ogni richiesta
    const token = localStorage.getItem('token');
    if (token) {
      // Assicurati che l'header Authorization sia sempre aggiornato
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor per gestire le risposte e gli errori
api.interceptors.response.use(
  (response) => {
    // Log per debug delle risposte
    console.log(`API Response [${response.config.method.toUpperCase()}] ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    // Gestisci errori di autenticazione (401)
    if (error.response && error.response.status === 401) {
      // Rimuovi il token se è scaduto o non valido
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      
      // Reindirizza alla pagina di login se necessario
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export default api;