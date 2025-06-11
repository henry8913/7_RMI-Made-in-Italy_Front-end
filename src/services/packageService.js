import api from './api';

const packageService = {
  // Ottieni tutti i pacchetti disponibili
  getAll: async () => {
    try {
      const response = await api.get('/packages');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni un singolo pacchetto per ID
  getById: async (id) => {
    try {
      const response = await api.get(`/packages/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Acquista un pacchetto
  purchase: async (packageId) => {
    try {
      const response = await api.post(`/packages/${packageId}/acquista`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni lo stato di una sessione di pagamento
  getCheckoutStatus: async (sessionId) => {
    try {
      const response = await api.get(`/packages/checkout-status/${sessionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni gli ordini dell'utente corrente
  getUserOrders: async () => {
    try {
      const response = await api.get('/packages/user/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default packageService;