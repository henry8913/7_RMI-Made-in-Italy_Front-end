import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  // Varianti di stile
  const variants = {
    primary: 'bg-primary hover:bg-primary-600 text-secondary-950 border border-primary tracking-wider uppercase font-light',
    secondary: 'bg-transparent hover:bg-primary/5 text-primary border border-primary tracking-wider uppercase font-light',
    accent: 'bg-accent hover:bg-accent-600 text-white tracking-wider uppercase font-light',
    dark: 'bg-secondary-950 hover:bg-secondary-900 text-white border border-secondary-800 tracking-wider uppercase font-light',
    light: 'bg-white hover:bg-secondary-100 text-secondary-900 border border-gray-200 tracking-wider uppercase font-light',
    outline: 'bg-transparent hover:bg-white/5 text-white border border-white tracking-wider uppercase font-light',
    'outline-primary': 'bg-transparent hover:bg-primary/5 text-primary border border-primary tracking-wider uppercase font-light',
    ghost: 'bg-transparent hover:text-primary text-white tracking-wider uppercase font-light',
  };

  // Dimensioni
  const sizes = {
    sm: 'text-xs sm:text-xs md:text-sm px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5',
    md: 'text-xs sm:text-sm md:text-base px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3',
    lg: 'text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-3.5',
  };

  // Classe base comune a tutti i pulsanti
  const baseClass = `inline-flex items-center justify-center transition-all duration-500 ease-in-out ${fullWidth ? 'w-full' : ''} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`;

  // Se è un link interno
  if (to) {
    return (
      <Link to={to} className={baseClass} {...props}>
        {children}
      </Link>
    );
  }

  // Se è un link esterno
  if (href) {
    return (
      <a 
        href={href} 
        className={baseClass} 
        target="_blank" 
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Altrimenti è un pulsante normale
  return (
    <button
      type={type}
      className={baseClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'accent',
    'dark',
    'light',
    'outline',
    'outline-primary',
    'ghost',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default Button;