import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { blogService } from "../services";
import { Button } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";

const BlogPost = () => {
  const { id } = useParams(); // Cambiato da slug a id per corrispondere alla definizione della rotta
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        console.log("Fetching post with ID/slug:", id);
        
        // Aggiungiamo un controllo per assicurarci che l'ID sia valido
        if (!id) {
          throw new Error("ID del post non valido");
        }
        
        const data = await blogService.getById(id);
        console.log("Received data from API:", data);
        
        // Verifica se data è null o undefined
        if (!data) {
          throw new Error("Nessun dato ricevuto dal server");
        }
        
        // Verifica se data è un oggetto vuoto
        if (Object.keys(data).length === 0) {
          throw new Error("Dati del post vuoti o non validi");
        }
        
        // Verifica se data contiene i campi essenziali
        if (!data.titolo || !data.contenuto) {
          throw new Error("Dati del post incompleti o non validi");
        }
        
        setPost(data);
        setLiked(data.userHasLiked || false);
        setLoading(false);

        // Fetch related posts
        if (data.categoria) {
          console.log("Fetching related posts for category:", data.categoria);
          const relatedData = await blogService.getByCategory(data.categoria);
          console.log("Related posts data:", relatedData);
          
          // Verifica se relatedData.posts esiste
          if (relatedData && relatedData.posts) {
            // Filter out the current post and limit to 3 posts
            const filtered = relatedData.posts
              .filter((p) => p._id !== data._id)
              .slice(0, 3);
            setRelatedPosts(filtered);
          }
        }
      } catch (err) {
        console.error("Errore nel caricamento del post:", err);
        setError(
          `Si è verificato un errore nel caricamento del post: ${err.message}. Riprova più tardi.`
        );
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
      // Scroll to top when post changes
      window.scrollTo(0, 0);
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("it-IT", options);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: `/blog/${id}` } });
      return;
    }

    if (!comment.trim()) return;

    try {
      setCommentSubmitting(true);
      
      // Verifica se i commenti sono abilitati
      if (!post.commentiAbilitati) {
        alert("I commenti sono disabilitati per questo post.");
        return;
      }
      
      await blogService.addComment(post._id, { testo: comment });
      // Refresh post to get updated comments
      const updatedPost = await blogService.getById(id);
      setPost(updatedPost);
      setComment("");
    } catch (err) {
      console.error("Errore nell'invio del commento:", err);
      alert(
        "Si è verificato un errore nell'invio del commento. Riprova più tardi."
      );
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: `/blog/${id}` } });
      return;
    }

    try {
      if (liked) {
        await blogService.unlikePost(post._id);
        setLiked(false);
        // Rimuovi l'utente corrente dall'array miPiace
        setPost((prev) => ({
          ...prev,
          miPiace: prev.miPiace ? prev.miPiace.filter(id => id !== user?._id) : []
        }));
      } else {
        await blogService.likePost(post._id);
        setLiked(true);
        // Aggiungi l'utente corrente all'array miPiace
        setPost((prev) => ({
          ...prev,
          miPiace: prev.miPiace ? [...prev.miPiace, user?._id] : [user?._id]
        }));
      }
    } catch (err) {
      console.error("Errore nella gestione del mi piace:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-900 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-secondary-900 text-white flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl font-bold mb-4">Errore</h2>
        <p className="text-secondary-300 mb-8">{error || "Post non trovato"}</p>
        <Link to="/blog">
          <Button variant="primary">Torna al blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary-950 z-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              post.immagineCopertina || "/images/blog-placeholder.jpg"
            })`,
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center gap-2 mb-4">
              <span className="bg-amber-500 text-secondary-900 px-3 py-1 rounded-full text-sm font-medium">
                {post.categoria}
              </span>
              <span className="bg-secondary-700 px-3 py-1 rounded-full text-sm">
                {formatDate(post.dataPubblicazione)}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {post.titolo}
            </h1>
            <p className="text-lg text-secondary-300">
              Di {post.autore} • {post.tempoLettura || "5 min"} di lettura
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.contenuto }}
            ></motion.div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${tag}`}
                    className="bg-secondary-800 hover:bg-secondary-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Like and Share */}
            <div className="mt-12 flex justify-between items-center border-t border-b border-secondary-700 py-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 ${
                  liked
                    ? "text-amber-500"
                    : "text-secondary-300 hover:text-amber-500"
                } transition-colors`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={liked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{post.miPiace?.length || 0} Mi piace</span>
              </button>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-primary-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.titolo
                  )}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-accent-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    window.location.href
                  )}&title=${encodeURIComponent(post.titolo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-primary-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">
                Commenti ({post.commenti?.length || 0})
              </h3>

              {post.commentiAbilitati ? (
                <>
                  {/* Comment Form */}
                  <form onSubmit={handleCommentSubmit} className="mb-8">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={
                        isAuthenticated
                          ? "Scrivi un commento..."
                          : "Accedi per lasciare un commento"
                      }
                      disabled={!isAuthenticated || commentSubmitting}
                      className="w-full p-4 rounded-lg bg-secondary-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none min-h-[120px]"
                      required
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={!isAuthenticated || commentSubmitting}
                      >
                        {commentSubmitting
                          ? "Invio in corso..."
                          : "Pubblica commento"}
                      </Button>
                    </div>
                  </form>

                  {/* Comments List */}
                  {post.commenti && post.commenti.length > 0 ? (
                    <div className="space-y-6">
                      {post.commenti.map((comment) => (
                        <div
                          key={comment._id}
                          className="bg-secondary-800 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-secondary-700 flex items-center justify-center font-bold">
                                {comment.utente?.nome?.charAt(0) || "U"}
                              </div>
                              <div>
                                <h4 className="font-semibold">
                                  {comment.utente?.nome || "Utente"}
                                </h4>
                                <p className="text-sm text-secondary-400">
                                  {formatDate(comment.dataCreazione)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-secondary-300">{comment.testo}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-secondary-800 rounded-lg">
                      <p className="text-secondary-300">
                        Non ci sono ancora commenti. Sii il primo a commentare!
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 bg-secondary-800 rounded-lg">
                  <p className="text-secondary-300">
                    I commenti sono disabilitati per questo post.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-secondary-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Articoli correlati
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <motion.div
                  key={relatedPost._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-secondary-900 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-shadow duration-300"
                >
                  <Link to={`/blog/${relatedPost.slug || relatedPost._id}`}>
                    <img
                      src={
                        relatedPost.immagineCopertina ||
                        "/images/blog-placeholder.jpg"
                      }
                      alt={relatedPost.titolo}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-secondary-400">
                        {formatDate(relatedPost.dataPubblicazione)}
                      </span>
                      <span className="bg-secondary-700 px-2 py-1 rounded-full text-xs">
                        {relatedPost.categoria}
                      </span>
                    </div>
                    <Link to={`/blog/${relatedPost.slug || relatedPost._id}`}>
                      <h3 className="text-xl font-bold mb-2 hover:text-amber-400 transition-colors">
                        {relatedPost.titolo}
                      </h3>
                    </Link>
                    <p className="text-secondary-300 mb-4 line-clamp-2">
                      {relatedPost.contenuto.substring(0, 100)}...
                    </p>
                    <Link
                      to={`/blog/${relatedPost.slug || relatedPost._id}`}
                      className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center"
                    >
                      Leggi di più
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-12 bg-secondary-900">
        <div className="container mx-auto px-4 text-center">
          <Link to="/blog">
            <Button variant="secondary" className="inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Torna al blog
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
