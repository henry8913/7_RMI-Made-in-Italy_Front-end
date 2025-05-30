import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import Logo from '../../assets/images/logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-950 border-t border-secondary-900/20">
      <div className="container-custom pt-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-24">
          {/* Logo e Descrizione */}
          <div className="space-y-10 lg:col-span-1">
            <Link to="/" className="inline-block">
              <img src={Logo} alt="RMI Made in Italy" className="h-14 object-contain" />
            </Link>
            <p className="text-secondary-300 text-sm leading-relaxed font-extralight tracking-wide">
              RMI Made in Italy è specializzata nel restauro e nella personalizzazione di auto d'epoca italiane, trasformandole in capolavori moderni che mantengono l'anima classica.
            </p>
            <div className="flex space-x-5">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-secondary-400 hover:text-primary transition-all duration-500 border border-secondary-900/30 hover:border-primary/50"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-xs" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-secondary-400 hover:text-primary transition-all duration-500 border border-secondary-900/30 hover:border-primary/50"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xs" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-secondary-400 hover:text-primary transition-all duration-500 border border-secondary-900/30 hover:border-primary/50"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xs" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-secondary-400 hover:text-primary transition-all duration-500 border border-secondary-900/30 hover:border-primary/50"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-xs" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-secondary-400 hover:text-primary transition-all duration-500 border border-secondary-900/30 hover:border-primary/50"
                aria-label="YouTube"
              >
                <FaYoutube className="text-xs" />
              </a>
            </div>
          </div>

          {/* Link Rapidi */}
          <div>
            <h3 className="text-white text-xs font-extralight mb-10 uppercase tracking-[0.3em] relative inline-block">
              Link Rapidi
              <span className="absolute -bottom-3 left-0 w-10 h-[0.5px] bg-primary/70"></span>
            </h3>
            <ul className="space-y-6">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/test-drive" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Test Drive
                </Link>
              </li>
              <li>
                <Link to="/custom-requests" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Auto Custom
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Lavora con Noi
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Servizi Specifici */}
          <div>
            <h3 className="text-white text-xs font-extralight mb-10 uppercase tracking-[0.3em] relative inline-block">
              Servizi Specifici
              <span className="absolute -bottom-3 left-0 w-10 h-[0.5px] bg-primary/70"></span>
            </h3>
            <ul className="space-y-6">
            <li>
                <Link to="/Packages" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Pacchetti
                </Link>
              </li>
              <li>
                <Link to="/services/restoration" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Restauro
                </Link>
              </li>
              <li>
                <Link to="/services/customization" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Personalizzazione
                </Link>
              </li>
              <li>
                <Link to="/services/maintenance" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Manutenzione
                </Link>
              </li>
              <li>
                <Link to="/services/consulting" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Consulenza
                </Link>
              </li>
            </ul>
          </div>

          {/* Area Utente */}
          <div>
            <h3 className="text-white text-xs font-extralight mb-10 uppercase tracking-[0.3em] relative inline-block">
              Area Utente
              <span className="absolute -bottom-3 left-0 w-10 h-[0.5px] bg-primary/70"></span>
            </h3>
            <ul className="space-y-6">
              <li>
                <Link to="/profile" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Profilo
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Accedi
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-secondary-300 hover:text-primary transition-all duration-500 inline-block py-1 text-sm font-extralight tracking-wide">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h3 className="text-white text-xs font-extralight mb-10 uppercase tracking-[0.3em] relative inline-block">
              Contatti
              <span className="absolute -bottom-3 left-0 w-10 h-[0.5px] bg-primary/70"></span>
            </h3>
            <ul className="space-y-7">
              <li className="flex items-start">
                <span className="text-primary mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="text-secondary-300 text-sm font-extralight tracking-wide">
                Via XX Settembre, 45<br />
                41053 Maranello, MO
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span className="text-secondary-300 text-sm font-extralight tracking-wide">
                  +39 39 2693 6916
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="text-secondary-300 text-sm font-extralight tracking-wide">
                  info@rmimadeinitaly.com
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="text-secondary-300 text-sm font-extralight tracking-wide">
                  Lun - Ven: 9:00 - 18:00<br />
                  Sab: 10:00 - 16:00<br />
                  Dom: Chiuso
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separatore */}
        <div className="border-t border-secondary-900/20 my-16"></div>

        {/* Copyright e Policy */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-xs mb-6 md:mb-0 font-extralight tracking-[0.15em]">
            © {currentYear} RMI Made in Italy. Tutti i diritti riservati.
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            <Link to="/privacy-policy" className="text-secondary-400 hover:text-primary text-xs transition-all duration-500 font-extralight tracking-[0.15em]">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-secondary-400 hover:text-primary text-xs transition-all duration-500 font-extralight tracking-[0.15em]">
              Termini di Servizio
            </Link>
            <Link to="/cookie-policy" className="text-secondary-400 hover:text-primary text-xs transition-all duration-500 font-extralight tracking-[0.15em]">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;