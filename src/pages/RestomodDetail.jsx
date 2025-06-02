import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import restomodService from '../services/restomodService';
import { formatPrice } from '../utils/formatters';

const RestomodDetail = () => {
  const { id } = useParams();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui andrebbe implementata la logica per inviare il form
    console.log('Form inviato:', formData);
    alert('Grazie per il tuo interesse! Ti contatteremo presto.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  if (loading) {
    return (
      <div className="section-padding bg-secondary-950 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding bg-secondary-950 min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-500 mb-6 text-xl">{error}</p>
        <Button to="/restomods" variant="primary">
          Torna ai Restomods
        </Button>
      </div>
    );
  }

  if (!restomod) {
    return (
      <div className="section-padding bg-secondary-950 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-heading font-bold mb-6">Restomod non trovato</h2>
        <Button to="/restomods" variant="primary">
          Torna ai Restomods
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary-950 min-h-screen">
      {/* Breadcrumb */}
      <div className="container-custom pt-8">
        <div className="flex items-center text-sm text-secondary-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/restomods" className="hover:text-white transition-colors">Restomods</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{restomod.nome}</span>
        </div>
      </div>

      {/* Dettagli Restomod */}
      <section className="section-padding pt-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Galleria Immagini */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                {restomod.immagini && restomod.immagini.length > 0 ? (
                  <img 
                    src={restomod.immagini[activeImage].url} 
                    alt={restomod.nome} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary-800 flex items-center justify-center">
                    <p className="text-secondary-400">Nessuna immagine disponibile</p>
                  </div>
                )}
                
                {/* Badge stato */}
                {restomod.stato !== 'available' && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-medium">
                    {restomod.stato === 'sold' ? 'Venduto' : 'Riservato'}
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {restomod.immagini && restomod.immagini.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {restomod.immagini.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`aspect-square rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-primary' : 'border-transparent'}`}
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
            >
              <div className="flex items-center mb-2">
                <Link 
                  to={`/brands/${restomod.costruttore._id}`}
                  className="text-primary hover:text-primary-400 transition-colors"
                >
                  {restomod.costruttore.nome}
                </Link>
                <span className="mx-2 text-secondary-500">•</span>
                <span className="text-secondary-400">{restomod.anno}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{restomod.nome}</h1>
              
              <div className="mb-8">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div className="text-3xl font-bold text-white">
                    {formatPrice(restomod.prezzo)}
                  </div>
                  {restomod.stato === 'available' && (
                    <Button to={`/test-drive?modelId=${restomod._id}`} variant="primary" className="mt-2 sm:mt-0">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h3.5a1 1 0 00.8-.4l3-4a1 1 0 00.2-.6V8a1 1 0 00-1-1h-3.8L11.35 3.3a1 1 0 00-.8-.3H3z" />
                        </svg>
                        Prenota Test Drive
                      </span>
                    </Button>
                  )}
                </div>
                
                <div className="prose prose-lg prose-invert max-w-none mb-8">
                  {restomod.descrizione ? (
                    <div dangerouslySetInnerHTML={{ __html: restomod.descrizione }} />
                  ) : (
                    <p>Nessuna descrizione disponibile per questo restomod.</p>
                  )}
                </div>
              </div>
              
              {/* Specifiche Tecniche */}
              <div className="bg-secondary-900/50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-heading font-bold mb-4">Specifiche Tecniche</h3>
                <div className="grid grid-cols-2 gap-4">
                  {restomod.specifiche && restomod.specifiche.motore && (
                    <div>
                      <span className="block text-sm text-secondary-400">Motore</span>
                      <span className="font-medium">{restomod.specifiche.motore}</span>
                    </div>
                  )}
                  {restomod.specifiche && restomod.specifiche.potenza && (
                    <div>
                      <span className="block text-sm text-secondary-400">Potenza</span>
                      <span className="font-medium">{restomod.specifiche.potenza}</span>
                    </div>
                  )}
                  {restomod.specifiche && restomod.specifiche.accelerazione && (
                    <div>
                      <span className="block text-sm text-secondary-400">0-100 km/h</span>
                      <span className="font-medium">{restomod.specifiche.accelerazione}</span>
                    </div>
                  )}
                  {restomod.specifiche && restomod.specifiche.velocitaMax && (
                    <div>
                      <span className="block text-sm text-secondary-400">Velocità Max</span>
                      <span className="font-medium">{restomod.specifiche.velocitaMax}</span>
                    </div>
                  )}
                  {restomod.specifiche && restomod.specifiche.trasmissione && (
                    <div>
                      <span className="block text-sm text-secondary-400">Trasmissione</span>
                      <span className="font-medium">{restomod.specifiche.trasmissione}</span>
                    </div>
                  )}
                  {restomod.specifiche && restomod.specifiche.peso && (
                    <div>
                      <span className="block text-sm text-secondary-400">Peso</span>
                      <span className="font-medium">{restomod.specifiche.peso}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Form di Contatto */}
              {restomod.stato === 'available' && (
                <div className="bg-secondary-900/50 p-6 rounded-lg">
                  <h3 className="text-xl font-heading font-bold mb-4">Interessato a questo restomod?</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-secondary-400 mb-1">Nome</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-secondary-800 border border-secondary-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-secondary-400 mb-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-secondary-800 border border-secondary-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-secondary-400 mb-1">Telefono</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-secondary-400 mb-1">Messaggio</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full bg-secondary-800 border border-secondary-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder={`Sono interessato a ${restomod.nome}. Vorrei ricevere maggiori informazioni.`}
                      ></textarea>
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
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
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button to="/restomods" variant="outline">
              Torna ai Restomods
            </Button>
            <Button to={`/brands/${restomod.costruttore._id}`} variant="outline">
              Esplora {restomod.costruttore.nome}
            </Button>
            {restomod.stato === 'available' && (
              <Button to={`/test-drive?modelId=${restomod._id}`} variant="primary">
                Prenota Test Drive
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestomodDetail;