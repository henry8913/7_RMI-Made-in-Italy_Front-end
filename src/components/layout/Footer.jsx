import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import logoWhite from '../../assets/images/logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-950 border-t border-secondary-900 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10">
      <div className="container-custom px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 mb-10 sm:mb-12 md:mb-16">
          {/* Column 1: Logo and Description */}
          <div className="space-y-4 sm:space-y-6">
            <Link to="/" className="block mb-4 sm:mb-6">
              <img src={logoWhite} alt="RMI Made in Italy" className="h-8 sm:h-10 md:h-12" />
            </Link>
            <p className="text-secondary-400 text-xs sm:text-sm leading-relaxed">
              RMI Made in Italy trasforma auto d'epoca italiane in capolavori moderni, mantenendo l'anima classica ma aggiungendo tecnologia e prestazioni contemporanee.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white text-base sm:text-lg font-medium mb-4 sm:mb-6">Link Rapidi</h4>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4">
              <li><Link to="/restomods" className="text-secondary-400 hover:text-primary transition-colors text-sm">Restomods</Link></li>
              <li><Link to="/brands" className="text-secondary-400 hover:text-primary transition-colors text-sm">Costruttori</Link></li>
              <li><Link to="/packages" className="text-secondary-400 hover:text-primary transition-colors text-sm">Pacchetti Extra</Link></li>
              <li><Link to="/test-drive" className="text-secondary-400 hover:text-primary transition-colors text-sm">Test Drive</Link></li>
              <li><Link to="/custom-requests" className="text-secondary-400 hover:text-primary transition-colors text-sm">Richiedi la tua auto</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div>
            <h4 className="text-white text-base sm:text-lg font-medium mb-4 sm:mb-6">Servizi</h4>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4">
              <li><Link to="/services/restoration" className="text-secondary-400 hover:text-primary transition-colors text-sm">Restauro</Link></li>
              <li><Link to="/services/customization" className="text-secondary-400 hover:text-primary transition-colors text-sm">Personalizzazione</Link></li>
              <li><Link to="/services/maintenance" className="text-secondary-400 hover:text-primary transition-colors text-sm">Manutenzione</Link></li>
              <li><Link to="/services/consulting" className="text-secondary-400 hover:text-primary transition-colors text-sm">Consulenza</Link></li>
              <li><Link to="/blog" className="text-secondary-400 hover:text-primary transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Company */}
          <div className="mt-8 sm:mt-0">
            <h4 className="text-white text-base sm:text-lg font-medium mb-4 sm:mb-6">Azienda</h4>
            <ul className="space-y-2 sm:space-y-3 md:space-y-4">
              <li><Link to="/about" className="text-secondary-400 hover:text-primary transition-colors text-sm">Chi Siamo</Link></li>
              <li><Link to="/jobs" className="text-secondary-400 hover:text-primary transition-colors text-sm">Lavora con noi</Link></li>
              <li><Link to="/contact" className="text-secondary-400 hover:text-primary transition-colors text-sm">Contatti</Link></li>
              <li><Link to="/faq" className="text-secondary-400 hover:text-primary transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/wishlist" className="text-secondary-400 hover:text-primary transition-colors text-sm">Lista desideri</Link></li>
            </ul>
          </div>
          
          {/* Column 5: Contact */}
          <div className="mt-8 lg:mt-0">
            <h4 className="text-white text-base sm:text-lg font-medium mb-4 sm:mb-6">Contatti</h4>
            <address className="not-italic text-secondary-400 space-y-2 sm:space-y-3 md:space-y-4 text-sm">
              <p>Via XX Settembre, 45<br />41053 Maranello, MO</p>
              <p>
                <a href="tel:+390123456789" className="hover:text-primary transition-colors">+39 39 2693 6916</a>  
              </p>
              <p>
                <a href="mailto:info@rmimadeinitaly.it" className="hover:text-primary transition-colors">info@rmimadeinitaly.com</a>
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-primary transition-colors">
                  <FaFacebook size={18} className="sm:text-lg md:text-xl" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-primary transition-colors">
                  <FaInstagram size={18} className="sm:text-lg md:text-xl" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-primary transition-colors">
                  <FaYoutube size={18} className="sm:text-lg md:text-xl" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-secondary-400 hover:text-primary transition-colors">
                  <FaLinkedin size={18} className="sm:text-lg md:text-xl" />
                </a>
              </div>
            </address>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-6 sm:pt-8 border-t border-secondary-900 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-500 text-xs sm:text-sm mb-4 md:mb-0 text-center md:text-left">
            &copy; {currentYear} RMI Made in Italy. Tutti i diritti riservati.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6">
            <Link to="/privacy-policy" className="text-secondary-500 hover:text-primary text-xs sm:text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-secondary-500 hover:text-primary text-xs sm:text-sm transition-colors">Termini e Condizioni</Link>
            <Link to="/cookie-policy" className="text-secondary-500 hover:text-primary text-xs sm:text-sm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;