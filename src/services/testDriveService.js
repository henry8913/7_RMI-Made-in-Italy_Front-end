import api from './api';

const testDriveService = {
  // Prenota un test drive
  book: async (testDriveData) => {
    try {
      const response = await api.post('/api/test-drive', testDriveData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni tutti i test drive dell'utente corrente
  getUserTestDrives: async () => {
    try {
      const response = await api.get('/api/test-drive/utente');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni un singolo test drive per ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/test-drive/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Annulla un test drive
  cancel: async (id) => {
    try {
      const response = await api.put(`/api/test-drive/${id}/annulla`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Verifica disponibilità date
  checkAvailability: async (modelId, date) => {
    try {
      const response = await api.get('/api/test-drive/disponibilita', {
        params: { modello: modelId, data: date }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default testDriveService;