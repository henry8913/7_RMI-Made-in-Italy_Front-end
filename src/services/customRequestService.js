import api from './api';

const customRequestService = {
  // Invia una nuova richiesta personalizzata
  create: async (requestData) => {
    try {
      const response = await api.post('/api/custom-requests', requestData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni tutte le richieste dell'utente corrente
  getUserRequests: async () => {
    try {
      const response = await api.get('/api/custom-requests/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni una singola richiesta per ID
  getById: async (id) => {
    try {
      const response = await api.get(`/api/custom-requests/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Aggiorna una richiesta esistente
  update: async (id, requestData) => {
    try {
      const response = await api.put(`/api/custom-requests/${id}`, requestData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Annulla una richiesta
  cancel: async (id) => {
    try {
      const response = await api.put(`/api/custom-requests/${id}/annulla`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Accetta un preventivo
  acceptQuote: async (id) => {
    try {
      const response = await api.put(`/api/custom-requests/${id}/accetta`);
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
      
      const response = await api.post(`/api/custom-requests/${id}/allegati`, formData, {
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