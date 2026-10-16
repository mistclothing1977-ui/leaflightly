'use client';

import { useState } from 'react';
import styles from './NewsletterSection.module.css';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage' }),
      });
      const body = await res.json().catch(() => null);
      if (res.ok) {
        setStatus('sent');
        setMessage('Check your inbox to confirm your subscription.');
        setEmail('');
      } else if (body?.code === 'ALREADY_SUBSCRIBED') {
        setStatus('sent');
        setMessage("You're already subscribed. Thanks!");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(
          body?.code === 'VALIDATION_ERROR'
            ? 'Please enter a valid email address.'
            : body?.code === 'RATE_LIMIT'
              ? 'Too many attempts. Please try again later.'
              : 'Something went wrong. Please try again.'
        );
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className={styles.newsletterSection}>
      <div className={styles.newsletterContainer}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Join Our Community</h2>
          <p className={styles.newsletterSubtitle}>
            Get insider tips on sustainable style, brand spotlights, and seasonal finds, delivered weekly.
          </p>

          <form onSubmit={handleSubmit} className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.emailInput}
            />
            <button type="submit" className={styles.submitButton} disabled={status === 'sending'}>
              {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>

          {message && (
            <p
              role="status"
              className={styles.statusMessage}
              style={{ color: status === 'error' ? '#FFD6C7' : '#ffffff' }}
            >
              {message}
            </p>
          )}

          <p className={styles.privacyText}>
            We respect your privacy. Unsubscribe anytime. See our{' '}
            <a href="/privacy-policy">privacy policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
