import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/formatters';

const Card = ({
  image,
  title,
  subtitle,
  description,
  price,
  badge,
  link,
  className = '',
  imageClassName = '',
  contentClassName = '',
  hoverEffect = true,
  ...props
}) => {
  const cardContent = (
    <>
      {/* Immagine */}
      <div className="image-zoom-container overflow-hidden aspect-[16/9]">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover image-zoom ${imageClassName}`}
          loading="lazy"
        />
        {badge && (
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-3 md:right-3 lg:top-4 lg:right-4 bg-secondary-950 text-primary text-[10px] sm:text-xs md:text-sm font-extralight px-1.5 sm:px-2 md:px-3 lg:px-4 py-0.5 sm:py-1 md:py-1.5 lg:py-2 uppercase tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.15em] lg:tracking-[0.2em]">
            {badge}
          </div>
        )}
      </div>

      {/* Contenuto */}
      <div className={`p-2 sm:p-3 md:p-5 lg:p-6 xl:p-8 space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 ${contentClassName}`}>
        {title && <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-heading font-light mb-0.5 sm:mb-1 md:mb-2 lg:mb-3 text-white line-clamp-1">{title}</h3>}
        {subtitle && <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-secondary-400 mb-0.5 sm:mb-1 md:mb-2 lg:mb-3 uppercase tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.15em] lg:tracking-[0.2em] font-extralight">{subtitle}</p>}
        {description && <p className="text-secondary-300 mb-1 sm:mb-2 md:mb-3 lg:mb-4 line-clamp-2 sm:line-clamp-2 md:line-clamp-3 font-light text-[9px] sm:text-[11px] md:text-xs lg:text-sm leading-relaxed">{description}</p>}
        {price && (
          <div className="mt-auto pt-1 sm:pt-2 md:pt-3 lg:pt-4 border-t border-secondary-900">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-light">
              <span className="text-primary">{formatPrice(price)}</span>
              {price > 0 && <span className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs text-secondary-400 ml-0.5 sm:ml-1 md:ml-1.5 lg:ml-2 font-extralight tracking-wide sm:tracking-wider">+ tasse</span>}
            </p>
          </div>
        )}
      </div>
    </>
  );

  // Applica la classe di base e le classi aggiuntive
  const cardClasses = `bizzarrini-card overflow-hidden relative bg-secondary-950 rounded-sm sm:rounded md:rounded-lg ${className}`;

  // Se c'è un link, avvolgi il contenuto in un Link
  if (link) {
    return (
      <motion.div
        whileHover={hoverEffect ? { y: -4, scale: 1.01, transition: { duration: 0.3 } } : {}}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={cardClasses}
        {...props}
      >
        <Link to={link} className="block h-full">
          {cardContent}
        </Link>
      </motion.div>
    );
  }

  // Altrimenti, restituisci solo il contenuto
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, scale: 1.01, transition: { duration: 0.3 } } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={cardClasses}
      {...props}
    >
      {cardContent}
    </motion.div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  badge: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  hoverEffect: PropTypes.bool,
};

export default Card;