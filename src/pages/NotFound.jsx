import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components';

const NotFound = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-secondary-950 flex flex-col items-center justify-center px-4 py-12">
      <motion.div 
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-red-500 mb-4">404</h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Pagina non trovata
        </h2>
        
        <p className="text-xl text-secondary-300 mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button to="/" variant="primary" size="lg">
            Torna alla home
          </Button>
          
          <Button to="/contact" variant="secondary" size="lg">
            Contattaci
          </Button>
        </div>
      </motion.div>
      
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-secondary-500 text-sm">
          Hai bisogno di aiuto? <Link to="/contact" className="text-red-500 hover:text-red-400">Contattaci</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;