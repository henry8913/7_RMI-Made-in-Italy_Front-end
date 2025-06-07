import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import FeaturedRestomods from '../components/home/FeaturedRestomods';
import AboutSection from '../components/home/AboutSection';
import BrandsSection from '../components/home/BrandsSection';
import PackagesSection from '../components/home/PackagesSection';
import JobsSection from '../components/home/JobsSection';
import CustomRequestsSection from '../components/home/CustomRequestsSection';
import TestimonialSection from '../components/home/TestimonialSection';
import ContactSection from '../components/home/ContactSection';
import Newsletter from '../components/common/Newsletter';

const Home = () => {
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
      
      <motion.section variants={sectionVariants}>
        <div className="container-custom py-20">
          <Newsletter />
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;