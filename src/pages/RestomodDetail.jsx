import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import restomodService from '../services/restomodService';
import { contactService } from '../services';
import { formatPrice } from '../utils/formatters';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';

const RestomodDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [restomod, setRestomod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const fetchRestomod = async () => {
      try {
        setLoading(true);
        const data = await restomodService.getById(id);
        console.log('Restomod ricevuto:', data); // Log per debug
        setRestomod(data);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento del restomod:', err);
        setError('Si è verificato un errore nel caricamento del restomod. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestomod();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Formatta i dati nel formato atteso dal backend (nomi in italiano)
      const contactData = {
        nome: formData.name,
        email: formData.email,
        telefono: formData.phone,
        messaggio: `Richiesta informazioni per ${restomod.nome}: ${formData.message}`
      };
      
      // Invia la richiesta di informazioni utilizzando contactService
      await contactService.requestInfo(restomod._id, contactData);
      toast.success('Grazie per il tuo interesse! Ti contatteremo presto.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Errore durante l\'invio della richiesta:', error);
      toast.error('Si è verificato un errore durante l\'invio della richiesta. Riprova più tardi.');
    }
  };
  
  const handleAddToCart = () => {
    if (restomod && restomod.stato === 'available') {
      const cartItem = {
        id: restomod._id,
        type: 'restomod',
        name: restomod.nome,
        price: restomod.prezzo,
        image: restomod.immagini && restomod.immagini.length > 0 ? restomod.immagini[0].url : null,
        brand: restomod.costruttore.nome,
        year: restomod.anno
      };
      
      addToCart(cartItem);
    }
  };

  if (loading) {
    return (
      <div className="section-padding bg-secondary-950 min-h-screen flex justify-center items-center pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding bg-secondary-950 min-h-screen flex flex-col justify-center items-center pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <p className="text-red-500 mb-6 text-xl">{error}</p>
        <Button to="/restomods" variant="primary">
          Torna ai Restomods
        </Button>
      </div>
    );
  }

  if (!restomod) {
    return (
      <div className="section-padding bg-secondary-950 min-h-screen flex flex-col justify-center items-center pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <h2 className="text-2xl font-heading font-bold mb-6">Restomod non trovato</h2>
        <Button to="/restomods" variant="primary">
          Torna ai Restomods
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary-950 min-h-screen pt-16 sm:pt-20 md:pt-24 lg:pt-28">
      {/* Breadcrumb */}
      <div className="container-custom pt-3 sm:pt-4 md:pt-5 lg:pt-6 px-4 sm:px-6 md:px-8"> 
        <div className="flex items-center text-xs sm:text-sm text-secondary-400 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-1 sm:mx-2">/</span>
          <Link to="/restomods" className="hover:text-white transition-colors">Restomods</Link>
          <span className="mx-1 sm:mx-2">/</span>
          <span className="text-white">{restomod.nome}</span>
        </div>
      </div>

      {/* Dettagli Restomod */}
      <section className="section-padding pt-3 sm:pt-4 md:pt-5 lg:pt-6"> 
        <div className="container-custom px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Galleria Immagini */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-none"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-md sm:rounded-lg mb-2 sm:mb-3 md:mb-4">
                {restomod.immagini && restomod.immagini.length > 0 ? (
                  <img 
                    src={restomod.immagini[activeImage].url} 
                    alt={restomod.nome} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary-800 flex items-center justify-center">
                    <p className="text-xs sm:text-sm md:text-base text-secondary-400">Nessuna immagine disponibile</p>
                  </div>
                )}
                
                {/* Badge stato */}
                {restomod.stato !== 'available' && (
                  <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-primary text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium">
                    {restomod.stato === 'sold' ? 'venduta' : 'Riservato'}
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {restomod.immagini && restomod.immagini.length > 1 && (
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-5 gap-1 sm:gap-2 overflow-x-auto">
                  {restomod.immagini.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`aspect-square rounded-sm sm:rounded-md overflow-hidden border sm:border-2 ${activeImage === index ? 'border-primary' : 'border-transparent'}`}
                    >
                      <img 
                        src={img.url} 
                        alt={`${restomod.nome} - immagine ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
            
            {/* Informazioni Restomod */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col order-2 lg:order-none"
            >
              <div className="flex items-center mb-1 sm:mb-2">
                <Link 
                  to={`/brands/${restomod.costruttore._id}`}
                  className="text-primary hover:text-primary-400 transition-colors text-sm sm:text-base"
                >
                  {restomod.costruttore.nome}
                </Link>
                <span className="mx-1 sm:mx-2 text-secondary-500">•</span>
                <span className="text-secondary-400 text-sm sm:text-base">{restomod.anno}</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 sm:mb-4">{restomod.nome}</h1>
              
              <div className="mb-6 sm:mb-8">
                <div className="flex flex-col mb-4 sm:mb-6 gap-4 sm:gap-5">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    {formatPrice(restomod.prezzo)}
                  </div>
                  {(restomod.stato === 'available' || restomod.stato === 'sold') && (
                    <div className="flex gap-2 sm:gap-3 lg:gap-4 xl:gap-5">
                      <Button onClick={handleAddToCart} variant="primary" className="text-sm sm:text-base lg:text-lg py-2 px-3 sm:px-4 lg:px-5 xl:px-6">
                        <span className="flex items-start">
                          Aggiungi al carrello
                        </span>
                      </Button>
                      <Button to={`/test-drive?modelId=${restomod._id}`} variant="outline" className="text-sm sm:text-base lg:text-lg py-2 px-3 sm:px-4 lg:px-5 xl:px-6">
                        <span className="flex items-start">
                          Prenota Test Drive
                        </span>
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none mb-6 sm:mb-8">
                  {restomod.descrizione ? (
                    <div dangerouslySetInnerHTML={{ __html: restomod.descrizione }} />
                  ) : (
                    <p className="text-sm sm:text-base">Nessuna descrizione disponibile per questo restomod.</p>
                  )}
                </div>
              </div>
              
              {/* Specifiche Tecniche */}
              <div className="bg-secondary-900/50 p-3 sm:p-4 md:p-5 lg:p-6 rounded-sm sm:rounded-md md:rounded-lg mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold mb-2 sm:mb-3 md:mb-4">Specifiche Tecniche</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {restomod.specifiche && restomod.specifiche.motore && (
                    <div className="p-1.5 sm:p-2 bg-secondary-800/30 rounded">
                      <span className="block text-xs sm:text-sm text-secondary-400">Motore</span>
                      <span className="font-medium text-xs sm:text-sm md:text-base">{restomod.specifiche.motore}</span>
                    </div>
                  )}
                  {restomod.specifiche && restomod.specifiche.potenza && (
                    <div className="p-1.5 sm:p-2 bg-secondary-800/30 rounded">
                      <span className="block text-xs sm:text-sm text-secondary-400">Potenza</span>
                      <span className="font-medium text-xs sm:text-sm md:text-base">{restomod.specifiche.potenza}</span>
                    </div>
                  )}
                  {restomod.specifiche && restomod.specifiche.accelerazione && (
                    <div className="p-1.5 sm:p-2 bg-secondary-800/30 rounded">
                      <span className="block text-xs sm:text-sm text-secondary-400">0-100 km/h</span>
                      <span className="font-medium text-xs sm:text-sm md:text-base">{restomod.specifiche.accelerazione}</span>
                    </div>
                  )}
                  {restomod.specifiche && restomod.specifiche.velocitaMax && (
                    <div className="p-1.5 sm:p-2 bg-secondary-800/30 rounded">
                      <span className="block text-xs sm:text-sm text-secondary-400">Velocità Max</span>
                      <span className="font-medium text-xs sm:text-sm md:text-base">{restomod.specifiche.velocitaMax}</span>
                    </div>
                  )}
                  {restomod.specifiche && restomod.specifiche.trasmissione && (
                    <div className="p-1.5 sm:p-2 bg-secondary-800/30 rounded">
                      <span className="block text-xs sm:text-sm text-secondary-400">Trasmissione</span>
                      <span className="font-medium text-xs sm:text-sm md:text-base">{restomod.specifiche.trasmissione}</span>
                    </div>
                  )}
                  {restomod.specifiche && restomod.specifiche.peso && (
                    <div className="p-1.5 sm:p-2 bg-secondary-800/30 rounded">
                      <span className="block text-xs sm:text-sm text-secondary-400">Peso</span>
                      <span className="font-medium text-xs sm:text-sm md:text-base">{restomod.specifiche.peso}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Modulo di contatto */}
              {(restomod.stato === 'available' || restomod.stato === 'sold') && (
                <div className="bg-secondary-900/50 p-3 sm:p-4 md:p-5 lg:p-6 rounded-sm sm:rounded-md md:rounded-lg">
                  <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold mb-2 sm:mb-3 md:mb-4">Interessato a questo restomod?</h3>
                  <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-secondary-400 mb-0.5 sm:mb-1">Nome</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm bg-secondary-800 border border-secondary-700 rounded sm:rounded-md focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-secondary-400 mb-0.5 sm:mb-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm bg-secondary-800 border border-secondary-700 rounded sm:rounded-md focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-secondary-400 mb-0.5 sm:mb-1">Telefono</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm bg-secondary-800 border border-secondary-700 rounded sm:rounded-md focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-secondary-400 mb-0.5 sm:mb-1">Messaggio</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm bg-secondary-800 border border-secondary-700 rounded sm:rounded-md focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-primary-500"
                        placeholder={`Sono interessato a ${restomod.nome}. Vorrei ricevere maggiori informazioni.`}
                      ></textarea>
                    </div>
                    <Button type="submit" variant="primary" className="w-full text-xs sm:text-sm md:text-base py-1.5 sm:py-2 md:py-2.5 mt-1 sm:mt-2">
                      Invia Richiesta
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Pulsanti di navigazione */}
      <section className="section-padding pt-0">
        <div className="container-custom px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3 sm:gap-4 md:gap-0 mt-4 sm:mt-6 md:mt-8">
            <Button
              as={Link}
              to="/restomods"
              variant="outline"
              className="flex items-center text-xs sm:text-sm w-full sm:w-auto justify-center sm:justify-start px-2 sm:px-3 py-1 sm:py-1.5 md:py-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Torna ai Restomods
            </Button>
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto justify-center sm:justify-end mt-3 sm:mt-0">
              <Button
                as={Link}
                to={`/brands/${restomod.costruttore._id}`}
                variant="primary"
                className="flex items-center text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 whitespace-nowrap"
              >
                Esplora {restomod.costruttore.nome}
              </Button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestomodDetail;