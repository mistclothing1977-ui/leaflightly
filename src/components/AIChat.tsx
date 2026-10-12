'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AIChat.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  // Greetings
  'hello|hi|hey|greetings': 'Hello! 👋 Welcome to Leaf Lightly. How can I help you today? You can ask me about products, shipping, returns, or sustainability.',

  // Products
  'how.*products|what.*products|product.*recommend': 'We offer sustainable products across 5 categories: Kitchen, Fashion, Home, Beauty, and Wellness. Each product is vetted for sustainability. Would you like recommendations in a specific category?',
  'product.*tier|what.*tier|tier.*meaning': 'Our Tier system rates products:\n- **Tier A**: Exceptional - highest sustainability standards\n- **Tier B**: Excellent - strong sustainable practices\n- **Tier C**: Good - solid sustainability efforts',

  // Shipping & Delivery
  'shipping|delivery|how.*ship|ship.*cost': 'We offer FREE shipping on orders over £50! Standard shipping is £5.99 and takes 3-5 business days. Express shipping available at checkout.',
  'track.*order|where.*order|order.*status': 'You can track your order in your account dashboard under "Order History". You\'ll receive a tracking link via email once your order ships.',

  // Returns & Refunds
  'return|refund|exchange|money.*back': 'We offer a 30-day returns policy. Items must be unused and in original condition. Visit your account dashboard or contact support to start a return.',
  'how.*return|return.*process': 'Returns are easy: 1) Log in to your account, 2) Find the order, 3) Click "Return Item", 4) Follow the instructions to get a shipping label. We\'ll refund within 5 business days of receiving.',

  // Sustainability
  'sustainable|eco.*friendly|green|environment': 'Every product is vetted for sustainability! We check certifications, materials, manufacturing, and company values. See each product\'s certifications and our vetting notes.',
  'certification|certified|b.*corp': 'Products carry certifications like B Corp, Plastic-Free Certification, Fair Trade, Organic, and others. Each certification is verified on the product page.',

  // Account & Auth
  'account|login|sign.*in|create.*account': 'You can log in at /login or create an account at /signup. Your account lets you track orders, save favorites, and leave reviews.',
  'password|reset|forgot': 'If you forgot your password, use the "Forgot Password" link on the login page. You\'ll receive an email with reset instructions.',

  // Reviews & Ratings
  'review|rating|leave.*review': 'You can leave a review on any product page! Sign in, scroll to "Share Your Review", rate the product (1-5 stars), and write your experience.',

  // Cart & Checkout
  'cart|checkout|payment': 'Add products to your cart and proceed to checkout. We accept all major credit cards. Your cart is saved for 30 days.',
  'compare|comparison': 'Use our comparison tool to see up to 4 products side-by-side. View prices, ratings, certifications, and details to make the best choice.',

  // Search
  'search|find.*product|looking.*for': 'Use the search bar at the top to find products by name, brand, or category. You can also filter by tier, price, rating, and certifications.',
};

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! 👋 I\'m the Leaf Lightly AI Assistant. I can help with product info, shipping, returns, sustainability questions, and more. How can I help?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    for (const [pattern, response] of Object.entries(botResponses)) {
      const regexPattern = new RegExp(pattern, 'i');
      if (regexPattern.test(lowerInput)) {
        return response;
      }
    }

    return "I'm not sure about that. Try asking about:\n- Products & recommendations\n- Shipping & delivery\n- Returns & refunds\n- Sustainability & certifications\n- Your account\n- Or type 'help' for more options.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className={styles.chatContainer}>
      {/* Chat Button */}
      {!isOpen && (
        <button
          className={styles.chatButton}
          onClick={() => setIsOpen(true)}
          title="Chat with AI Assistant"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.header}>
            <h3 className={styles.title}>Leaf Lightly Assistant</h3>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${styles[message.sender]}`}
              >
                <div className={styles.bubble}>{message.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.bot}`}>
                <div className={styles.bubble}>
                  <span className={styles.typing}>•</span>
                  <span className={styles.typing}>•</span>
                  <span className={styles.typing}>•</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputArea}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question..."
              className={styles.input}
            />
            <button
              onClick={handleSendMessage}
              className={styles.sendButton}
              disabled={!inputValue.trim() || isLoading}
            >
              Send
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className={styles.suggestions}>
            <button
              onClick={() => setInputValue('How does shipping work?')}
              className={styles.suggestionButton}
            >
              Shipping
            </button>
            <button
              onClick={() => setInputValue('What certifications do you have?')}
              className={styles.suggestionButton}
            >
              Certifications
            </button>
            <button
              onClick={() => setInputValue('How do I return items?')}
              className={styles.suggestionButton}
            >
              Returns
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
