'use client';

import { useState, useEffect } from 'react';
import styles from './ReviewsSection.module.css';

interface Review {
  id: string;
  userName: string;
  rating: number;
  createdAt: string;
  title: string;
  text: string;
  helpful: number;
}

interface ReviewsSectionProps {
  productId: string;
  productName?: string;
}

export default function ReviewsSection({
  productId,
}: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [overallRating, setOverallRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'helpful' | 'recent' | 'highest' | 'lowest'>('helpful');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews/product?productId=${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
        setOverallRating(data.averageRating || 0);
      }
    } catch (e) {
      console.error('Failed to fetch reviews:', e);
    } finally {
      setLoading(false);
    }
  };


  // Filter reviews by rating
  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpful - a.helpful;
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>Customer Reviews</h2>
          <p style={{ textAlign: 'center', color: '#8B8B7E' }}>Loading reviews...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Customer Reviews</h2>

        <div className={styles.content}>
          {/* Rating Summary */}
          <div className={styles.summary}>
            <div className={styles.overallRating}>
              <div className={styles.ratingNumber}>{overallRating.toFixed(1)}</div>
              <div className={styles.ratingStars}>
                {renderStars(Math.round(overallRating))}
              </div>
              <div className={styles.ratingLabel}>
                Based on {reviews.length.toLocaleString()} reviews
              </div>
            </div>

            {/* Rating Distribution */}
            <div className={styles.distribution}>
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className={styles.ratingBar}>
                  <button
                    className={`${styles.barLabel} ${filterRating === rating ? styles.active : ''}`}
                    onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                    aria-pressed={filterRating === rating}
                  >
                    {rating} ★
                  </button>
                  <div className={styles.bar}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className={styles.barCount}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className={styles.reviewsList}>
            {/* Sort Controls */}
            <div className={styles.controls}>
              <label htmlFor="sort-select" className={styles.label}>
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className={styles.select}
              >
                <option value="helpful">Most Helpful</option>
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>

              {filterRating && (
                <button
                  className={styles.clearFilter}
                  onClick={() => setFilterRating(null)}
                >
                  Clear filter ({filterRating} ★)
                </button>
              )}
            </div>

            {/* Reviews */}
            <div className={styles.reviews}>
              {sortedReviews.length > 0 ? (
                sortedReviews.map((review) => (
                  <div key={review.id} className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewAuthor}>
                        <h4 className={styles.reviewTitle}>{review.title}</h4>
                        <div className={styles.reviewMeta}>
                          <span className={styles.author}>{review.userName}</span>
                          <span className={styles.date}>
                            {new Date(review.createdAt).toLocaleDateString('en-UK', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      <div className={styles.reviewRating}>
                        <div className={styles.stars}>{renderStars(review.rating)}</div>
                        <span className={styles.ratingValue}>{review.rating}.0</span>
                      </div>
                    </div>

                    <p className={styles.reviewText}>{review.text}</p>

                    <div className={styles.reviewFooter}>
                      <button className={styles.helpfulButton}>
                        👍 Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noReviews}>
                  <p>No reviews match your filter.</p>
                  <button
                    className={styles.clearFilterLink}
                    onClick={() => setFilterRating(null)}
                  >
                    Clear filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
