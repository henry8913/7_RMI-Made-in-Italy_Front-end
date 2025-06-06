import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogService } from '../services';
import { Button } from '../components/ui';
import Newsletter from '../components/common/Newsletter';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const filters = {
          page: currentPage,
          limit: 9
        };
        if (activeCategory !== 'all') {
          filters.categoria = activeCategory;
        }
        const data = await blogService.getAll(filters);
        console.log('Blog data:', data); // Log per debug
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 1);
        setTotalPosts(data.totalPosts || 0);

        // Estrai le categorie uniche dai post
        if (data.posts && data.posts.length > 0) {
          const uniqueCategories = [...new Set(data.posts.map(post => post.categoria))];
          setCategories(uniqueCategories);
        }

        setLoading(false);
      } catch (err) {
        console.error('Errore nel caricamento dei post:', err);
        setError('Si è verificato un errore nel caricamento dei post. Riprova più tardi.');
        setLoading(false);
      }
    };

    const fetchFeaturedPost = async () => {
      try {
        const data = await blogService.getFeatured();
        console.log('Featured post data:', data); // Log per debug
        if (data.posts && data.posts.length > 0) {
          setFeaturedPost(data.posts[0]);
        }
      } catch (err) {
        console.error('Errore nel caricamento del post in evidenza:', err);
      }
    };

    fetchPosts();
    fetchFeaturedPost();
  }, [activeCategory, currentPage]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-secondary-950 text-white pt-0">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary-950 z-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${featuredPost?.immagineCopertina || '/images/blog-hero.jpg'})` }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4">Il nostro Blog</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">Scopri le ultime novità, storie e approfondimenti sul mondo dei restomod e delle auto d'epoca.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-10 sm:py-12 md:py-16 bg-secondary-900">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center"
            >
              <div className="w-full md:w-1/2">
                <img 
                  src={featuredPost.immagineCopertina || '/images/blog-placeholder.jpg'} 
                  alt={featuredPost.titolo} 
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <span className="text-sm sm:text-base text-primary uppercase tracking-wider font-semibold">In Evidenza</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2 mb-2 sm:mb-4">{featuredPost.titolo}</h2>
                <p className="text-secondary-300 mb-2">
                  <span className="text-sm sm:text-base mr-3 sm:mr-4">{formatDate(featuredPost.dataPubblicazione)}</span>
                  <span className="bg-secondary-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">{featuredPost.categoria}</span>
                </p>
                <p className="text-sm sm:text-base text-secondary-300 mb-4 sm:mb-6 line-clamp-3">{featuredPost.contenuto.substring(0, 200)}...</p>
                <Link to={`/blog/${featuredPost._id}`} className="btn btn-primary text-sm sm:text-base py-1.5 px-3 sm:py-2 sm:px-4 mt-2 sm:mt-4">
                  Leggi l'articolo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-6 sm:py-8 bg-secondary-950">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            <button 
              onClick={() => setActiveCategory('all')} 
              className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-secondary-800 text-white'}`}
            >
              Tutti
            </button>
            {categories.map(category => (
              <button 
                key={category} 
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full ${activeCategory === category ? 'bg-primary text-white' : 'bg-secondary-800 text-white'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-10 sm:py-12 md:py-16 bg-secondary-950">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-48 sm:h-64">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-6 sm:py-8 text-sm sm:text-base">{error}</div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {posts.map(post => (
                <motion.div 
                  key={post._id} 
                  variants={itemVariants}
                  className="bg-secondary-900 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300"
                >
                  <Link to={`/blog/${post._id}`}>
                    <img 
                      src={post.immagineCopertina || '/images/blog-placeholder.jpg'} 
                      alt={post.titolo} 
                      className="w-full h-40 sm:h-44 md:h-48 object-cover"
                    />
                  </Link>
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs sm:text-sm text-secondary-400">{formatDate(post.dataPubblicazione)}</span>
                      <span className="bg-secondary-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">{post.categoria}</span>
                    </div>
                    <Link to={`/blog/${post._id}`}>
                      <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 hover:text-primary transition-colors line-clamp-2">{post.titolo}</h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-secondary-300 mb-3 sm:mb-4 line-clamp-3">{post.contenuto.substring(0, 150)}...</p>
                    <Link to={`/blog/${post._id}`} className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center text-sm sm:text-base">
                      Leggi di più
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-10 sm:py-12 md:py-16">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Nessun articolo trovato</h3>
              <p className="text-sm sm:text-base text-secondary-300 mb-6 sm:mb-8">Non ci sono articoli disponibili per la categoria selezionata.</p>
              <button 
                onClick={() => setActiveCategory('all')} 
                className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-colors"
              >
                Visualizza tutti gli articoli
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {!loading && !error && posts.length > 0 && totalPages > 1 && (
            <div className="mt-8 sm:mt-10 md:mt-12">
              <div className="flex justify-center gap-1 sm:gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm rounded-lg ${currentPage === 1 ? 'bg-secondary-800 text-secondary-400 cursor-not-allowed' : 'bg-secondary-800 text-white hover:bg-secondary-700'}`}
                >
                  Precedente
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-xs sm:text-sm rounded-lg ${currentPage === page ? 'bg-primary text-white' : 'bg-secondary-800 text-white hover:bg-secondary-700'}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm rounded-lg ${currentPage === totalPages ? 'bg-secondary-800 text-secondary-400 cursor-not-allowed' : 'bg-secondary-800 text-white hover:bg-secondary-700'}`}
                >
                  Successivo
                </button>
              </div>
              
              <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-secondary-400">
                Visualizzazione {(currentPage - 1) * 9 + 1}-{Math.min(currentPage * 9, totalPosts)} di {totalPosts} articoli
              </div>
            </div>
          )}
          
          {/* Informazioni sulla paginazione */}
          {!loading && !error && posts.length > 0 && (
            <div className="text-center mt-4 text-secondary-400">
              Visualizzazione {posts.length} di {totalPosts} articoli
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-10 sm:py-12 md:py-16 bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <Newsletter />
        </div>
      </section>
    </div>
  );
};

export default Blog;