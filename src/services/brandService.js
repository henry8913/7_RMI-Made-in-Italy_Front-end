import api from './api';

const brandService = {
  // Ottieni tutti i costruttori
  getAll: async () => {
    try {
      const response = await api.get('/brands');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni un singolo costruttore per ID
  getById: async (id) => {
    try {
      const response = await api.get(`/brands/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default brandService;