import api from './api';

const wishlistService = {
  // Ottieni la wishlist dell'utente corrente
  getWishlist: async () => {
    try {
      const response = await api.get('/api/wishlist');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Aggiungi un modello alla wishlist
  addToWishlist: async (modelId) => {
    try {
      const response = await api.post(`/api/wishlist/${modelId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Rimuovi un modello dalla wishlist
  removeFromWishlist: async (modelId) => {
    try {
      const response = await api.delete(`/api/wishlist/${modelId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Verifica se un modello è nella wishlist
  isInWishlist: async (modelId) => {
    try {
      const response = await api.get(`/api/wishlist/check/${modelId}`);
      return response.data.inWishlist;
    } catch (error) {
      return false;
    }
  },
};

export default wishlistService;