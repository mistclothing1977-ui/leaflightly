'use client';

import { useState, useEffect } from 'react';
import styles from './WishlistButton.module.css';

interface WishlistButtonProps {
  productId: string;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and if product is wishlisted
    const checkAuthAndWishlist = async () => {
      try {
        const res = await fetch('/api/wishlist/get');
        if (res.ok) {
          const data = await res.json();
          setIsAuth(true);
          setIsWishlisted(data.wishlist?.includes(productId) ?? false);
        } else if (res.status === 401) {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuthAndWishlist();
  }, [productId]);

  const toggleWishlist = async () => {
    if (!isAuth) {
      window.location.href = '/login';
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isWishlisted ? '/api/wishlist/remove' : '/api/wishlist/add';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        setIsWishlisted(!isWishlisted);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={isLoading}
      className={`${styles.wishlistButton} ${isWishlisted ? styles.wishlisted : ''}`}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <span>{isWishlisted ? '❤️' : '🤍'}</span>
      <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
    </button>
  );
}
