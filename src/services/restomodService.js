import api from './api';

const restomodService = {
  // Ottieni tutti i modelli restomod
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/restomods', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni i modelli in evidenza
  getFeatured: async () => {
    try {
      const response = await api.get('/restomods', { params: { inEvidenza: true } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni un singolo modello per ID
  getById: async (id) => {
    try {
      const response = await api.get(`/restomods/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni modelli per costruttore
  getByBrand: async (brandId) => {
    try {
      const response = await api.get('/restomods', { params: { costruttore: brandId } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default restomodService;