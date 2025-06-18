import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = () => {
  const { getCartItemsCount } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cartIconRef = useRef(null);
  
  // Rileva se il dispositivo è mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Controlla all'inizio
    checkIfMobile();
    
    // Controlla quando la finestra viene ridimensionata
    window.addEventListener('resize', checkIfMobile);
    
    // Pulizia
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Gestisce i clic all'esterno per chiudere il popup su mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartIconRef.current && !cartIconRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);
  
  const itemCount = getCartItemsCount();
  
  // Gestisce il clic sull'icona del carrello
  const handleCartIconClick = (e) => {
    if (isMobile && itemCount > 0) {
      e.preventDefault();
      setIsHovered(!isHovered);
    }
  };
  
  return (
    <div className="relative" ref={cartIconRef}>
      <Link 
        to="/cart" 
        className="flex items-center text-white hover:text-gray-300 transition-colors"
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleCartIconClick}
      >
        <FaShoppingCart className="text-xl" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Link>
      
      {isHovered && itemCount > 0 && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 p-4">
          <p className="text-gray-800 font-medium mb-2">
            {itemCount} {itemCount === 1 ? 'articolo' : 'articoli'} nel carrello
          </p>
          <Link 
            to="/cart" 
            className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Vai al carrello
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartIcon;