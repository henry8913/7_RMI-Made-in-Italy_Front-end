import api from './api';

const contactService = {
  // Invia un messaggio di contatto
  sendMessage: async (contactData) => {
    try {
      const response = await api.post('/contacts/send', contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Iscriviti alla newsletter tramite il form di contatto
  subscribeNewsletter: async (email, nome = '') => {
    try {
      const response = await api.post('/newsletter/iscriviti', { email, nome });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Richiedi informazioni su un modello specifico
  requestInfo: async (modelId, contactData) => {
    try {
      const response = await api.post(`/contacts/info-modello/${modelId}`, contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default contactService;