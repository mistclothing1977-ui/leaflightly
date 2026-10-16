'use client';

import { useState, useEffect } from 'react';
import styles from './NewsletterModal.module.css';

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user has already subscribed in this session
    const hasSubscribed = sessionStorage.getItem('leaf-newsletter-subscribed');
    if (hasSubscribed) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Show modal only when cursor leaves the top of the viewport
      if (e.clientY <= 0) {
        setIsOpen(true);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    // Also show modal after 30 seconds
    const timeoutId = setTimeout(() => {
      setIsOpen(true);
      document.removeEventListener('mouseleave', handleMouseLeave);
    }, 30000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Submit to newsletter API
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      setIsSubmitted(true);
      setEmail('');
      sessionStorage.setItem('leaf-newsletter-subscribed', 'true');

      // Close modal after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} role="dialog" aria-labelledby="modal-title" aria-modal="true">
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close newsletter modal"
          type="button"
        >
          ✕
        </button>

        {isSubmitted ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h2 id="modal-title" className={styles.title}>
              Thanks for signing up!
            </h2>
            <p className={styles.successMessage}>
              Check your inbox for exclusive tips and seasonal finds.
            </p>
          </div>
        ) : (
          <>
            <h2 id="modal-title" className={styles.title}>
              Get insider tips on sustainable style.
            </h2>
            <p className={styles.subtitle}>
              Weekly recommendations, brand spotlights, and seasonal finds—direct to your inbox.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  aria-label="Email address"
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button
                type="submit"
                className={styles.ctaButton}
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Get Weekly Curations'}
              </button>
            </form>

            <p className={styles.finePrint}>
              We respect your privacy. Unsubscribe anytime.{' '}
              <a href="/privacy-policy" className={styles.link}>
                See our privacy policy.
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
