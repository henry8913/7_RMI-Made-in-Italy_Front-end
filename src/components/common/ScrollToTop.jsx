import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext';

/**
 * Componente che scorre automaticamente la pagina in cima quando si naviga tra le pagine
 */

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { isLoading } = useLoading();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 850);
    
    return () => clearTimeout(timer);
  }, [pathname]);
  
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return null;
};

export default ScrollToTop;