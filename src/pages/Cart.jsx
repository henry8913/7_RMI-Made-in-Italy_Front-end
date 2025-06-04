import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import packageService from '../services/packageService';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui';
import { formatPrice } from '../utils/formatters';

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal,
    checkout,
    loading,
    error,
    addToCart 
  } = useCart();
  
  const [recommendedPackages, setRecommendedPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Italia',
    paymentMethod: 'card'
  });

  // Gestisce il cambiamento nei campi del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestisce l'invio del form di checkout
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const order = await checkout(customerInfo);
      navigate('/checkout-success', { state: { order } });
    } catch (err) {
      console.error('Errore durante il checkout:', err);
    }
  };

  // Gestisce il passaggio al checkout
  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    
    setCheckoutStep(1);
  };
  
  useEffect(() => {
    // Carica i pacchetti consigliati quando l'utente visualizza il carrello
    const fetchRecommendedPackages = async () => {
      setLoadingPackages(true);
      try {
        const packages = await packageService.getAll();
        // Filtra i pacchetti che non sono già nel carrello
        const packagesNotInCart = packages.filter(pkg => 
          !cartItems.some(item => item.type === 'Package' && item.id === pkg._id)
        );
        // Prendi solo i primi 3 pacchetti come consigliati
        setRecommendedPackages(packagesNotInCart.slice(0, 3));
      } catch (error) {
        console.error('Errore nel caricamento dei pacchetti consigliati:', error);
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchRecommendedPackages();
  }, [cartItems]);
  
  const handleAddPackageToCart = (pkg) => {
    const packageItem = {
      id: pkg._id,
      name: pkg.name,
      price: pkg.price,
      image: pkg.image,
      type: 'Package',
      quantity: 1
    };
    
    addToCart(packageItem);
    toast.success(`${pkg.name} aggiunto al carrello!`);
  };

  // Se il carrello è vuoto
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-secondary-950">
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto text-center py-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaShoppingCart className="text-6xl text-primary/50 mx-auto mb-6" />
            <h1 className="text-4xl font-heading mb-4">Il tuo carrello è vuoto</h1>
            <p className="text-secondary-300 mb-8">Aggiungi alcuni prodotti al tuo carrello per procedere all'acquisto.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                as={Link} 
                to="/restomods"
                variant="primary"
                className="px-8"
              >
                Esplora Restomods
              </Button>
              <Button 
                as={Link} 
                to="/packages"
                variant="outline"
                className="px-8"
              >
                Esplora Pacchetti
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-secondary-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl md:text-4xl font-heading">
              {checkoutStep === 0 ? 'Il tuo carrello' : 'Checkout'}
            </h1>
            {checkoutStep > 0 && (
              <button 
                onClick={() => setCheckoutStep(prev => prev - 1)}
                className="flex items-center text-primary hover:text-primary-dark transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Torna al carrello
              </button>
            )}
          </div>

          {/* Passaggi del checkout */}
          <div className="mb-10">
            <div className="flex items-center justify-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 0 ? 'bg-primary text-white' : 'bg-secondary-800 text-secondary-400'}`}>
                1
              </div>
              <div className={`h-1 w-20 ${checkoutStep >= 1 ? 'bg-primary' : 'bg-secondary-800'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 1 ? 'bg-primary text-white' : 'bg-secondary-800 text-secondary-400'}`}>
                2
              </div>
            </div>
          </div>

          {checkoutStep === 0 ? (
            /* Contenuto del carrello */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="bg-secondary-900/30 border border-secondary-800/50 rounded-lg overflow-hidden mb-8">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-heading">Prodotti nel carrello</h2>
                      <button 
                        onClick={clearCart}
                        className="text-sm text-red-500 hover:text-red-400 transition-colors flex items-center"
                      >
                        <FaTrash className="mr-2" />
                        Svuota carrello
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={`${item.type}-${item.id}`} className="flex flex-col md:flex-row items-start md:items-center gap-3 pb-5 border-b border-secondary-800/30"> {/* Ridotto da gap-4 a gap-3 e da pb-6 a pb-5 */}
                          <div className="w-full md:w-20 h-20 bg-secondary-800/50 rounded-md overflow-hidden"> {/* Ridotto da w-24 h-24 a w-20 h-20 */}
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          
                          <div className="flex-grow">
                            <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                            <p className="text-secondary-400 text-sm mb-1"> {/* Ridotto da mb-2 a mb-1 */}
                              {item.type.toLowerCase() === 'restomod' ? 'Restomod' : 'Pacchetto'}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <button 
                                  onClick={() => updateQuantity(item.type, item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center bg-secondary-800 hover:bg-secondary-700 transition-colors rounded-l-md"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="w-10 h-8 flex items-center justify-center bg-secondary-800 text-sm">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.type, item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center bg-secondary-800 hover:bg-secondary-700 transition-colors rounded-r-md"
                                >
                                  +
                                </button>
                              </div>
                              
                              <button 
                                onClick={() => removeFromCart(item.type, item.id)}
                                className="text-red-500 hover:text-red-400 transition-colors"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xl font-medium text-primary">
                              {formatPrice(item.price)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-secondary-400">
                                {formatPrice(item.price)} cad.
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="primary"
                    className="flex-1 py-3"
                    onClick={handleProceedToCheckout}
                  >
                    Procedi al checkout
                  </Button>
                  
                  <Link to="/">
                    <Button variant="outline" className="w-full sm:w-auto py-3">
                      Continua lo shopping
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div>
                <div className="bg-secondary-900/30 border border-secondary-800/50 rounded-lg overflow-hidden sticky top-32">
                  <div className="p-6">
                    <h2 className="text-xl font-heading mb-6">Riepilogo ordine</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-secondary-300">Subtotale</span>
                        <span>{formatPrice(getCartTotal())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-300">IVA (22%)</span>
                        <span>{formatPrice(getCartTotal() * 0.22)}</span>
                      </div>
                      <div className="border-t border-secondary-800/30 pt-4 flex justify-between font-medium">
                        <span>Totale</span>
                        <span className="text-xl text-primary">
                          {formatPrice(getCartTotal() * 1.22)}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleProceedToCheckout}
                      variant="primary"
                      className="w-full py-3"
                    >
                      Procedi al checkout
                    </Button>
                    
                    <div className="mt-6 text-center">
                      <Link 
                        to="/"
                        className="text-primary hover:text-primary-dark transition-colors text-sm flex items-center justify-center"
                      >
                        <FaArrowLeft className="mr-2" />
                        Continua lo shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Form di checkout */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="bg-secondary-900/30 border border-secondary-800/50 rounded-lg overflow-hidden mb-8">
                  <div className="p-6">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-4 mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-amber-400">Modalità Demo</h3>
                          <div className="mt-2 text-sm text-secondary-300">
                            <p>Questo è un form di checkout dimostrativo. Nessun pagamento reale verrà processato e nessun prodotto verrà spedito.</p>
                            <p className="mt-1">Puoi inserire dati fittizi in tutti i campi per testare il processo di checkout.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-heading mb-6">Informazioni di spedizione e pagamento</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-secondary-300 mb-2">
                            Nome *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={customerInfo.firstName}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary-800/50 border border-secondary-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-secondary-300 mb-2">
                            Cognome *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={customerInfo.lastName}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary-800/50 border border-secondary-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-secondary-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-secondary-800/50 border border-secondary-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-secondary-300 mb-2">
                          Indirizzo *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={customerInfo.address}
                          onChange={handleChange}
                          required
                          className="w-full bg-secondary-800/50 border border-secondary-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-secondary-300 mb-2">
                            Città *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={customerInfo.city}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary-800/50 border border-secondary-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-secondary-300 mb-2">
                            CAP *
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={customerInfo.postalCode}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary-800/50 border border-secondary-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-secondary-300 mb-2">
                            Paese *
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={customerInfo.country}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary-800/50 border border-secondary-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="Italia">Italia</option>
                            <option value="Francia">Francia</option>
                            <option value="Germania">Germania</option>
                            <option value="Spagna">Spagna</option>
                            <option value="Regno Unito">Regno Unito</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Metodo di pagamento <span className="text-amber-400 text-sm">(Demo)</span></h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="card"
                              name="paymentMethod"
                              value="card"
                              checked={customerInfo.paymentMethod === 'card'}
                              onChange={handleChange}
                              className="mr-3 text-primary focus:ring-primary"
                            />
                            <label htmlFor="card" className="text-white">
                              Carta di credito/debito
                            </label>
                          </div>
                          
                          {customerInfo.paymentMethod === 'card' && (
                            <div className="ml-7 mt-3 space-y-4 p-4 bg-secondary-800/30 rounded-md border border-secondary-700/50">
                              <div className="text-amber-400 text-sm mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Modalità demo: inserisci dati fittizi
                              </div>
                              
                              <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-secondary-300 mb-2">
                                  Numero carta
                                </label>
                                <input
                                  type="text"
                                  id="cardNumber"
                                  placeholder="1234 5678 9012 3456"
                                  className="w-full bg-secondary-800/50 border border-secondary-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="expDate" className="block text-sm font-medium text-secondary-300 mb-2">
                                    Data scadenza
                                  </label>
                                  <input
                                    type="text"
                                    id="expDate"
                                    placeholder="MM/AA"
                                    className="w-full bg-secondary-800/50 border border-secondary-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                  />
                                </div>
                                
                                <div>
                                  <label htmlFor="cvv" className="block text-sm font-medium text-secondary-300 mb-2">
                                    CVV
                                  </label>
                                  <input
                                    type="text"
                                    id="cvv"
                                    placeholder="123"
                                    className="w-full bg-secondary-800/50 border border-secondary-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="paypal"
                              name="paymentMethod"
                              value="paypal"
                              checked={customerInfo.paymentMethod === 'paypal'}
                              onChange={handleChange}
                              className="mr-3 text-primary focus:ring-primary"
                            />
                            <label htmlFor="paypal" className="text-white">
                              PayPal
                            </label>
                          </div>
                          
                          {customerInfo.paymentMethod === 'paypal' && (
                            <div className="ml-7 mt-3 p-4 bg-secondary-800/30 rounded-md border border-secondary-700/50">
                              <div className="text-amber-400 text-sm mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Modalità demo: non verrai reindirizzato a PayPal
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="bank"
                              name="paymentMethod"
                              value="bank"
                              checked={customerInfo.paymentMethod === 'bank'}
                              onChange={handleChange}
                              className="mr-3 text-primary focus:ring-primary"
                            />
                            <label htmlFor="bank" className="text-white">
                              Bonifico bancario
                            </label>
                          </div>
                          
                          {customerInfo.paymentMethod === 'bank' && (
                            <div className="ml-7 mt-3 p-4 bg-secondary-800/30 rounded-md border border-secondary-700/50">
                              <div className="text-amber-400 text-sm mb-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Modalità demo: nessun bonifico da effettuare
                              </div>
                              <p className="text-secondary-300 text-sm">IBAN: IT12A0123456789000000123456</p>
                              <p className="text-secondary-300 text-sm">Intestatario: RMI Made in Italy S.r.l.</p>
                              <p className="text-secondary-300 text-sm">Causale: Ordine Demo</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {error && (
                        <div className="bg-red-900/30 border border-red-800 text-red-200 p-4 rounded-md">
                          {error}
                        </div>
                      )}
                      
                      <Button 
                        type="submit"
                        variant="primary"
                        className="w-full py-3"
                        disabled={loading}
                      >
                        {loading ? 'Elaborazione in corso...' : 'Completa l\'ordine'}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-secondary-900/30 border border-secondary-800/50 rounded-lg overflow-hidden sticky top-32">
                  <div className="p-6">
                    <h2 className="text-xl font-heading mb-6">Riepilogo ordine</h2>
                    
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={`summary-${item.type}-${item.id}`} className="flex justify-between text-sm">
                          <span className="text-secondary-300">
                            {item.name} x{item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      
                      <div className="border-t border-secondary-800/30 pt-4 flex justify-between">
                        <span className="text-secondary-300">Subtotale</span>
                        <span>{formatPrice(getCartTotal())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-300">IVA (22%)</span>
                        <span>{formatPrice(getCartTotal() * 0.22)}</span>
                      </div>
                      <div className="border-t border-secondary-800/30 pt-4 flex justify-between font-medium">
                        <span>Totale</span>
                        <span className="text-xl text-primary">
                          {formatPrice(getCartTotal() * 1.22)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;