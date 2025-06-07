import api from './api';

// Utilizziamo la variabile d'ambiente per l'URL di HenryAI
const HENRYAI_URL = import.meta.env.VITE_HENRYAI_URL || 'http://localhost:5001';

const henryAIService = {
  // Verifica lo stato del servizio HenryAI
  checkStatus: async () => {
    try {
      // Utilizziamo la variabile d'ambiente invece dell'URL hardcoded
      const response = await fetch(`${HENRYAI_URL}/api/status`);
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Errore durante la verifica dello stato di HenryAI:', error);
      throw error;
    }
  },

  // Invia un messaggio all'assistente HenryAI
  sendMessage: async (message, sessionId = null) => {
    try {
      const payload = {
        message,
        session_id: sessionId
      };
      
      // Utilizziamo la variabile d'ambiente invece dell'URL hardcoded
      const response = await fetch(`${HENRYAI_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Errore durante l\'invio del messaggio a HenryAI:', error);
      throw error;
    }
  }
};

export default henryAIService;