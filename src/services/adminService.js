import api from './api';

// Servizio per la gestione delle operazioni di amministrazione
export const adminService = {
  // UTENTI
  async getUsers() {
    try {
      const response = await api.get('/auth/users');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero degli utenti:', error);
      throw error;
    }
  },

  async createUser(userData) {
    try {
      const response = await api.post('/auth/users', userData);
      return response.data;
    } catch (error) {
      console.error('Errore durante la creazione dell\'utente:', error);
      throw error;
    }
  },

  async updateUser(userId, userData) {
    try {
      const response = await api.put(`/auth/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dell\'utente:', error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      const response = await api.delete(`/auth/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'eliminazione dell\'utente:', error);
      throw error;
    }
  },

  // RESTOMODS
  async getRestomods() {
    try {
      const response = await api.get('/restomods');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero dei restomods:', error);
      throw error;
    }
  },

  async getRestomod(restomodId) {
    try {
      const response = await api.get(`/restomods/${restomodId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero del restomod:', error);
      throw error;
    }
  },

  async createRestomod(restomodData) {
    try {
      const response = await api.post('/restomods', restomodData);
      return response.data;
    } catch (error) {
      console.error('Errore durante la creazione del restomod:', error);
      throw error;
    }
  },

  async updateRestomod(restomodId, restomodData) {
    try {
      const response = await api.put(`/restomods/${restomodId}`, restomodData);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del restomod:', error);
      throw error;
    }
  },

  async deleteRestomod(restomodId) {
    try {
      const response = await api.delete(`/restomods/${restomodId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'eliminazione del restomod:', error);
      throw error;
    }
  },

  async updateRestomodStatus(restomodId, status) {
    try {
      const response = await api.patch(`/restomods/${restomodId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dello stato del restomod:', error);
      throw error;
    }
  },

  // MARCHI
  async getBrands() {
    try {
      const response = await api.get('/brands');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero dei marchi:', error);
      throw error;
    }
  },

  async getBrand(brandId) {
    try {
      const response = await api.get(`/brands/${brandId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero del marchio:', error);
      throw error;
    }
  },

  async createBrand(brandData) {
    try {
      const response = await api.post('/brands', brandData);
      return response.data;
    } catch (error) {
      console.error('Errore durante la creazione del marchio:', error);
      throw error;
    }
  },

  async updateBrand(brandId, brandData) {
    try {
      const response = await api.put(`/brands/${brandId}`, brandData);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del marchio:', error);
      throw error;
    }
  },

  async deleteBrand(brandId) {
    try {
      const response = await api.delete(`/brands/${brandId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'eliminazione del marchio:', error);
      throw error;
    }
  },

  // BLOG
  async getBlogPosts() {
    try {
      // Richiedi tutti i post del blog con un limite alto per visualizzarli tutti
      const response = await api.get('/blog?limit=1000');
      console.log('Risposta completa API blog:', response);
      
      // Verifica se la risposta è valida e contiene dati
      if (response && response.data) {
        // Se la risposta è un array, restituiscila direttamente
        if (Array.isArray(response.data)) {
          return response.data;
        }
        // Se la risposta è un oggetto che contiene un array di blog
        else if (typeof response.data === 'object') {
          // Verifica se l'oggetto ha la proprietà 'posts' che contiene i blog
          if (Array.isArray(response.data.posts)) {
            console.log('Trovati blog in response.data.posts:', response.data.posts.length);
            return response.data.posts;
          }
          // Verifica altre proprietà comuni
          else if (Array.isArray(response.data.blogs)) {
            console.log('Trovati blog in response.data.blogs:', response.data.blogs.length);
            return response.data.blogs;
          }
          else if (Array.isArray(response.data.data)) {
            console.log('Trovati blog in response.data.data:', response.data.data.length);
            return response.data.data;
          }
          // Se l'oggetto ha totalPosts, potrebbe essere la risposta principale con i post direttamente nell'oggetto
          else if (response.data.totalPosts !== undefined && Array.isArray(response.data)) {
            console.log('Trovati blog in response.data (con totalPosts):', response.data.length);
            return response.data;
          }
          // Se non troviamo array noti, ma l'oggetto sembra essere la risposta principale
          else if (response.data.totalPosts !== undefined) {
            console.log('Risposta contiene totalPosts ma non array di blog standard');
            return response.data;
          }
          // Se non troviamo array noti, restituisci l'oggetto stesso
          return response.data;
        }
      }
      
      // Se non riusciamo a estrarre dati validi, restituisci un array vuoto
      console.warn('Formato risposta API blog non riconosciuto:', response);
      return [];
    } catch (error) {
      console.error('Errore durante il recupero dei post del blog:', error);
      throw error;
    }
  },

  async getBlogPost(postId) {
    try {
      const response = await api.get(`/blog/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero del post del blog:', error);
      throw error;
    }
  },

  async createBlogPost(postData) {
    try {
      const response = await api.post('/blog', postData);
      return response.data;
    } catch (error) {
      console.error('Errore durante la creazione del post del blog:', error);
      throw error;
    }
  },

  async updateBlogPost(postId, postData) {
    try {
      const response = await api.put(`/blog/${postId}`, postData);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del post del blog:', error);
      throw error;
    }
  },

  async deleteBlogPost(postId) {
    try {
      const response = await api.delete(`/blog/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'eliminazione del post del blog:', error);
      throw error;
    }
  },

  async updateBlogPostStatus(postId, status) {
    try {
      const response = await api.patch(`/blog/${postId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dello stato del post del blog:', error);
      throw error;
    }
  },

  async updateBlogFeaturedStatus(postId, featured) {
    try {
      const response = await api.patch(`/blog/${postId}`, { inEvidenza: featured });
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dello stato di evidenza del post del blog:', error);
      throw error;
    }
  },

  async updateBlogCommentsStatus(postId, commentsEnabled) {
    try {
      const response = await api.patch(`/blog/${postId}`, { commentiAbilitati: commentsEnabled });
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dello stato dei commenti del post del blog:', error);
      throw error;
    }
  },

  async getBlogStats() {
    try {
      const response = await api.get('/blog/stats');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero delle statistiche del blog:', error);
      throw error;
    }
  },

  // PACCHETTI
  async getPackages() {
    try {
      const response = await api.get('/packages');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero dei pacchetti:', error);
      throw error;
    }
  },

  async getPackage(packageId) {
    try {
      const response = await api.get(`/packages/${packageId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero del pacchetto:', error);
      throw error;
    }
  },

  async createPackage(packageData) {
    try {
      const response = await api.post('/packages', packageData);
      return response.data;
    } catch (error) {
      console.error('Errore durante la creazione del pacchetto:', error);
      throw error;
    }
  },

  async updatePackage(packageId, packageData) {
    try {
      const response = await api.put(`/packages/${packageId}`, packageData);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del pacchetto:', error);
      throw error;
    }
  },

  async deletePackage(packageId) {
    try {
      const response = await api.delete(`/packages/${packageId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'eliminazione del pacchetto:', error);
      throw error;
    }
  },

  async getOrders() {
    try {
      const response = await api.get('/packages/orders');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero degli ordini:', error);
      throw error;
    }
  },

  async getMessage(messageId) {
    try {
      const response = await api.get(`/contacts/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero del messaggio:', error);
      throw error;
    }
  },

  async getMessages() {
    try {
      const response = await api.get('/contacts');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero dei messaggi:', error);
      throw error;
    }
  },

  async deleteMessage(messageId) {
    try {
      const response = await api.delete(`/contacts/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'eliminazione del messaggio:', error);
      throw error;
    }
  },

  // LAVORI
  async getJobs() {
    try {
      const response = await api.get('/jobs');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero dei lavori:', error);
      throw error;
    }
  },

  async getJob(jobId) {
    try {
      const response = await api.get(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero del lavoro:', error);
      throw error;
    }
  },

  async createJob(jobData) {
    try {
      const response = await api.post('/jobs', jobData);
      return response.data;
    } catch (error) {
      console.error('Errore durante la creazione del lavoro:', error);
      throw error;
    }
  },

  async updateJob(jobId, jobData) {
    try {
      const response = await api.put(`/jobs/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del lavoro:', error);
      throw error;
    }
  },

  async deleteJob(jobId) {
    try {
      const response = await api.delete(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'eliminazione del lavoro:', error);
      throw error;
    }
  },

  // RICHIESTE PERSONALIZZATE
  async getCustomRequests() {
    try {
      const response = await api.get('/custom-requests');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero delle richieste personalizzate:', error);
      throw error;
    }
  },

  async getCustomRequest(requestId) {
    try {
      const response = await api.get(`/custom-requests/${requestId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero della richiesta personalizzata:', error);
      throw error;
    }
  },

  async respondToCustomRequest(requestId, responseData) {
    try {
      const response = await api.post(`/custom-requests/${requestId}/risposta`, responseData);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'invio della risposta:', error);
      throw error;
    }
  },

  async deleteCustomRequest(requestId) {
    try {
      const response = await api.delete(`/custom-requests/${requestId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'eliminazione della richiesta personalizzata:', error);
      throw error;
    }
  },

  // ORDINI
  async getOrders() {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero degli ordini:', error);
      throw error;
    }
  },

  async getOrder(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Errore durante il recupero dell\'ordine:', error);
      throw error;
    }
  },

  async updateOrderStatus(orderId, status) {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dello stato dell\'ordine:', error);
      throw error;
    }
  },

  // DASHBOARD
  async getDashboardStats() {
    try {
      // Ottieni i conteggi da varie API
      const [users, restomods, brands, packages, jobs, customRequests, messages, orders] = await Promise.all([
        this.getUsers(),
        this.getRestomods(),
        this.getBrands(),
        this.getPackages(),
        this.getJobs(),
        this.getCustomRequests(),
        this.getMessages(),
        this.getOrders()
      ]);

      // Ottieni i blog posts
      const blogs = await this.getBlogPosts();

      return {
        users: users.length,
        restomods: restomods.length,
        brands: brands.length,
        blogs: blogs.length,
        packages: packages.length,
        messages: messages.length,
        jobs: jobs.length,
        orders: orders.length
      };
    } catch (error) {
      console.error('Errore durante il recupero delle statistiche della dashboard:', error);
      // In caso di errore, restituisci valori di default
      return {
        users: 0,
        restomods: 0,
        brands: 0,
        blogs: 0,
        packages: 0,
        messages: 0,
        jobs: 0,
        orders: 0,
      };
    }
  },
};

export default adminService;