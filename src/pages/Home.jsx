import { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedRestomods from '../components/home/FeaturedRestomods';
import AboutSection from '../components/home/AboutSection';
import BrandsSection from '../components/home/BrandsSection';
import PackagesSection from '../components/home/PackagesSection';
import JobsSection from '../components/home/JobsSection';
import CustomRequestsSection from '../components/home/CustomRequestsSection';
import TestimonialSection from '../components/home/TestimonialSection';
import ContactSection from '../components/home/ContactSection';
import { motion } from 'framer-motion';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simuliamo un breve caricamento per mostrare l'animazione
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Varianti per le animazioni di sequenza
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-secondary-950 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="h-16 w-16 border-t border-primary mx-auto mb-6 animate-spin"></div>
          <h2 className="text-2xl font-heading font-bold text-white tracking-wide mb-2">RMI Made in Italy</h2>
          <p className="text-primary uppercase tracking-[0.2em] text-xs font-light">Caricamento</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-secondary-950"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section variants={sectionVariants}>
        <Hero />
      </motion.section>
      
      <motion.section variants={sectionVariants}>
        <FeaturedRestomods />
      </motion.section>
      
      <motion.section variants={sectionVariants}>
        <AboutSection />
      </motion.section>
      
      <motion.section variants={sectionVariants}>
        <BrandsSection />
      </motion.section>
      
      <motion.section variants={sectionVariants}>
        <PackagesSection />
      </motion.section>
      
      <motion.section variants={sectionVariants}>
        <JobsSection />
      </motion.section>
      
      <motion.section variants={sectionVariants}>
        <CustomRequestsSection />
      </motion.section>
      
      <motion.section variants={sectionVariants}>
        <TestimonialSection />
      </motion.section>
      
      <motion.section variants={sectionVariants}>
        <ContactSection />
      </motion.section>
    </motion.div>
  );
};

export default Home;