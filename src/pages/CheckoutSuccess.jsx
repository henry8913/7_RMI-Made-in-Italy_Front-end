import { useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHome, FaListAlt } from 'react-icons/fa';
import { Button } from '../components/ui';
import { formatPrice } from '../utils/formatters';

const CheckoutSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Se non c'è un ordine nello state, reindirizza alla home
  if (!order) {
    return <Navigate to="/" />;
  }
  
  // Formatta la data dell'ordine
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };
  
  // Ottieni la data dell'ordine da vari possibili campi
  const getOrderDate = () => {
    return order.dataAcquisto || order.dataCreazione || order.date || order.createdAt || new Date();
  };
  
  // Ottieni lo stato dell'ordine da vari possibili campi
  const getOrderStatus = () => {
    return order.stato === 'completato' || order.status === 'completed' ? 'Completato' : order.stato || order.status || 'In elaborazione';
  };
  
  // Ottieni il totale dell'ordine da vari possibili campi
  const getOrderTotal = () => {
    return order.totale || order.total || order.amount || 0;
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-secondary-950">
      <div className="container-custom">
        <motion.div 
          className="max-w-4xl mx-auto bg-secondary-900/30 border border-secondary-800/50 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-heading mb-4">Ordine Completato!</h1>
              <p className="text-secondary-300 text-lg">
                Grazie per il tuo acquisto. Il tuo ordine è stato elaborato con successo.
              </p>
            </div>
            
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-heading">Dettagli dell'ordine</h2>
                <span className="text-primary font-medium">#{order._id || order.id}</span>
              </div>
              
              <div className="bg-secondary-800/30 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm text-secondary-400 mb-2">Data dell'ordine</h3>
                    <p>{formatDate(getOrderDate())}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-secondary-400 mb-2">Stato dell'ordine</h3>
                    <p className="inline-flex items-center bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      {getOrderStatus()}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-secondary-400 mb-2">Cliente</h3>
                    <p>{`${order.infoCliente?.nome || order.customer?.firstName || ''} ${order.infoCliente?.cognome || order.customer?.lastName || ''}`}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-secondary-400 mb-2">Email</h3>
                    <p>{order.infoCliente?.email || order.customer?.email || ''}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-sm text-secondary-400 mb-2">Indirizzo di spedizione</h3>
                    <p>{`${order.infoCliente?.indirizzo || order.customer?.address || ''}, ${order.infoCliente?.cap || order.customer?.postalCode || ''} ${order.infoCliente?.citta || order.customer?.city || ''}, ${order.infoCliente?.paese || order.customer?.country || ''}`}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-secondary-800/30 mb-6">
                <h3 className="text-lg font-medium mb-4">Prodotti acquistati</h3>
                <div className="space-y-4 mb-6">
                  {(order.items || []).map((item, index) => (
                    <div key={index} className="flex justify-between items-center pb-4">
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-secondary-800/50 rounded-md overflow-hidden mr-4">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{item.nome || item.name}</h4>
                          <p className="text-sm text-secondary-400">
                            {(item.tipo || item.type) === 'restomod' ? 'Restomod' : 'Pacchetto'} x {item.quantita || item.quantity || 1}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">
                          {formatPrice((item.prezzo || item.price || 0) * (item.quantita || item.quantity || 1))}
                        </p>
                        {(item.quantita || item.quantity || 1) > 1 && (
                          <p className="text-xs text-secondary-400">
                            {formatPrice(item.prezzo || item.price || 0)} cad.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="w-full md:w-1/2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary-300">Subtotale</span>
                      <span>{formatPrice(getOrderTotal() / 1.22)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-300">IVA (22%)</span>
                      <span>{formatPrice(getOrderTotal() - (getOrderTotal() / 1.22))}</span>
                    </div>
                    <div className="border-t border-secondary-800/30 pt-2 flex justify-between font-medium">
                      <span>Totale</span>
                      <span className="text-xl text-primary">
                        {formatPrice(getOrderTotal())}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button 
                as={Link} 
                to="/"
                variant="outline"
                className="flex items-center justify-center"
              >
                <FaHome className="mr-2" />
                Torna alla home
              </Button>
              <Button 
                as={Link} 
                to="/profile"
                variant="primary"
                className="flex items-center justify-center"
              >
                <FaListAlt className="mr-2" />
                I miei ordini
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;