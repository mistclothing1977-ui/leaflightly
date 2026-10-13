'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './VideoBlock.module.css';

interface VideoBlockProps {
  videoUrl: string;
  element: 'water' | 'earth' | 'air' | 'fire';
  title: string;
  description?: string;
}

export default function VideoBlock({ videoUrl, element, title, description }: VideoBlockProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [nearView, setNearView] = useState(false);

  // Below-the-fold video: don't download until it's about to scroll into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.videoBlock} data-element={element}>
      {nearView && (
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="auto"
          className={styles.video}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </section>
  );
}
