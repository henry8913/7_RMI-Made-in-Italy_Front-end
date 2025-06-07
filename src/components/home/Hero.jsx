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
    <section className="relative h-[100vh] sm:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxury Italian Restomod" 
          className="w-full h-full object-cover object-center sm:object-[center_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary-950/90 sm:from-secondary-950/80 via-secondary-950/70 to-secondary-950/90 sm:to-secondary-950/80"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 mt-0 px-5 sm:px-6">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">
          <motion.span 
            className="block text-primary font-light tracking-[0.3em] sm:tracking-[0.4em] uppercase text-xs mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            Restomods di lusso
          </motion.span>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-6 sm:mb-8 md:mb-10 tracking-wide sm:tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <span className="block text-white">Eccellenza</span>
            <span className="text-primary">Italiana</span>
          </motion.h1>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-secondary-300 mb-6 sm:mb-8 max-w-full sm:max-w-xl md:max-w-2xl font-light leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            Trasformiamo auto d'epoca italiane in capolavori moderni, preservando l'anima classica con tecnologia all'avanguardia. Ogni restomod è un'opera d'arte su misura, creata da artigiani esperti con passione per l'eccellenza automobilistica.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            <Button 
              to="/restomods" 
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
            >
              Esplora i modelli
            </Button>
            <Button 
              to="/custom-requests" 
              variant="outline-primary"
              size="md"
              className="w-full sm:w-auto"
            >
              Richiedi la tua auto
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={scrollToContent}
      >
        <div className="flex flex-col items-center">
          <span className="text-primary text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-1 sm:mb-2 font-extralight">Scorri</span>
          <FaChevronDown className="text-primary animate-bounce text-sm sm:text-base" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;