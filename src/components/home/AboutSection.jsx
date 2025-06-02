import { motion } from 'framer-motion';
import Button from '../ui/Button';
import heroBg from '../../assets/images/hero-bg.jpg';

const AboutSection = () => {
  return (
    <section id="about-section" className="section-padding bg-secondary-950 py-24"> {/* Ridotto da py-32 a py-24 */}
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16"> {/* Ridotto da gap-20 a gap-16 */}
          {/* Immagine */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={heroBg}
                alt="Officina RMI Made in Italy"
                className="object-cover w-full h-full image-zoom"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </motion.div>

          {/* Contenuto */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          >
            <motion.span 
              className="text-primary font-light tracking-[0.4em] uppercase text-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              La Nostra Storia
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-light text-white tracking-wider leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Passione per l'<span className="text-primary">Eccellenza Automobilistica</span> Italiana
            </motion.h2>
            
            <motion.div 
              className="space-y-8 text-secondary-300 font-light text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                RMI Made in Italy nasce dalla passione per le auto classiche italiane e dalla volontà di preservarne l'heritage, reinterpretandolo in chiave moderna. Il nostro atelier combina l'artigianalità tradizionale con le tecnologie più avanzate per creare restomods unici ed esclusivi.
              </p>
              <p>
                Ogni vettura che esce dalle nostre officine è il risultato di un meticoloso processo di restauro e personalizzazione, dove ogni dettaglio viene curato con la massima attenzione per soddisfare le esigenze dei collezionisti e degli appassionati più esigenti.
              </p>
              <p>
                La nostra missione è mantenere vivo il patrimonio automobilistico italiano, creando opere d'arte su quattro ruote che coniugano il fascino senza tempo del design classico con prestazioni e comfort contemporanei.
              </p>
            </motion.div>
            
            <motion.div
              className="pt-8 flex flex-wrap gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button 
                to="/about" 
                variant="secondary" 
                size="lg"
              >
                Scopri di Più
              </Button>
              <Button 
                to="/contact" 
                variant="ghost" 
                size="lg"
              >
                Contattaci
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;