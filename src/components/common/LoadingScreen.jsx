import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../../contexts/LoadingContext';

/**
 * Componente che mostra un'animazione di caricamento a schermo intero
 * Viene mostrato quando il contenuto della pagina non è ancora completamente caricato
 */
const LoadingScreen = () => {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 bg-secondary-950 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <div className="h-16 w-16 border-t border-primary mx-auto mb-6 animate-spin rounded-full"></div>
            <h2 className="text-2xl font-heading font-bold text-white tracking-wide mb-2">RMI Made in Italy</h2>
            <p className="text-primary uppercase tracking-[0.2em] text-xs font-light">Caricamento</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;