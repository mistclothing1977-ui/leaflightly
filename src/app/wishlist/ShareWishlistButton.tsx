'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ShareWishlistButton({ productIds }: { productIds: string[] }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const share = async () => {
    // The link carries only product ids — no account, name or email.
    const url = `${window.location.origin}/wishlist/shared?items=${productIds.map(encodeURIComponent).join(',')}`;
    const data = {
      title: 'My Leaf Lightly wishlist',
      text: 'Sustainable picks I love on Leaf Lightly',
      url,
    };

    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus('copied');
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return; // user closed the share sheet
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className={styles.shareWrap}>
      <button type="button" onClick={share} className={styles.shareButton}>
        Share wishlist
      </button>
      <span className={styles.shareStatus} role="status" aria-live="polite">
        {status === 'copied' && 'Link copied — paste it anywhere to share.'}
        {status === 'error' && 'Could not share. Please try again.'}
      </span>
    </div>
  );
}
