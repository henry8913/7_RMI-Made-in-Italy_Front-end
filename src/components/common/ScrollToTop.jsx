import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente che scorre automaticamente la pagina in cima quando si naviga tra le pagine
 * Questo componente non renderizza nulla nel DOM, ma esegue lo scroll quando cambia il percorso
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Quando cambia il pathname, scorre la pagina in cima
    window.scrollTo(0, 0);
  }, [pathname]);

  // Non renderizza nulla nel DOM
  return null;
};

export default ScrollToTop;