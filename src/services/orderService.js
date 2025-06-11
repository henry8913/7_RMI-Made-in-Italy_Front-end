import api from './api';

const orderService = {
  // Crea un nuovo ordine
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Errore durante la creazione dell\'ordine:', error);
      throw error;
    }
  },

  // Ottieni gli ordini dell'utente corrente
  getUserOrders: async () => {
    try {
      const response = await api.get('/orders/user');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero degli ordini:', error);
      throw error;
    }
  },

  // Ottieni un singolo ordine per ID
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/orders/user/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero dell\'ordine:', error);
      throw error;
    }
  }
};

export default orderService;