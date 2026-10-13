'use client';

import React, { ReactNode } from 'react';
import styles from './BentoGrid.module.css';

interface BentoItemProps {
  children: ReactNode;
  span?: 'full' | 'half' | 'third' | 'two-thirds';
  className?: string;
}

function BentoItem({ children, span = 'third', className }: BentoItemProps) {
  const spanClass = {
    full: styles.spanFull,
    half: styles.spanHalf,
    third: styles.spanThird,
    'two-thirds': styles.spanTwoThirds,
  }[span];

  return (
    <div className={`${spanClass} ${className || ''}`}>
      {children}
    </div>
  );
}

interface BentoGridProps {
  children: ReactNode;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function BentoGrid({ children, gap = 'large', className }: BentoGridProps) {
  const gapClass = {
    small: styles.gapSmall,
    medium: styles.gapMedium,
    large: styles.gapLarge,
  }[gap];

  return (
    <div className={`${styles.bentoGrid} ${gapClass} ${className || ''}`}>
      {children}
    </div>
  );
}

export { BentoItem };
