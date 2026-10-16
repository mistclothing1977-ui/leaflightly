'use client';

import { signIn } from 'next-auth/react';
import styles from './AuthForm.module.css';

export default function OAuthButtons() {
  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/wishlist' });
  };

  return (
    <div className={styles.socialLogin}>
      <button onClick={handleGoogleSignIn} className={styles.googleButton}>
        <span>🔍</span> Sign in with Google
      </button>
    </div>
  );
}
