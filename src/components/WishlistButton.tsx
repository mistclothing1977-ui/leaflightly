'use client';

import { useState, useEffect } from 'react';
import styles from './WishlistButton.module.css';

interface WishlistButtonProps {
  productId: string;
  /** Skip the initial lookup when the caller already knows (e.g. on the wishlist page). */
  initiallyWishlisted?: boolean;
  onChange?: (wishlisted: boolean) => void;
}

export default function WishlistButton({ productId, initiallyWishlisted, onChange }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(!!initiallyWishlisted);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(!!initiallyWishlisted);

  useEffect(() => {
    if (initiallyWishlisted) return;
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
  }, [productId, initiallyWishlisted]);

  const toggleWishlist = async (e: React.MouseEvent) => {
    // The button often sits inside a product link; don't navigate.
    e.preventDefault();
    e.stopPropagation();

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
        const next = !isWishlisted;
        setIsWishlisted(next);
        onChange?.(next);
      } else if (res.status === 401) {
        window.location.href = '/login';
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
      <span aria-hidden="true">{isWishlisted ? '❤️' : '🤍'}</span>
      <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
    </button>
  );
}
