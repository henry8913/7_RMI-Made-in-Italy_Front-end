import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Footer } from './';
import { ChatBot } from '../common';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext';

const Layout = () => {
  const location = useLocation();
  const { isLoading, setIsLoading } = useLoading();
  
  // Quando cambia il pathname, impostiamo isLoading a true
  // e poi lo impostiamo a false dopo un breve ritardo
  useEffect(() => {
    setIsLoading(true);
    
    // Impostiamo isLoading a false dopo un breve ritardo
    // per simulare il caricamento della pagina
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.pathname, setIsLoading]);
  
  return (
    <div className="flex flex-col min-h-screen bg-secondary-950 w-full overflow-x-hidden">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex-grow w-full"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      
      <Footer />
      
      {/* Chatbot component */}
      <ChatBot />
    </div>
  );
};

export default Layout;