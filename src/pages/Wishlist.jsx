import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { wishlistService } from '../services';
import { Button } from '../components/ui';
import { useAuth } from '../contexts/AuthContext';

const Wishlist = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: '/wishlist' } });
      return;
    }

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const data = await wishlistService.getWishlist();
        setWishlistItems(data.modelli || []);
        setLoading(false);
      } catch (err) {
        console.error('Errore nel caricamento della wishlist:', err);
        setError('Si è verificato un errore nel caricamento della wishlist. Riprova più tardi.');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isAuthenticated, navigate]);

  const handleRemoveFromWishlist = async (modelId) => {
    try {
      setRemoving(modelId);
      await wishlistService.removeFromWishlist(modelId);
      // Update the local state to remove the item
      setWishlistItems(wishlistItems.filter(item => item._id !== modelId));
    } catch (err) {
      console.error('Errore nella rimozione dalla wishlist:', err);
      alert('Si è verificato un errore nella rimozione dalla wishlist. Riprova più tardi.');
    } finally {
      setRemoving(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-950 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-secondary-950 text-white flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl font-bold mb-4">Errore</h2>
        <p className="text-secondary-300 mb-8">{error}</p>
        <Link to="/">
          <Button variant="primary">Torna alla home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-950 text-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary-950 z-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('/images/wishlist-hero.jpg')` }}
        ></div>
        <div className="container mx-auto px-4 relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">I tuoi preferiti</h1>
            <p className="text-lg text-secondary-300">
              Gestisci la tua collezione personale di modelli restomod preferiti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistItems.map((model, index) => (
                <motion.div 
                  key={model._id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-secondary-800 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-shadow duration-300"
                >
                  <div className="relative">
                    <Link to={`/restomods/${model.slug || model._id}`}>
                      <img 
                        src={model.immagini?.[0] || '/images/car-placeholder.jpg'} 
                        alt={`${model.marca?.nome || 'Marca'} ${model.nome}`} 
                        className="w-full h-56 object-cover"
                      />
                    </Link>
                    <button 
                      onClick={() => handleRemoveFromWishlist(model._id)}
                      disabled={removing === model._id}
                      className="absolute top-3 right-3 bg-secondary-900/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                      aria-label="Rimuovi dai preferiti"
                    >
                      {removing === model._id ? (
                        <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full"></div>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-secondary-400">{model.anno}</span>
                      <span className="bg-amber-500 text-secondary-900 px-2 py-1 rounded-full text-xs font-medium">
                        {model.marca?.nome || 'Marca'}
                      </span>
                    </div>
                    <Link to={`/restomods/${model.slug || model._id}`}>
                      <h3 className="text-xl font-bold mb-2 hover:text-amber-400 transition-colors">
                        {model.nome}
                      </h3>
                    </Link>
                    <p className="text-secondary-300 mb-4 line-clamp-2">
                      {model.descrizioneBreve || 'Un\'auto d\'epoca con tecnologia moderna.'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-400 font-bold">
                        {model.prezzo ? `€${model.prezzo.toLocaleString('it-IT')}` : 'Prezzo su richiesta'}
                      </span>
                      <Link to={`/restomods/${model.slug || model._id}`}>
                        <Button variant="secondary" size="sm">Dettagli</Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-secondary-800 rounded-lg max-w-3xl mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-secondary-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-2xl font-bold mb-4">La tua wishlist è vuota</h2>
              <p className="text-secondary-300 mb-8 max-w-md mx-auto">
                Non hai ancora aggiunto modelli ai tuoi preferiti. Esplora la nostra collezione e salva i modelli che ti interessano.
              </p>
              <Link to="/restomods">
                <Button variant="primary">Esplora i modelli</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Recommendations Section */}
      {wishlistItems.length > 0 && (
        <section className="py-16 bg-secondary-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Potrebbe interessarti anche</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* This would typically be populated with recommended models based on user's wishlist */}
              {/* For now, we'll use placeholder content */}
              {[1, 2, 3].map((item) => (
                <motion.div 
                  key={item} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: item * 0.1 }}
                  className="bg-secondary-900 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-shadow duration-300"
                >
                  <Link to="/restomods">
                    <div className="h-48 bg-secondary-700 animate-pulse"></div>
                  </Link>
                  <div className="p-6">
                    <div className="h-4 bg-secondary-700 rounded animate-pulse mb-2 w-1/4"></div>
                    <div className="h-6 bg-secondary-700 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-secondary-700 rounded animate-pulse mb-4 w-3/4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-5 bg-secondary-700 rounded animate-pulse w-1/3"></div>
                      <div className="h-8 bg-secondary-700 rounded animate-pulse w-1/4"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/restomods">
                <Button variant="secondary">Scopri tutti i modelli</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Hai trovato il tuo modello ideale?</h2>
          <p className="text-xl text-secondary-300 mb-8 max-w-2xl mx-auto">
            Prenota un test drive per vivere l'esperienza di guida di un restomod italiano.
          </p>
          <Link to="/test-drive">
            <Button variant="primary" className="px-8 py-3 text-lg">
              Prenota un test drive
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;