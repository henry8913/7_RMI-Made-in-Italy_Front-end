import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import Button from '../ui/Button';
import heroImage from '../../assets/images/hero-bg.jpg';

const Hero = () => {
  const scrollToContent = () => {
    const featuredSection = document.getElementById('featured-section');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxury Italian Restomod" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-950/80 via-secondary-950/60 to-secondary-950/80"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 mt-16">
        <div className="max-w-3xl">
          <motion.span 
            className="block text-primary font-light tracking-[0.4em] uppercase text-xs mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            Restomods di lusso
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-7xl font-light leading-tight mb-10 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <span className="block text-white">Eccellenza</span>
            <span className="text-primary">Italiana</span>
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-lg text-secondary-300 mb-12 max-w-2xl font-light leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            Trasformiamo le auto classiche italiane in capolavori moderni, unendo l'artigianato tradizionale con tecnologie all'avanguardia per creare restomods unici e straordinari.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            <Button 
              to="/restomods" 
              variant="primary" 
              size="lg"
            >
              Scopri i Restomods
            </Button>
            <Button 
              to="/contact" 
              variant="ghost" 
              size="lg"
            >
              Richiedi Informazioni
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={scrollToContent}
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          className="flex flex-col items-center"
        >
          <span className="text-primary text-xs uppercase tracking-[0.3em] mb-3 font-light">Scopri di più</span>
          <FaChevronDown className="text-primary text-lg" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;