'use client';

import styles from './TrustSignals.module.css';

interface TrustSignal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface TrustSignalsProps {
  signals?: TrustSignal[];
}

export default function TrustSignals({ signals }: TrustSignalsProps) {
  const defaultSignals: TrustSignal[] = [
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      description: 'Free delivery on orders over £50. Standard shipping 3-5 business days.',
      icon: '📦',
    },
    {
      id: 'returns',
      title: 'Returns & Exchanges',
      description: 'Not right? Send it back within 30 days, free returns included.',
      icon: '↩️',
    },
    {
      id: 'transparency',
      title: 'Transparency Commitment',
      description: 'We curate every brand. No greenwashing, only verified sustainable makers.',
      icon: '✓',
    },
    {
      id: 'affiliate',
      title: 'Affiliate Honesty',
      description: 'Some links help us keep the lights on. We only recommend what we\'d wear.',
      icon: '🤝',
    },
  ];

  const displaySignals = signals || defaultSignals;

  return (
    <div className={styles.trustSignals}>
      {displaySignals.map((signal) => (
        <div key={signal.id} className={styles.signal}>
          <div className={styles.icon}>{signal.icon}</div>
          <div className={styles.content}>
            <h3>{signal.title}</h3>
            <p>{signal.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
