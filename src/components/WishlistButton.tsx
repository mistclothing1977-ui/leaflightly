'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from './WishlistButton.module.css';

interface WishlistButtonProps {
  productId: string;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const { data: session } = useSession();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    // Check if already wishlisted
    const checkWishlist = async () => {
      const res = await fetch('/api/wishlist/get');
      const data = await res.json();
      setIsWishlisted(data.wishlist?.includes(productId) ?? false);
    };

    checkWishlist();
  }, [session?.user?.id, productId]);

  const toggleWishlist = async () => {
    if (!session?.user?.id) {
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
    >
      <span>{isWishlisted ? '❤️' : '🤍'}</span>
      <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
    </button>
  );
}
