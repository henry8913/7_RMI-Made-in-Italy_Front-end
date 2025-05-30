import { useState } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Alessandro Bianchi',
    role: 'Collezionista',
    image: 'https://images.pexels.com/photos/32239681/pexels-photo-32239681/free-photo-of-stylish-man-waving-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'La qualità delle vetture RMI è semplicemente straordinaria. Ogni dettaglio è curato con una passione che solo gli artigiani italiani sanno esprimere.',
    rating: 5
  },
  {
    id: 2,
    name: 'Giulia Ferrari',
    role: 'Appassionata di Motori',
    image: 'https://images.pexels.com/photos/9300945/pexels-photo-9300945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'Ho avuto il privilegio di guidare una delle loro creazioni. L\'equilibrio perfetto tra heritage e tecnologia moderna è qualcosa che non si trova facilmente.',
    rating: 5
  },
  {
    id: 3,
    name: 'Marco Rossi',
    role: 'Proprietario Restomod',
    image: 'https://images.pexels.com/photos/29891506/pexels-photo-29891506/free-photo-of-young-man-in-car-with-stylish-watch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'Il processo di personalizzazione è stato un viaggio emozionante. Hanno trasformato la mia visione in una realtà che supera ogni aspettativa.',
    rating: 5
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="section-padding bg-secondary-950 py-36 overflow-hidden">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="text-primary uppercase tracking-[0.3em] font-extralight text-sm mb-6">Esperienze</p>
          <h2 className="text-4xl md:text-5xl font-heading font-light mb-8 text-white">
            Testimonianze dei Clienti
          </h2>
          <p className="text-lg text-secondary-300 max-w-3xl mx-auto font-light leading-relaxed">
            Scopri cosa dicono i nostri clienti dell'esperienza con RMI Made in Italy
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Controlli */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10">
            <button 
              onClick={prevTestimonial}
              className="w-14 h-14 rounded-full bg-secondary-900/30 backdrop-blur-sm text-white flex items-center justify-center hover:text-primary transition-all duration-500 border border-secondary-800"
              aria-label="Testimonianza precedente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10">
            <button 
              onClick={nextTestimonial}
              className="w-14 h-14 rounded-full bg-secondary-900/30 backdrop-blur-sm text-white flex items-center justify-center hover:text-primary transition-all duration-500 border border-secondary-800"
              aria-label="Testimonianza successiva"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          {/* Testimonial Slider */}
          <div className="overflow-hidden px-16">
            <div 
              className="transition-all duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full flex-shrink-0 px-6"
                  >
                    <motion.div 
                      className="p-10 md:p-16 rounded-lg text-center bg-secondary-900/20 border border-secondary-800"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-8 border border-primary">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex justify-center mb-8">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 mx-0.5 ${i < testimonial.rating ? 'text-primary' : 'text-secondary-700'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      <blockquote className="text-xl italic text-white mb-10 font-light leading-relaxed">
                        "{testimonial.quote}"</blockquote>
                      
                      <div>
                        <h4 className="text-xl font-heading font-light text-white mb-2">{testimonial.name}</h4>
                        <p className="text-primary uppercase tracking-wider text-xs font-extralight">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Indicatori */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-[2px] transition-all duration-500 ${index === activeIndex ? 'bg-primary w-12' : 'bg-secondary-700 w-6'}`}
                aria-label={`Vai alla testimonianza ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;