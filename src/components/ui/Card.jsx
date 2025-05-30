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
          <div className="absolute top-0 right-0 bg-secondary-950 text-primary text-xs font-extralight px-5 py-2 uppercase tracking-[0.25em]">
            {badge}
          </div>
        )}
      </div>

      {/* Contenuto */}
      <div className={`p-8 space-y-4 ${contentClassName}`}>
        {title && <h3 className="text-xl font-heading font-light mb-3 text-white">{title}</h3>}
        {subtitle && <p className="text-xs text-secondary-400 mb-4 uppercase tracking-[0.2em] font-extralight">{subtitle}</p>}
        {description && <p className="text-secondary-300 mb-5 line-clamp-3 font-light text-sm leading-relaxed">{description}</p>}
        {price && (
          <div className="mt-auto pt-5 border-t border-secondary-900">
            <p className="text-lg font-light">
              <span className="text-primary">{formatPrice(price)}</span>
              {price > 0 && <span className="text-xs text-secondary-400 ml-2 font-extralight tracking-wider">+ tasse</span>}
            </p>
          </div>
        )}
      </div>
    </>
  );

  // Applica la classe di base e le classi aggiuntive
  const cardClasses = `bizzarrini-card overflow-hidden relative bg-secondary-950 ${className}`;

  // Se c'è un link, avvolgi il contenuto in un Link
  if (link) {
    return (
      <motion.div
        whileHover={hoverEffect ? { y: -8 } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
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
      whileHover={hoverEffect ? { y: -8 } : {}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
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