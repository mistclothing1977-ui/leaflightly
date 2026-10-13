'use client';

import { useState } from 'react';
import styles from './NewsletterSection.module.css';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className={styles.newsletterSection}>
      <div className={styles.newsletterContainer}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Join Our Community</h2>
          <p className={styles.newsletterSubtitle}>
            Get insider tips on sustainable style, brand spotlights, and seasonal finds—delivered weekly.
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
            <button type="submit" className={styles.submitButton}>
              {submitted ? '✓ Welcome!' : 'Subscribe'}
            </button>
          </form>

          <p className={styles.privacyText}>
            We respect your privacy. Unsubscribe anytime. See our{' '}
            <a href="/privacy">privacy policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
