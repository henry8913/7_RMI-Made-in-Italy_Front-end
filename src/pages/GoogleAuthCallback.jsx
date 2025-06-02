import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthToken } = useAuth();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Estrai il token dall'URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (error) {
          toast.error('Autenticazione con Google fallita. Riprova più tardi.');
          navigate('/login');
          return;
        }

        if (!token) {
          toast.error('Token non trovato. Riprova più tardi.');
          navigate('/login');
          return;
        }

        // Salva il token nel localStorage
        localStorage.setItem('token', token);
        
        // Aggiorna il contesto di autenticazione
        if (typeof setAuthToken === 'function') {
          setAuthToken(token);
        }

        toast.success('Accesso effettuato con successo!');
        navigate('/');
      } catch (error) {
        console.error('Errore durante il callback Google:', error);
        toast.error('Si è verificato un errore durante l\'autenticazione. Riprova più tardi.');
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [location, navigate, setAuthToken]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-heading mb-4">Autenticazione in corso...</h2>
        <p className="text-secondary-300">Attendi mentre completiamo l'autenticazione con Google.</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;