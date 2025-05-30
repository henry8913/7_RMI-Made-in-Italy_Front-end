import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { Button } from '../components';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Clear general register error
    if (registerError) {
      setRegisterError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Nome validation
    if (!formData.nome) {
      newErrors.nome = 'Il nome è obbligatorio';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Formato email non valido';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'La password è obbligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La password deve contenere almeno 6 caratteri';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Conferma la password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Le password non corrispondono';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setRegisterError('');
    
    try {
      // Rimuovi confirmPassword prima di inviare i dati
      const { confirmPassword, ...userData } = formData;
      
      await register(userData);
      navigate('/profile');
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      setRegisterError(
        error.response?.data?.message || 
        'Errore durante la registrazione. Riprova più tardi.'
      );
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
          <h1 className="text-3xl md:text-4xl font-heading font-medium mb-2">Registrati</h1>
          <p className="text-secondary-300 font-light">Crea il tuo account su RMI Made in Italy</p>
        </div>
        
        {registerError && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800/30 text-red-500 flex items-start">
            <FaExclamationCircle className="mr-3 mt-1 flex-shrink-0" />
            <p className="text-sm">{registerError}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome"
                className={`w-full bg-secondary-800/50 border ${errors.nome ? 'border-red-500' : 'border-secondary-700'} p-4 pl-12 text-white placeholder-secondary-500 focus:outline-none focus:border-primary transition-all duration-300`}
              />
            </div>
            {errors.nome && <p className="mt-2 text-red-500 text-sm">{errors.nome}</p>}
          </div>
          
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
          
          <div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full bg-secondary-800/50 border ${errors.password ? 'border-red-500' : 'border-secondary-700'} p-4 pl-12 text-white placeholder-secondary-500 focus:outline-none focus:border-primary transition-all duration-300`}
              />
            </div>
            {errors.password && <p className="mt-2 text-red-500 text-sm">{errors.password}</p>}
          </div>
          
          <div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Conferma Password"
                className={`w-full bg-secondary-800/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-secondary-700'} p-4 pl-12 text-white placeholder-secondary-500 focus:outline-none focus:border-primary transition-all duration-300`}
              />
            </div>
            {errors.confirmPassword && <p className="mt-2 text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registrazione in corso...' : 'Registrati'}
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
            <span>Registrati con Google</span>
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-secondary-400 text-sm">
            Hai già un account? <Link to="/login" className="text-primary hover:underline">Accedi</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;