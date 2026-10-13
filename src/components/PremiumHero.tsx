'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './PremiumHero.module.css';

interface PremiumHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage?: string;
  videoUrl?: string;
  tier?: string;
  discount?: number;
}

export default function PremiumHero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  backgroundImage,
  videoUrl,
  tier,
  discount,
}: PremiumHeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const videoStyle = {
    transform: `translateY(${scrollY * 0.3}px)`,
  };

  return (
    <section className={styles.premiumHero}>
      {/* Layered Background: Video + Overlay */}
      <div className={styles.backgroundLayer}>
        {videoUrl && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={styles.backgroundVideo}
            style={videoStyle}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        {backgroundImage && !videoUrl && (
          <div
            className={styles.backgroundImage}
            style={{
              backgroundImage: `url(${backgroundImage})`,
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
        )}
        {/* Gradient Overlay for text contrast */}
        <div className={styles.overlay} />
      </div>

      {/* Content: Premium Spacing & Typography */}
      <div className={styles.heroContent}>
        {/* Top Tier Badge */}
        {tier && (
          <div className={styles.tierBadge}>
            <span>{tier}</span>
          </div>
        )}

        {/* Main Heading: Extra breathing room */}
        <h1 className={styles.heroTitle}>{title}</h1>

        {/* Subtitle: Refined line-height */}
        <p className={styles.heroSubtitle}>{subtitle}</p>

        {/* CTA: Magnetic Button */}
        <Link href={ctaHref} className={styles.magneticButton}>
          <span className={styles.buttonText}>{ctaText}</span>
          <span className={styles.buttonArrow}>→</span>
        </Link>

        {/* Discount Badge: Floating overlay */}
        {discount && (
          <div className={styles.discountBadgeHero}>
            -{discount}%
          </div>
        )}
      </div>

      {/* Decorative Elements: Depth & Premium feel */}
      <div className={styles.decorativeElements}>
        <div className={styles.floatingDot1} />
        <div className={styles.floatingDot2} />
        <div className={styles.floatingDot3} />
      </div>
    </section>
  );
}
