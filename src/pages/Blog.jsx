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
    <div className="min-h-screen bg-secondary-950 text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary-950 z-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${featuredPost?.immagineCopertina || '/images/blog-hero.jpg'})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Il nostro Blog</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">Scopri le ultime novità, storie e approfondimenti sul mondo dei restomod e delle auto d'epoca.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-secondary-900">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.immagineCopertina || '/images/blog-placeholder.jpg'} 
                  alt={featuredPost.titolo} 
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2">
                <span className="text-primary uppercase tracking-wider font-semibold">In Evidenza</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{featuredPost.titolo}</h2>
                <p className="text-secondary-300 mb-2">
                  <span className="mr-4">{formatDate(featuredPost.dataPubblicazione)}</span>
                  <span className="bg-secondary-800 px-3 py-1 rounded-full text-sm">{featuredPost.categoria}</span>
                </p>
                <p className="text-secondary-300 mb-6 line-clamp-3">{featuredPost.contenuto.substring(0, 200)}...</p>
                <Link to={`/blog/${featuredPost._id}`} className="btn btn-primary mt-4">
                  Leggi l'articolo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-secondary-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button 
              onClick={() => setActiveCategory('all')} 
              className={`px-4 py-2 rounded-full ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-secondary-800 text-white'}`}
            >
              Tutti
            </button>
            {categories.map(category => (
              <button 
                key={category} 
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full ${activeCategory === category ? 'bg-primary text-white' : 'bg-secondary-800 text-white'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-secondary-950">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-secondary-400">{formatDate(post.dataPubblicazione)}</span>
                      <span className="bg-secondary-800 px-2 py-1 rounded-full text-xs">{post.categoria}</span>
                    </div>
                    <Link to={`/blog/${post._id}`}>
                      <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.titolo}</h3>
                    </Link>
                    <p className="text-secondary-300 mb-4 line-clamp-3">{post.contenuto.substring(0, 150)}...</p>
                    <Link to={`/blog/${post._id}`} className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center">
                      Leggi di più
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold mb-4">Nessun post trovato</h3>
              <p className="text-secondary-400 mb-6">Non ci sono articoli disponibili per questa categoria.</p>
              <Button onClick={() => setActiveCategory('all')} variant="secondary">Visualizza tutti i post</Button>
            </div>
          )}
          
          {/* Paginazione */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-secondary-800 text-secondary-500 cursor-not-allowed' : 'bg-secondary-800 text-white hover:bg-secondary-700'}`}
                >
                  Precedente
                </button>
                
                <div className="flex space-x-2">
                  {[...Array(totalPages).keys()].map(number => (
                    <button
                      key={number + 1}
                      onClick={() => setCurrentPage(number + 1)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentPage === number + 1 ? 'bg-primary text-white' : 'bg-secondary-800 text-white hover:bg-secondary-700'}`}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-secondary-800 text-secondary-500 cursor-not-allowed' : 'bg-secondary-800 text-white hover:bg-secondary-700'}`}
                >
                  Successiva
                </button>
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

      {/* Newsletter Section */}
      <section className="py-16 bg-secondary-800">
        <div className="container mx-auto px-4">
          <Newsletter />
        </div>
      </section>
    </div>
  );
};

export default Blog;