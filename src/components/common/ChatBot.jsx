import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes, FaSpinner } from 'react-icons/fa';
import { henryAIService } from '../../services';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Check if HenryAI service is available
  useEffect(() => {
    const checkStatus = async () => {
      try {
        await henryAIService.checkStatus();
        setError(null);
      } catch (err) {
        setError('Il servizio di assistenza AI non è disponibile al momento.');
      }
    };
    
    checkStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    
    // Set loading state
    setIsLoading(true);
    setError(null);

    try {
      // Send message to HenryAI
      const response = await henryAIService.sendMessage(userMessage, conversationId);
      
      // Add AI response to chat
      setMessages(prev => [...prev, { text: response.answer, sender: 'ai' }]);
      
      // Save conversation ID for context
      if (response.session_id) {
        setConversationId(response.session_id);
      }
    } catch (err) {
      console.error('Error sending message to HenryAI:', err);
      setError('Si è verificato un errore nella comunicazione con l\'assistente AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    // If opening the chat and it's empty, add a welcome message
    if (!isOpen && messages.length === 0) {
      setMessages([{
        text: 'Ciao! Sono Henry, l\'assistente virtuale di RMI Made in Italy. Come posso aiutarti oggi?',
        sender: 'ai'
      }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <motion.button
        onClick={toggleChat}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg ${isOpen ? 'bg-red-600' : 'bg-primary-600'} text-white transition-colors duration-300`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Chiudi chat' : 'Apri chat'}
      >
        {isOpen ? <FaTimes size={20} /> : <FaRobot size={20} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-96 bg-secondary-900 rounded-lg shadow-xl overflow-hidden flex flex-col"
          >
            {/* Chat header */}
            <div className="bg-primary-600 text-white p-4 flex items-center">
              <FaRobot className="mr-2" />
              <h3 className="font-medium">Henry AI Assistant</h3>
            </div>

            {/* Chat messages */}
            <div className="flex-grow p-4 overflow-y-auto bg-secondary-950">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary-600 text-white' : 'bg-secondary-800 text-white'} max-w-[80%]`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-left mb-4">
                  <div className="inline-block p-3 rounded-lg bg-secondary-800 text-white">
                    <div className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" />
                      <p className="text-sm">Henry sta scrivendo...</p>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="text-center mb-4">
                  <div className="inline-block p-3 rounded-lg bg-red-600 text-white">
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-3 bg-secondary-900 border-t border-secondary-800">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Scrivi un messaggio..."
                  className="flex-grow p-2 rounded-l-lg bg-secondary-800 text-white border-none focus:outline-none focus:ring-1 focus:ring-primary-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`p-2 rounded-r-lg ${isLoading ? 'bg-secondary-700' : 'bg-primary-600'} text-white`}
                  disabled={isLoading}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;