'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import styles from './StickyScrollSection.module.css';

interface StickyScrollSectionProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  alignment?: 'left' | 'right';
  className?: string;
}

/**
 * StickyScrollSection - Left content sticks while right content scrolls
 * Creates narrative-driven storytelling experience
 */
export default function StickyScrollSection({
  leftContent,
  rightContent,
  alignment = 'left',
  className = '',
}: StickyScrollSectionProps) {
  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const alignmentClass = alignment === 'left' ? styles.alignLeft : styles.alignRight;

  return (
    <div ref={containerRef} className={`${styles.container} ${alignmentClass} ${className}`}>
      {/* Sticky Left Side */}
      <div
        ref={stickyRef}
        className={`${styles.sticky} ${isSticky ? styles.stickyActive : ''}`}
      >
        <div className={styles.stickyContent}>
          {leftContent}
        </div>
      </div>

      {/* Scrolling Right Side */}
      <div className={styles.scrollable}>
        <div className={styles.scrollableContent}>
          {rightContent}
        </div>
      </div>
    </div>
  );
}
