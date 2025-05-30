import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaExclamationCircle, FaGoogle } from 'react-icons/fa';
import { Button } from '../components';
import { toast } from 'react-toastify';
import authService from '../services/authService';

const Login = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Rimuovi l'errore quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validazione email
    if (!formData.email) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato email non valido';
    }
    
    // Validazione password
    if (!formData.password) {
      newErrors.password = 'La password è obbligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Chiamata al servizio di login
      const response = await login(formData);
      
      // Mostra un messaggio di successo
      toast.success('Login effettuato con successo!');
      
      // Reindirizza l'utente alla home page o alla pagina precedente
      navigate('/');
      
      console.log('Login effettuato con successo:', response);
    } catch (error) {
      console.error('Errore durante il login:', error);
      
      // Gestisci gli errori di validazione dal server
      if (error.response && error.response.data) {
        const serverErrors = error.response.data.errors;
        if (serverErrors) {
          setErrors(serverErrors);
        } else {
          toast.error(error.response.data.message || 'Errore durante il login');
        }
      } else {
        toast.error('Si è verificato un errore durante il login. Riprova più tardi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div 
        className="w-full max-w-md bg-secondary-900/50 backdrop-blur-sm border-t border-primary/20 p-8 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-medium mb-2">Accedi</h1>
          <p className="text-secondary-300 font-light">Accedi al tuo account su RMI Made in Italy</p>
        </div>
        
        {errors.general && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800/30 text-red-500 flex items-start">
            <FaExclamationCircle className="mr-3 mt-1 flex-shrink-0" />
            <p className="text-sm">{errors.general}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Email */}
          <div>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full bg-secondary-800/50 border ${errors.email ? 'border-red-500' : 'border-secondary-700'} p-4 pl-12 text-white placeholder-secondary-500 focus:outline-none focus:border-primary transition-all duration-300`}
              />
            </div>
            {errors.email && <p className="mt-2 text-red-500 text-sm">{errors.email}</p>}
          </div>
          
          {/* Campo Password */}
          <div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full bg-secondary-800/50 border ${errors.password ? 'border-red-500' : 'border-secondary-700'} p-4 pl-12 text-white placeholder-secondary-500 focus:outline-none focus:border-primary transition-all duration-300`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="mt-2 text-red-500 text-sm">{errors.password}</p>}
          </div>
          
          {/* Link per recupero password */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors duration-300">
              Password dimenticata?
            </Link>
          </div>
          
          {/* Pulsante di invio */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Accesso in corso...' : 'Accedi'}
          </Button>
        </form>
        
        <div className="mt-8">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-secondary-700 absolute w-full"></div>
            <span className="bg-secondary-900 px-4 relative z-10 text-secondary-400 text-sm">oppure</span>
          </div>
          
          <button
            onClick={handleGoogleLogin}
            className="mt-6 w-full flex items-center justify-center bg-white text-secondary-900 p-4 hover:bg-gray-100 transition-all duration-300"
          >
            <FaGoogle className="mr-3 text-red-500" />
            <span>Accedi con Google</span>
          </button>
        </div>
        
        {/* Link per registrazione */}
        <div className="mt-8 text-center">
          <p className="text-secondary-300 text-sm">
            Non hai un account?{' '}
            <Link to="/register" className="text-primary hover:text-primary/80 transition-colors duration-300">
              Registrati
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;