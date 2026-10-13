'use client';

import styles from './SkeletonLoader.module.css';

export default function SkeletonLoader() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.imageLoader} />
      <div className={styles.textLoader}>
        <div className={styles.line} style={{ width: '80%' }} />
        <div className={styles.line} style={{ width: '100%' }} />
        <div className={styles.line} style={{ width: '60%' }} />
      </div>
    </div>
  );
}
