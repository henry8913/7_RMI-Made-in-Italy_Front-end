import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = () => {
  const { getCartItemsCount } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const itemCount = getCartItemsCount();
  
  return (
    <div className="relative">
      <Link 
        to="/cart" 
        className="flex items-center text-white hover:text-gray-300 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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