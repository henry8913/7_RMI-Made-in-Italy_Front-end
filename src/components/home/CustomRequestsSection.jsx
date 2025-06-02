import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { FaTools, FaCar, FaPencilRuler } from 'react-icons/fa';

const CustomRequestsSection = () => {
  // Varianti per le animazioni
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Caratteristiche del servizio di richieste personalizzate
  const features = [
    {
      id: 1,
      title: 'Design Personalizzato',
      description: 'Crea un\'auto unica che rifletta il tuo stile personale con design su misura.',
      icon: <FaPencilRuler className="text-primary-500 text-3xl" />
    },
    {
      id: 2,
      title: 'Tecnologia Moderna',
      description: 'Integra tecnologie all\'avanguardia mantenendo l\'estetica classica del veicolo.',
      icon: <FaTools className="text-primary-500 text-3xl" />
    },
    {
      id: 3,
      title: 'Prestazioni Superiori',
      description: 'Potenzia il motore e migliora le prestazioni secondo le tue specifiche esigenze.',
      icon: <FaCar className="text-primary-500 text-3xl" />
    }
  ];

  return (
    <section id="custom-requests-section" className="section-padding bg-secondary-950">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-500 font-medium tracking-wider uppercase block mb-2">
            Richieste Personalizzate
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Crea l'Auto dei Tuoi Sogni
          </h2>
          <p className="text-secondary-400 max-w-2xl mx-auto">
            Trasforma la tua visione in realtà con il nostro servizio di personalizzazione. 
            Ogni dettaglio sarà curato secondo le tue specifiche per creare un restomod unico.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-secondary-900 rounded-lg overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-300 p-6"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-heading font-bold ml-3">{feature.title}</h3>
              </div>
              <p className="text-secondary-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-secondary-900 rounded-lg p-8 max-w-4xl mx-auto shadow-luxury"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-heading font-bold mb-2">Inizia il Tuo Progetto Personalizzato</h3>
            <p className="text-secondary-400">
              Compila il nostro modulo di richiesta personalizzata e il nostro team di esperti ti contatterà per discutere i dettagli del tuo progetto.
            </p>
          </div>
          <div className="flex justify-center">
            <Link to="/custom-request">
              <Button variant="primary" size="lg">
                Richiedi Preventivo
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomRequestsSection;