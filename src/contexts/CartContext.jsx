import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

// Creazione del contesto del carrello
const CartContext = createContext();

// Provider del contesto del carrello
export const CartProvider = ({ children }) => {
  // Stato del carrello
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carica il carrello dal localStorage all'avvio
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Errore nel caricamento del carrello:', err);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Salva il carrello nel localStorage quando cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Aggiungi un item al carrello
  const addToCart = (item, quantity = 1) => {
    setCartItems(prevItems => {
      // Controlla se l'item è già nel carrello
      const existingItemIndex = prevItems.findIndex(cartItem => 
        cartItem.type === item.type && cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        // Se l'item esiste, aggiorna la quantità
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        toast.success(`Quantità aggiornata nel carrello`);
        return updatedItems;
      } else {
        // Altrimenti, aggiungi il nuovo item
        toast.success(`Aggiunto al carrello`);
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  // Rimuovi un item dal carrello
  const removeFromCart = (type, id) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => !(item.type === type && item.id === id));
      toast.info(`Rimosso dal carrello`);
      return updatedItems;
    });
  };

  // Aggiorna la quantità di un item nel carrello
  const updateQuantity = (type, id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(type, id);
      return;
    }

    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.type === type && item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  // Svuota il carrello
  const clearCart = () => {
    setCartItems([]);
    toast.info(`Carrello svuotato`);
  };

  // Calcola il totale del carrello
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calcola il numero totale di articoli nel carrello
  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Simula il processo di checkout
  const checkout = async (customerInfo) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simula una richiesta API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Crea un ordine fittizio
      const order = {
        id: `order_${Date.now()}`,
        items: [...cartItems],
        total: getCartTotal(),
        customer: customerInfo,
        date: new Date().toISOString(),
        status: 'completed'
      };
      
      // Salva l'ordine nel localStorage
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      savedOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(savedOrders));
      
      // Svuota il carrello
      clearCart();
      
      return order;
    } catch (err) {
      setError('Si è verificato un errore durante il checkout. Riprova più tardi.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Ottieni gli ordini dell'utente
  const getOrders = () => {
    try {
      const savedOrders = localStorage.getItem('orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (err) {
      console.error('Errore nel recupero degli ordini:', err);
      return [];
    }
  };

  // Valore del contesto
  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    checkout,
    getOrders
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizzato per utilizzare il contesto del carrello
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve essere utilizzato all\'interno di un CartProvider');
  }
  return context;
};

export default CartContext;