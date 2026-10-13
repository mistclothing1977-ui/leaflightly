'use client';

import styles from './CertificationIcons.module.css';

const icons: Record<string, string> = {
  'b-corp': '♻️',
  'fsc': '🌲',
  'pefc': '🌲',
  'organic': '🌱',
  'compostable': '♻️',
  'plastic-free': '🎯',
  'fair-trade': '🤝',
  'carbon-neutral': '💨',
  'vegan': '🌿',
};

interface CertificationIconProps {
  cert: string;
  label: string;
}

export function CertificationIcon({ cert, label }: CertificationIconProps) {
  const icon = icons[cert] || '✓';

  return (
    <div className={styles.badge} title={label}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

interface CertificationIconsProps {
  certifications: string[];
  labels: Record<string, string>;
}

export default function CertificationIcons({ certifications, labels }: CertificationIconsProps) {
  return (
    <div className={styles.container}>
      {certifications.map((cert) => (
        <CertificationIcon key={cert} cert={cert} label={labels[cert] || cert} />
      ))}
    </div>
  );
}
