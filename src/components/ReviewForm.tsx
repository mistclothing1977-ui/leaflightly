'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from './ReviewForm.module.css';

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const { user, isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (title.length < 5) {
      setError('Title must be at least 5 characters');
      setLoading(false);
      return;
    }

    if (text.length < 10) {
      setError('Review text must be at least 10 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/reviews/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          rating,
          title,
          text,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to submit review');
      }

      setSuccess('Review submitted successfully!');
      setTitle('');
      setText('');
      setRating(5);
      onReviewSubmitted();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.notLoggedIn}>
        <p>Sign in to leave a review</p>
        <div className={styles.actions}>
          <Link href="/login" className={styles.loginLink}>
            Log In
          </Link>
          <Link href="/signup" className={styles.signupLink}>
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Share Your Review</h3>
      <p className={styles.subtitle}>Help others by sharing your experience with this product</p>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Rating */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Rating</label>
          <div className={styles.ratingSelect}>
            {[1, 2, 3, 4, 5].map((r) => (
              <button
                key={r}
                type="button"
                className={`${styles.star} ${rating >= r ? styles.filled : ''}`}
                onClick={() => setRating(r)}
                aria-label={`Rate ${r} stars`}
              >
                ★
              </button>
            ))}
          </div>
          <p className={styles.ratingLabel}>{rating} star{rating !== 1 ? 's' : ''}</p>
        </div>

        {/* Title */}
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Review Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience..."
            className={styles.input}
            maxLength={100}
            required
          />
          <p className={styles.hint}>{title.length}/100 characters</p>
        </div>

        {/* Text */}
        <div className={styles.formGroup}>
          <label htmlFor="text" className={styles.label}>
            Your Review
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share details about your experience with this product..."
            className={styles.textarea}
            rows={6}
            maxLength={1000}
            required
          />
          <p className={styles.hint}>{text.length}/1000 characters</p>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
