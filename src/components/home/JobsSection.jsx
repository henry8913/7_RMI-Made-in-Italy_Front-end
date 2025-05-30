import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { jobService } from '../../services';
import { FaBriefcase, FaUsers, FaTools } from 'react-icons/fa';

const JobsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        const data = await jobService.getAll();
        // Prendiamo solo i primi 3 lavori per la home
        setJobs(data.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento delle offerte di lavoro:', err);
        setError('Si è verificato un errore nel caricamento delle offerte di lavoro. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  // Icone per i diversi tipi di lavoro
  const getJobIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'meccanico':
        return <FaTools className="text-primary-500 text-3xl" />;
      case 'amministrazione':
        return <FaBriefcase className="text-primary-500 text-3xl" />;
      default:
        return <FaUsers className="text-primary-500 text-3xl" />;
    }
  };

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

  return (
    <section id="jobs-section" className="section-padding bg-secondary-950">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary-500 font-medium tracking-wider uppercase block mb-2">
            Lavora con Noi
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Unisciti al Nostro Team
          </h2>
          <p className="text-secondary-400 max-w-2xl mx-auto">
            Siamo alla ricerca di talenti appassionati che condividano la nostra visione di eccellenza e innovazione.
            Scopri le opportunità di carriera in RMI Made in Italy.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        ) : jobs.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                className="bg-secondary-900 rounded-lg overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-300 flex flex-col h-full"
                variants={itemVariants}
              >
                <div className="p-6 border-b border-secondary-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {getJobIcon(job.category)}
                      <h3 className="text-xl font-heading font-bold ml-3">{job.titolo}</h3>
                    </div>
                    <span className="bg-primary-500/20 text-primary-500 text-xs font-medium px-2.5 py-1 rounded">
                      {job.tipo || 'Full-time'}
                    </span>
                  </div>
                  <p className="text-secondary-400 mb-4 line-clamp-3">{job.descrizione}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.luogo && (
                      <span key={`${job._id}-location`} className="text-sm text-secondary-400">
                        <span className="font-medium">Sede:</span> {job.luogo}
                      </span>
                    )}
                    {job.salario && (
                      <span key={`${job._id}-salary`} className="text-sm text-secondary-400 ml-4">
                        <span className="font-medium">Retribuzione:</span> {`${job.salario.min} - ${job.salario.max} ${job.salario.valuta}`}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 mt-auto">
                  <Link to={`/jobs/${job._id}`}>
                    <Button variant="primary" className="w-full">
                      Candidati ora
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-secondary-900 rounded-lg p-8 text-center">
            <h3 className="text-xl font-heading font-bold mb-4">Nessuna posizione aperta al momento</h3>
            <p className="text-secondary-400 mb-6">
              Al momento non ci sono posizioni aperte, ma siamo sempre alla ricerca di talenti. 
              Inviaci il tuo curriculum e ti contatteremo quando ci saranno nuove opportunità.
            </p>
            <Link to="/jobs">
              <Button variant="primary">
                Invia candidatura spontanea
              </Button>
            </Link>
          </div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link to="/jobs">
            <Button variant="outline" size="lg">
              Vedi tutte le opportunità
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default JobsSection;