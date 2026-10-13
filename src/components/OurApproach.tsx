'use client';

import styles from './OurApproach.module.css';

export default function OurApproach() {
  const steps = [
    {
      number: '1',
      title: 'We Vet',
      description: 'We spend weeks researching each brand. We verify certifications against actual standards. We test products ourselves. Only the truly sustainable make our cut—because a green label isn\'t enough.',
    },
    {
      number: '2',
      title: 'You Discover',
      description: 'Browse 500+ vetted products across 5 categories. Read real reviews from real shoppers. Compare sustainability tiers. Find the product that matches your values and your life.',
    },
    {
      number: '3',
      title: 'We\'re Transparent',
      description: 'We earn a small commission when you shop—and we tell you that upfront. It keeps Leaf Lightly free and independent. Your purchase supports both the brand and our curation.',
    },
  ];

  return (
    <section className={styles.approachSection}>
      <div className={styles.approachContainer}>
        <div className={styles.approachHeader}>
          <h2 className={styles.sectionLabel}>Our Approach</h2>
          <h3 className={styles.approachTitle}>How We Vet Every Brand</h3>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.number} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
