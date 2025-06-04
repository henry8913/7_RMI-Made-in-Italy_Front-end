import api from './api';

const testDriveService = {
  // Prenota un test drive
  book: async (testDriveData) => {
    try {
      const response = await api.post('/test-drive', testDriveData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni tutti i test drive dell'utente corrente
  getUserTestDrives: async () => {
    try {
      const response = await api.get('/test-drive/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni un singolo test drive per ID
  getById: async (id) => {
    try {
      const response = await api.get(`/test-drive/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Annulla un test drive (simulato poiché non esiste un endpoint specifico)
  cancel: async (id) => {
    try {
      // Poiché non esiste un endpoint specifico per l'annullamento da parte dell'utente,
      // possiamo simulare questa funzionalità utilizzando l'endpoint di aggiornamento dello stato
      // che è accessibile solo agli admin. In una implementazione reale, dovresti aggiungere
      // un endpoint specifico nel backend.
      console.warn('Funzionalità di annullamento non implementata nel backend');
      return { success: false, message: 'Funzionalità non disponibile' };
    } catch (error) {
      throw error;
    }
  },

  // Verifica disponibilità date (simulato poiché non esiste un endpoint specifico)
  checkAvailability: async (modelId, date) => {
    try {
      // Poiché non esiste un endpoint per verificare la disponibilità,
      // restituiamo orari predefiniti
      console.warn('Endpoint di disponibilità non implementato nel backend');
      return {
        availableTimes: [
          '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
        ]
      };
    } catch (error) {
      throw error;
    }
  },
};

export default testDriveService;