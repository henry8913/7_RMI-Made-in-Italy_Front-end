import { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Quando il documento è completamente caricato, impostiamo loadingComplete a true
    const handleLoad = () => {
      setLoadingComplete(true);
      // Manteniamo l'animazione di caricamento per un minimo di 500ms per una migliore esperienza utente
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    // Se il documento è già caricato
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Altrimenti, aggiungiamo un event listener
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Quando cambiamo pagina, mostriamo brevemente il loader
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoading(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, loadingComplete }}>
      {children}
    </LoadingContext.Provider>
  );
};