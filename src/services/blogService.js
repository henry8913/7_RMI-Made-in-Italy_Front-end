import api from './api';

const blogService = {
  // Ottieni tutti i post del blog
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/blog', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni i post in evidenza
  getFeatured: async () => {
    try {
      const response = await api.get('/blog', { params: { inEvidenza: true } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni un singolo post per ID o slug
  getById: async (idOrSlug) => {
    try {
      const response = await api.get(`/blog/${idOrSlug}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni post per categoria
  getByCategory: async (categoria) => {
    try {
      const response = await api.get('/blog', { params: { categoria } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni post per tag
  getByTag: async (tag) => {
    try {
      const response = await api.get('/blog', { params: { tag } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Aggiungi un commento a un post
  addComment: async (postId, commentData) => {
    try {
      const response = await api.post(`/blog/${postId}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Metti mi piace a un post
  likePost: async (postId) => {
    try {
      const response = await api.post(`/blog/${postId}/like`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Rimuovi mi piace da un post
  unlikePost: async (postId) => {
    try {
      const response = await api.delete(`/blog/${postId}/like`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default blogService;