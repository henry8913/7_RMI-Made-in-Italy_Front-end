import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import newsletterService from '../../services/newsletterService';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    preferenze: {
      modelli: true,
      eventi: true,
      offerte: true
    }
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      preferenze: {
        ...prev.preferenze,
        [name]: checked
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verifica che tutti i campi obbligatori siano compilati
    if (!formData.email || !formData.nome) {
      toast.error('Tutti i campi sono obbligatori. Compila sia email che nome.');
      return;
    }
    
    // Verifica che almeno una preferenza sia selezionata
    const hasSelectedPreference = Object.values(formData.preferenze).some(value => value === true);
    if (!hasSelectedPreference) {
      toast.error('Seleziona almeno una preferenza per la newsletter.');
      return;
    }
    
    setLoading(true);

    try {
      const response = await newsletterService.subscribe(formData);
      toast.success('Iscrizione alla newsletter completata con successo!');
      setFormData({
        email: '',
        nome: '',
        preferenze: {
          modelli: true,
          eventi: true,
          offerte: true
        }
      });
    } catch (error) {
      console.error('Errore durante l\'iscrizione:', error);
      toast.error(error.response?.data?.message || 'Errore durante l\'iscrizione alla newsletter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="luxury-card p-6 sm:p-7 md:p-8 lg:p-10 rounded-lg text-center w-full overflow-hidden"
    >
      <h2 className="text-2xl sm:text-2xl md:text-3xl font-heading font-bold mb-3 sm:mb-4">Iscriviti alla nostra newsletter</h2>
      <p className="text-sm sm:text-base text-secondary-300 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto">
        Resta aggiornato sulle ultime novità, eventi esclusivi e offerte speciali di RMI Restomode Made in Italy.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 max-w-full sm:max-w-xl mx-auto">
        <div className="flex flex-col gap-3 sm:gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Il tuo indirizzo email"
            className="w-full bg-secondary-800 border border-secondary-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            required
          />
          
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Il tuo nome"
            className="w-full bg-secondary-800 border border-secondary-700 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            required
          />
        </div>

        
          <div className="flex flex-col gap-3 sm:gap-4">
            
            <div className="bg-secondary-800 border border-secondary-700 rounded-lg p-3 sm:p-4 text-left">
              <p className="text-white mb-2 sm:mb-3 font-medium text-sm sm:text-base">Preferenze newsletter:</p>
              
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <label className="flex items-center text-secondary-300 text-xs sm:text-sm cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    name="modelli"
                    checked={formData.preferenze.modelli}
                    onChange={handlePreferenceChange}
                    className="mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4 accent-primary"
                  />
                  Nuovi modelli e restomods
                </label>
                
                <label className="flex items-center text-secondary-300 text-xs sm:text-sm cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    name="eventi"
                    checked={formData.preferenze.eventi}
                    onChange={handlePreferenceChange}
                    className="mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4 accent-primary"
                  />
                  Eventi e fiere
                </label>
                
                <label className="flex items-center text-secondary-300 text-xs sm:text-sm cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    name="offerte"
                    checked={formData.preferenze.offerte}
                    onChange={handlePreferenceChange}
                    className="mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4 accent-primary"
                  />
                  Offerte speciali e promozioni
                </label>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            variant="primary" 
            size="lg"
            disabled={loading}
          >
            {loading ? 'Iscrizione in corso...' : 'Iscriviti'}
          </Button>
      </form>
      
      <p className="text-xs sm:text-sm text-secondary-400 mt-3 sm:mt-4">
        Iscrivendoti accetti la nostra <a href="/privacy" className="text-primary hover:text-primary-400 transition-colors">Privacy Policy</a>.
      </p>
    </motion.div>
  );
};

export default Newsletter;