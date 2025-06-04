import api from './api';

const jobService = {
  // Ottieni tutte le offerte di lavoro disponibili
  getAll: async () => {
    try {
      const response = await api.get('/jobs');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Ottieni un'offerta di lavoro specifica per ID
  getById: async (id) => {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Candidati per un'offerta di lavoro
  apply: async (jobId, applicationData) => {
    try {
      const formData = new FormData();
      
      // Aggiungi i dati del candidato
      Object.keys(applicationData).forEach(key => {
        if (key !== 'cv') {
          formData.append(key, applicationData[key]);
        }
      });
      
      // Aggiungi il CV se presente
      if (applicationData.cv) {
        formData.append('cv', applicationData.cv);
      }
      
      const response = await api.post(`/jobs/${jobId}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Errore nell\'invio della candidatura:', error);
      throw error;
    }
  },
  
  // Ottieni le candidature di un utente tramite email
  getUserApplications: async (email) => {
    try {
      const response = await api.get(`/jobs/user/candidature?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      console.error('Errore nel recupero delle candidature:', error);
      throw error;
    }
  },

  // Ottieni le candidature dell'utente corrente
  getUserApplications: async () => {
    try {
      const response = await api.get('/jobs/applications');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default jobService;