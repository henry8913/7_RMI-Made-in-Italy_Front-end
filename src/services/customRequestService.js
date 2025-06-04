import api from './api';

const customRequestService = {
  // Invia una nuova richiesta personalizzata
  create: async (requestData) => {
    try {
      // Verifica se requestData è un'istanza di FormData
      if (requestData instanceof FormData) {
        // Se è FormData, imposta l'header corretto per multipart/form-data
        const response = await api.post('/custom-requests', requestData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      } else {
        // Se è un oggetto JSON normale
        const response = await api.post('/custom-requests', requestData);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  },

  // Ottieni tutte le richieste dell'utente corrente
  getUserRequests: async () => {
    try {
      const response = await api.get('/custom-requests/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni una singola richiesta per ID
  getById: async (id) => {
    try {
      const response = await api.get(`/custom-requests/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Aggiorna una richiesta esistente
  update: async (id, requestData) => {
    try {
      const response = await api.put(`/custom-requests/${id}`, requestData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Annulla una richiesta
  cancel: async (id) => {
    try {
      const response = await api.put(`/custom-requests/${id}/annulla`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Accetta un preventivo
  acceptQuote: async (id) => {
    try {
      const response = await api.put(`/custom-requests/${id}/accetta`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Carica un allegato per una richiesta
  uploadAttachment: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('allegato', file);
      
      const response = await api.post(`/custom-requests/${id}/allegati`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default customRequestService;