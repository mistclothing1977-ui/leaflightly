'use client';

import styles from './VideoBlock.module.css';

interface VideoBlockProps {
  videoUrl: string;
  element: 'water' | 'earth' | 'air' | 'fire';
  title: string;
  description?: string;
}

export default function VideoBlock({ videoUrl, element, title, description }: VideoBlockProps) {
  return (
    <section className={styles.videoBlock} data-element={element}>
      <video
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        className={styles.video}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </section>
  );
}
